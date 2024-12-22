import type { Env } from "hono";
import type { FC } from "hono/jsx";
import type { H } from "hono/types";
import { createRoute } from "honox/factory";
import { Heading } from "../../components/Heading";
import { LINK } from "../../constants";

const Text: FC<{ text: string }> = ({ text }) => {
  return <p class="text-lg font-medium mt-6">{text}</p>;
};

export default createRoute((c) => {
  return c.render(
    <>
      <Heading title="About Me" />
      <Text text="都内在住の技術好きなエンジニアです。出身は日本です。TypeScriptを主に扱っており、最近ではWeb周辺のエコシステムに興味があります。" />
      <br />
      自分のアウトプットに関しては、
      <a href={"/"} class="underline-offset-2 underline mr-1 text-blue-600">
        Blog
      </a>
      <a
        href={"/slides"}
        class="underline-offset-2 underline mr-1 text-blue-600"
      >
        Slides
      </a>
      <a
        href={"/youtube"}
        class="underline-offset-2 underline mr-1 text-blue-600"
      >
        Youtube
      </a>
      <a
        href={LINK.GITHUB}
        class="underline-offset-2 underline mr-1 text-blue-600"
      >
        GitHub
      </a>
      でチェックできます。
      <Heading title="Sponsor" />
      <Text text="GitHub Sponsorで応援してくださる方を募集しています🙏" />
      <br />
      <iframe
        src="https://github.com/sponsors/yossydev/card"
        title="Sponsor yossydev"
        class="md:w-[600px] w-full md:h-auto h-40"
      />
      <Heading title="Contact" />
      <Text
        text={`お仕事や登壇のご依頼などはXのDMもしくは${LINK.EMAIL}までご連絡ください。`}
      />
    </>,
    { title: "Profile | yossy.dev" },
  );
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
}) satisfies [H<Env, any, {}, Response | Promise<Response>>] as [
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  // biome-ignore lint/complexity/noBannedTypes: <explanation>
  H<Env, any, {}, Response | Promise<Response>>,
];
