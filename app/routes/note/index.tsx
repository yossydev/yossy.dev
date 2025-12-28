import { Fragment } from "hono/jsx";
import type { JSX } from "hono/jsx/jsx-runtime";
import { Heading } from "../../components/Heading";
import { rssClient } from "../../libs/rss/rss";

const FIRST_NOTE_YEAR = 2021;

export default function Note(): JSX.Element {
  const yearlyBlogs = () => {
    const data = [];
    const thisYear = new Date().getFullYear();
    for (let year = FIRST_NOTE_YEAR; year <= thisYear; year++) {
      const noteArticles = rssClient
        .findNote()
        .filter((post) => {
          const postYear = new Date(post.date).getFullYear();
          return postYear === year;
        })
        .map((post) => ({
          id: post.id,
          date: post.date,
          title: post.title,
          link: post.link,
          postedIn: "note",
        }));

      data.push({
        year: year,
        posts: noteArticles.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        }),
      });
    }
    return data;
  };

  return (
    <div class="mt-16">
      <Heading title="Note" />
      <ul class="mt-10">
        {yearlyBlogs()
          .reverse()
          .map((res, index) => {
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: enable index
              <Fragment key={`${index}`}>
                <h3 class="text-xl my-5 font-bold">{res.year}</h3>
                {res.posts.map(({ id, title, date, link }) => {
                  return (
                    <li key={id} class="text-lg mt-2 md:mt-1">
                      <time class="tabular-nums tnum date pr-3">{date}</time>
                      <br class="block md:hidden" />
                      <a class="text-blue-600 underline" href={link}>
                        {title}
                      </a>
                    </li>
                  );
                })}
              </Fragment>
            );
          })}
      </ul>
    </div>
  );
}
