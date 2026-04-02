'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
	id: string;
	title: string;
	category: string;
	date: string;
	description?: string;
	tags: string[];
	contentHtml: string;
}

const FeaturedNote: React.FC<Props> = ({ title, category, date, description, tags }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [renderedHtml, setRenderedHtml] = useState<string>('');

	React.useEffect(() => {
		const template = document.getElementById('featured-note-template');
		if (template) {
			setRenderedHtml(template.innerHTML);
		}
	}, []);

	return (
		<>
			<motion.button
				onClick={() => setIsOpen(true)}
				className="w-full text-left group relative block overflow-hidden rounded-[48px] glass border border-white/10 hover:border-white/20 transition-all duration-500 bg-gradient-to-br from-white/[0.05] to-transparent p-12 focus:outline-none focus:ring-2 focus:ring-green-500/50"
				layoutId="card"
			>
				<div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/10 blur-[100px] rounded-full group-hover:bg-green-500/15 transition-colors"></div>
				<div className="flex flex-col md:flex-row items-start md:items-center gap-12 relative z-10">
					<div className="flex-1">
						<div className="flex items-center gap-4 mb-6">
							<span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest">{category}</span>
							<span className="text-xs font-bold text-white/30">{date}</span>
						</div>
						<h3 className="text-2xl md:text-5xl font-black mb-6 leading-tight group-hover:text-green-400 transition-colors font-['Outfit'] italic tracking-tighter">{title}</h3>
						<p className="text-xl text-gray-400 leading-relaxed mb-8 line-clamp-2 max-w-2xl font-medium">
							{description}
						</p>
						<div className="flex items-center gap-3">
							{tags.slice(0, 3).map((tag, idx) => (
								<span key={idx} className="text-xs text-white/20 font-black uppercase tracking-widest tracking-widest">#{tag}</span>
							))}
						</div>
					</div>
					<div className="shrink-0">
						<motion.div 
							className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-green-500 transition-all duration-500 group-hover:scale-110 group-hover:border-transparent"
							whileHover={{ rotate: 45 }}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
							</svg>
						</motion.div>
					</div>
				</div>
			</motion.button>

			<AnimatePresence>
				{isOpen && (
					<div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="absolute inset-0 bg-black/80 backdrop-blur-xl"
							onClick={() => setIsOpen(false)}
						/>
						
						<motion.div
							layoutId="card"
							className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[40px] glass border border-white/10 bg-zinc-950 flex flex-col shadow-2xl"
						>
							<div className="p-8 md:p-12 border-b border-white/5 bg-gradient-to-br from-green-500/5 to-transparent relative">
								<button 
									onClick={() => setIsOpen(false)}
									className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors z-10"
								>
									<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
								
								<div className="flex items-center gap-4 mb-4">
									<span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest">{category}</span>
									<span className="text-xs font-bold text-white/30">{date}</span>
								</div>
								<h3 className="text-2xl md:text-5xl font-black font-['Outfit'] italic tracking-tighter leading-tight mb-4">{title}</h3>
								{description && <p className="text-gray-400 font-medium italic">{description}</p>}
							</div>

							<div className="flex-1 overflow-y-auto p-8 md:p-12 scroll-smooth">
								<div 
									className="article-body prose prose-invert max-w-none [&_p]:text-gray-300 [&_p]:text-base [&_p]:leading-[2] [&_p]:mb-6 [&_p]:font-sans [&_strong]:text-white [&_strong]:font-bold [&_h2]:font-['Outfit'] [&_h2]:italic [&_h3]:font-['Outfit'] [&_h3]:italic [&_ul]:mb-6 [&_ul]:space-y-2 [&_li]:text-gray-300 [&_li]:text-base [&_li]:leading-relaxed"
									dangerouslySetInnerHTML={{ __html: renderedHtml }}
								/>
								
								<div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-2">
									{tags.map((tag, idx) => (
										<span key={idx} className="px-4 py-1 rounded-full border border-white/10 text-[10px] font-black text-white/40 uppercase tracking-widest">#{tag}</span>
									))}
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</>
	);
};

export default FeaturedNote;
