import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
	const docs = await getCollection('docs');
	// Filter blog, til, knowledge posts (exclude index.md files)
	const posts = docs.filter(
		(doc) =>
			(doc.id.startsWith('blog/') ||
				doc.id.startsWith('til/') ||
				doc.id.startsWith('knowledge/')) &&
			!doc.id.endsWith('index.md')
	);

	// Sort by created date (newest first)
	const sortedPosts = posts.sort((a, b) => {
		const dateA = a.data.created ?? new Date(0);
		const dateB = b.data.created ?? new Date(0);
		return dateB.getTime() - dateA.getTime();
	});

	return rss({
		title: 'ycra.dev',
		description: '개발 블로그',
		site: context.site ?? 'https://ycra-dev.github.io',
		items: sortedPosts.map((post) => ({
			title: post.data.title,
			description: post.data.description ?? '',
			pubDate: post.data.created ?? new Date(),
			link: `/${post.id.replace(/\.md$/, '')}/`,
		})),
	});
}
