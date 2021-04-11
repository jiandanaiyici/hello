// https://github.com/unifiedjs/unified
import unified from 'unified';
import markdown from 'remark-parse';
// import highlight from 'rehype-highlight';
import html from 'remark-html';

export default async function markdownToHtml(content: string) {
  const result = await unified().use(markdown).use(html).process(content);
  return result.toString();
}
