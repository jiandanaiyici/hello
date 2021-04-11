import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { v4 } from 'uuid';
import { getDirNames } from 'utils/read';

const basePath = process.cwd();

const postsDirectory = join(basePath, '_blogs');
const docsDirectory = join(basePath, '_docs');

/** 获取博客文件 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

/** 获取文档地址: 需要包含有多重文件夹形式 */
export const getDocsSlugs = async (dirName = docsDirectory) => {
  const dirData = await getDirNames(dirName);

  // for (let index = 0, len = dirData.length; index < len; index++) {
  //   const ele = dirData[index];
  //   while(ele.isDirectory()) {
  //     console.log(getFilePath(join(basePath, ele.name)), '>>>>>>>>>>');
  //   }
  // }
  return dirData;
};

export function getSlugContent(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = { id: v4() };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllFileContent(fields: string[], slugs: string[]) {
  const posts = slugs
    .map((slug) => getSlugContent(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  return getAllFileContent(fields, slugs);
}

// export const getAllDocs = async (fields: string[]) => {
//   const s = await getDocsSlugs();
//   const slugs = s.filter(item => item.isFile()).map(item => item.name)
//   return getAllFileContent(fields, slugs);
// };
