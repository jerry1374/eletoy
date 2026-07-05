import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 所有字段都设为可选，这样即使某篇内容只填了标题（甚至没填），
// 构建也不会失败。真正的正文写在 md 的 body 里，由 Astro 渲染。
const meta = z.object({
  title: z.string().optional(),
  date: z.coerce.date().optional(),
  image: z.string().optional(),
  summary: z.string().optional(),
  draft: z.boolean().optional(),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/news' }),
  schema: meta,
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/products' }),
  schema: meta.extend({
    model: z.string().optional(),
    link: z.string().optional(),
  }),
});

export const collections = { news, products };
