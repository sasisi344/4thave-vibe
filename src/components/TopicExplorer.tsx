'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Props {
	allTags: string[];
}

const TopicExplorer: React.FC<Props> = ({ allTags }) => {
	return (
		<div className="w-full">
			<div className="p-8 rounded-[40px] glass border border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent relative group">
				<div className="flex justify-between items-center mb-6">
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
						<p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Explore {allTags.length} Unique Topics</p>
					</div>
					<div className="flex gap-1">
						<div className="w-1 h-1 rounded-full bg-white/10"></div>
						<div className="w-1 h-1 rounded-full bg-white/20"></div>
						<div className="w-1 h-1 rounded-full bg-white/30"></div>
					</div>
				</div>

				<div className="max-h-[160px] overflow-y-auto pr-4 custom-scrollbar">
					<div className="flex flex-wrap gap-3">
						{allTags.map((tag, idx) => (
							<motion.a
								key={tag}
								href={`/notes/tag/${tag.toLowerCase()}`}
								className="px-5 py-2.5 rounded-full border border-white/5 bg-white/[0.03] hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 font-bold text-xs md:text-sm text-gray-500 hover:text-green-400 whitespace-nowrap"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: idx * 0.02 }}
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
							>
								#{tag.toLowerCase()}
							</motion.a>
						))}
					</div>
				</div>
				
				<div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
					<span className="text-[10px] font-medium text-white/10 italic">Scroll to discover more wisdom.</span>
					<div className="flex items-center gap-1.5 py-1 px-3 rounded-full bg-green-500/10 border border-green-500/20">
						<span className="w-1 h-1 rounded-full bg-green-500"></span>
						<span className="text-[10px] font-black text-green-400 uppercase tracking-widest leading-none">+{allTags.length} Topics</span>
					</div>
				</div>
			</div>

			<style jsx global>{`
				.custom-scrollbar::-webkit-scrollbar {
					width: 4px;
				}
				.custom-scrollbar::-webkit-scrollbar-track {
					background: rgba(255, 255, 255, 0.02);
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb {
					background: rgba(255, 255, 255, 0.1);
					border-radius: 10px;
				}
				.custom-scrollbar::-webkit-scrollbar-thumb:hover {
					background: rgba(74, 222, 128, 0.3);
				}
			`}</style>
		</div>
	);
};

export default TopicExplorer;
