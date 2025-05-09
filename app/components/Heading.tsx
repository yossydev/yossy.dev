import type { FC } from "hono/jsx";

export const Heading: FC<{ title: string }> = ({ title }) => {
  return (
    <div class="border-b border-black mt-10">
      <h1 class="text-2xl font-semibold pb-1 dark:text-white">{title}</h1>
    </div>
  );
};
