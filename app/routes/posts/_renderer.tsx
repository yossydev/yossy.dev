import type { MiddlewareHandler } from "hono";
import { jsxRenderer } from "hono/jsx-renderer";
import ContentWrapper from "../../islands/ContentWrapper";
import LikeButton from "../../islands/LikeButton";
import SnsButton from "../../islands/SnsButton";

export default jsxRenderer(({ children, Layout, frontmatter }) => {
  const _title = `${frontmatter?.title} | yossy.dev`;
  return (
    <Layout title={_title} description={frontmatter?.description}>
      <div class="text-right mt-3">
        <ContentWrapper content={children?.toString() as string}>
          <h1>{frontmatter?.title}</h1>
          <dl class="flex items-center gap-3">
            <div class="flex items-center gap-1">
              <dt>publishedAt: </dt>
              <dd>{frontmatter?.date}</dd>
            </div>
            <div class="flex items-center gap-1">
              <dt>updatedAt: </dt>
              <dd>{frontmatter?.updatedAt}</dd>
            </div>
          </dl>
        </ContentWrapper>
      </div>
      <LikeButton />
      {/* <SnsButton title={_title} path={frontmatter?.path ?? ""} /> */}
    </Layout>
  );
}) satisfies MiddlewareHandler as MiddlewareHandler;
