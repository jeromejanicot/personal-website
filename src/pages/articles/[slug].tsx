import React from 'react';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { articlesDirectory, articleFilesPaths } from '../../lib/getBlog';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { FMDataType } from '../../types/types';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { Box } from '../../components/Page';
import { MDXProvider } from '@mdx-js/react';
import rehypeHighlight from 'rehype-highlight'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

type Props = {
    mdxSource: string;
    frontMatter: FMDataType;
};

const Article = (props: Props) => {
    const router = useRouter();
    const { source, frontMatter } = props;

    if (!router.isFallback && !frontMatter.slug) {
        return <ErrorPage statusCode={404} />;
    }

    const components = {
        Title: () => <h1>{frontMatter.title}</h1>,
        PublishedOn: () => <div>{frontMatter.publishedOn}</div>,
        Box: Box,
    };

    return (
        <>
            <MDXRemote {...source} components={{Box}} />
        </>
    );
};

type Params = {
    params: {
        slug: string;
    };
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
    const paramsId =
        typeof ctx.params?.slug === 'string' ? ctx.params.slug : 'nothing';
    console.debug(paramsId);
    const articleFilePath = path.join(articlesDirectory, `${paramsId}.mdx`);
    const source = fs.readFileSync(articleFilePath);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [
                rehypeSlug,
                [
                    rehypeAutolinkHeadings,
                    {
                        properties: { className: ['anchor'] },
                    },
                    { behaviour: 'wrap' },
                ],
                rehypeHighlight,
                rehypeCodeTitles,
            ],
        },
    });

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = articleFilesPaths
        .map((path) => path.replace(/\.mdx?$/, ''))
        .map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
};

export default Article;
