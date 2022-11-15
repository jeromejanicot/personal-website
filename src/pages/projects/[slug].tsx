import React from 'react';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { projectsDirectory, projectFilesPaths } from '../../lib/getBlog';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { FMDataType } from '../../types/types';

type Props = {
    mdxSource: MDXRemoteSerializeResult;
    frontMatter: FMDataType;
};

const Project = ({ mdxSource, frontMatter }: Props) => {
    const router = useRouter();

    if (!router.isFallback && !frontMatter.slug) {
        return <ErrorPage statusCode={404} />;
    }

    const components = {
        Title: () => <h1>{frontMatter.title}</h1>,
        PublishedOn: () => <div>{frontMatter.publishedOn}</div>,
    };

    return (
        <>
            <main>
                <MDXRemote {...mdxSource} components={components} />
            </main>
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
    const projectFilePath = path.join(projectsDirectory, `${paramsId}.mdx`);
    const source = fs.readFileSync(projectFilePath);

    const { content, data } = matter(source);

    const mdxSource = await serialize(content, {
        parseFrontmatter: true,
    });

    return {
        props: {
            mdxSource: mdxSource,
            frontMatter: data,
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = projectFilesPaths
        .map((path) => path.replace(/\.mdx?$/, ''))
        .map((slug) => ({ params: { slug } }));

    return {
        paths,
        fallback: false,
    };
};

export default Project;
