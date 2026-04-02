import React from 'react';
import { motion } from 'framer-motion';

interface Blog {
	id: string;
	data: {
		title: string;
		url: string;
		description: string;
		category: string;
		tags: string[];
	};
}

interface Props {
	blogs: Blog[];
}

const BlogGrid: React.FC<Props> = ({ blogs }) => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{blogs.map((blog) => (
				<motion.div
					key={blog.id}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					whileHover={{ 
						y: -10,
						scale: 1.02,
						transition: { duration: 0.2 }
					}}
					className="group relative overflow-hidden rounded-4xl glass border border-white/10 hover:border-green-500/30 transition-colors"
				>
					{/* Screenshot Container */}
					<div className="aspect-video w-full overflow-hidden bg-white/5 relative">
						<img 
							src={`https://api.microlink.io?url=${encodeURIComponent(blog.data.url)}&screenshot=true&meta=false&embed=screenshot.url`}
							alt={blog.data.title}
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
							loading="lazy"
						/>
						<div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60" />
						
						{/* Category Badge */}
						<span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold tracking-widest uppercase backdrop-blur-md border border-green-500/30">
							{blog.data.category}
						</span>
					</div>

					{/* Content */}
					<div className="p-8">
						<h3 className="text-xl font-bold mb-3 font-['Outfit'] group-hover:text-green-400 transition-colors">
							{blog.data.title}
						</h3>
						<p className="text-sm text-gray-400 leading-relaxed mb-6 line-clamp-2">
							{blog.data.description}
						</p>
						
						<div className="flex flex-wrap gap-2 mb-8">
							{blog.data.tags.slice(0, 3).map((tag) => (
								<span key={tag} className="text-[10px] text-gray-500 font-medium">#{tag}</span>
							))}
						</div>

						{/* Links */}
						<div className="flex items-center justify-between">
							<a 
								href={`/blogs/${blog.id}`} 
								className="text-xs font-bold py-2 px-4 rounded-full bg-white/5 hover:bg-white text-white hover:text-black transition-all"
							>
								View Details
							</a>
							<a 
								href={blog.data.url} 
								target="_blank" 
								rel="noopener noreferrer"
								className="text-gray-500 hover:text-white transition-colors"
								onClick={(e) => e.stopPropagation()}
							>
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
								</svg>
							</a>
						</div>
					</div>

					{/* Hover Border Glow */}
					<div className="absolute inset-0 border-2 border-green-500/0 group-hover:border-green-500/10 rounded-4xl pointer-events-none transition-colors" />
				</motion.div>
			))}
		</div>
	);
};

export default BlogGrid;
