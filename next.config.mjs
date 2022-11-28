/** @type {import('next').NextConfig} */
import remarkFrontmatter from "remark-frontmatter";
import nextMDX from "@next/mdx";

const withMDX = nextMDX({
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
    ],
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
  loader: "@mdx-js/loader",
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
    providerImportSource: "@mdx-js/react",
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});

export default withMDX;
