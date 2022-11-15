import path from "path";
import fs from "fs";

export const projectsDirectory = path.join(process.cwd(), "src/_projects");
export const articlesDirectory = path.join(process.cwd(), "src/_articles");

export const articleFilesPaths = fs
  .readdirSync(articlesDirectory)
  .filter((path) => /\.mdx?$/.test(path));

export const projectFilesPaths = fs
  .readdirSync(projectsDirectory)
  .filter((path) => /\.mdx?$/.test(path));
