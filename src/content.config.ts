import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';
import { blogSchema } from 'starlight-blog/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		// starlight-blog 스키마(date/authors/excerpt/tags/cover/featured)에
		// 사이트 공통 필드(created/updated)를 합쳐 확장한다.
		schema: docsSchema({
			extend: (context) =>
				blogSchema(context).extend({
					created: z.coerce.date().optional(),
					updated: z.coerce.date().optional(),
				}),
		}),
	}),
	// UI 번역 오버라이드 (src/content/i18n/ko.json).
	// starlight-blog는 ko 번역을 제공하지 않고, 사이트 기본 로케일이 ko라
	// 영어 폴백이 동작하지 않으므로 ko 번역을 직접 제공한다.
	// i18nSchema()는 passthrough라 starlightBlog.* 키도 통과한다.
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
