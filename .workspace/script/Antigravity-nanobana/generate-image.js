import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// === .env 簡易ローダー ===
for (const p of [path.join(__dirname, '.env'), path.join(process.cwd(), '.env')]) {
    if (!fs.existsSync(p)) continue;
    fs.readFileSync(p, 'utf8').split(/\r?\n/).forEach(line => {
        const m = line.replace(/^export\s+/, '').replace(/^\$env:/, '').trim().match(/^([^#=]+)=\s*(['"]?)(.*)\2$/);
        if (m) process.env[m[1].trim()] = m[3];
    });
}

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) { console.error('Error: GEMINI_API_KEY が設定されていません (.env に記述してください)'); process.exit(1); }

const MODEL = 'gemini-3.1-flash-image-preview';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
const MAX_OUTPUT_TOKENS = 8192;

// === プリセット読み込み ===
const PRESETS_PATH = path.join(__dirname, 'prompts', '4thave-image-generation.json');
const presets = fs.existsSync(PRESETS_PATH) ? JSON.parse(fs.readFileSync(PRESETS_PATH, 'utf8')) : null;

// === 引数パース ===
const args = process.argv.slice(2);

if (args.includes('--list-presets')) {
    if (!presets) { console.error('プリセットファイルが見つかりません。'); process.exit(1); }
    console.log('\n📋 利用可能なプリセット:\n' + '─'.repeat(50));
    for (const [k, v] of Object.entries(presets.presets)) console.log(`  --preset ${k.padEnd(14)} ${v.label}`);
    console.log('─'.repeat(50) + '\n使用例:\n  node generate-image.js --preset cover "防音室のある静かなリビング" "./output.jpg"\n');
    process.exit(0);
}

let presetKey = null;
const positionalArgs = [];
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--preset' && args[i + 1]) { presetKey = args[++i]; }
    else positionalArgs.push(args[i]);
}

const [userPrompt, outputPath] = positionalArgs;
if (!userPrompt || !outputPath) {
    console.error('使用方法:\n  node generate-image.js "<プロンプト>" "<出力パス>"\n  node generate-image.js --preset <名前> "<プロンプト>" "<出力パス>"\n  node generate-image.js --list-presets');
    process.exit(1);
}

// === プロンプト組み立て ===
function buildPrompt() {
    const parts = [];
    if (presets?.systemContext) parts.push(presets.systemContext);
    if (presetKey && presets?.presets?.[presetKey]) {
        parts.push(presets.presets[presetKey].suffix);
        console.log(`🎨 プリセット適用: ${presets.presets[presetKey].label}`);
    } else if (presetKey) {
        console.warn(`⚠️ プリセット "${presetKey}" が見つかりません。コンテキストのみ適用。`);
    }
    parts.push(userPrompt);
    return parts.join('\n\n');
}

// === API呼び出し ===
function generateImage(prompt) {
    const body = JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 1.0, topP: 0.95, topK: 40, maxOutputTokens: MAX_OUTPUT_TOKENS }
    });

    return new Promise((resolve, reject) => {
        const req = https.request(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-goog-api-key': API_KEY, 'Content-Length': Buffer.byteLength(body) }
        }, res => {
            if (res.statusCode < 200 || res.statusCode >= 300) {
                reject(new Error(`API HTTP ${res.statusCode}`));
                return;
            }
            const chunks = [];
            res.on('data', c => chunks.push(c));
            res.on('end', () => resolve(JSON.parse(Buffer.concat(chunks).toString())));
            res.on('error', reject);
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

// === メイン処理 ===
async function main() {
    console.log(`📝 プロンプト: ${userPrompt}`);
    if (presetKey) console.log(`🏷️  プリセット: ${presetKey}`);
    console.log(`📂 出力先: ${outputPath}\n${'─'.repeat(50)}\n生成中...\n`);

    const response = await generateImage(buildPrompt());

    if (response.error) { console.error('API Error:', JSON.stringify(response.error, null, 2)); process.exit(1); }

    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) { console.error('画像が生成されませんでした。', JSON.stringify(response, null, 2)); process.exit(1); }

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    for (const part of parts) {
        if (!part.inlineData?.data) continue;
        const buf = Buffer.from(part.inlineData.data, 'base64');
        fs.writeFileSync(outputPath, buf);
        console.log(`✓ 保存完了: ${outputPath} (${(buf.length / 1024).toFixed(1)} KB)`);
    }
}

main().catch(e => { console.error('エラー:', e.message); process.exit(1); });