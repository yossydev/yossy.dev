import build from "@hono/vite-build/bun";
import ssg from "@hono/vite-ssg";
import mdx from "@mdx-js/rollup";
import honox from "honox/vite";
import client from "honox/vite/client";
import rehypeHighlight from "rehype-highlight";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import type { UserConfigExport } from "vite";
import rehypeTOC from "./app/libs/vite-remark-toc-plugin";

const entry = "./app/server.ts";

const defineConfig = ({ mode }: { mode: string }): UserConfigExport => {
  if (mode === "client") {
    return {
      plugins: [client()],
      build: {
        rollupOptions: {
          input: ["/app/style.css"],
          output: {
            assetFileNames: "static/assets/[name].[ext]",
          },
        },
      },
    };
  }
  return {
    plugins: [
      honox(),
      build(),
      mdx({
        jsxImportSource: "hono/jsx",
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
        rehypePlugins: [rehypeHighlight, rehypeTOC],
      }),
      ssg({ entry }),
    ],
    optimizeDeps: {},
  };
};

export default defineConfig;
