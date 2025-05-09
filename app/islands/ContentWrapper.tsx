import {
  type Child,
  type FC,
  type PropsWithChildren,
  useState,
} from "hono/jsx";

type SupportedTranslatorAPI =
  | "en"
  | "zn"
  | "ja"
  | "pt"
  | "ru"
  | "es"
  | "tr"
  | "hi"
  | "vi"
  | "bn";
const SELECT_OPTIONS: SupportedTranslatorAPI[] = [
  "ja",
  "en",
  "zn",
  "pt",
  "ru",
  "es",
  "tr",
  "hi",
  "vi",
  "bn",
];

type Props = {
  content: Child;
};

const ContentWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  content,
}) => {
  const [value, setValue] = useState<SupportedTranslatorAPI>("ja");
  const [translatedContent, setTranslatedContent] = useState<string | null>(
    null,
  );

  // biome-ignore lint: lint/suspicious/noExplicitAny
  const handleSelectChange = async (e: any) => {
    setValue(e.target.value);

    if (
      "translation" in self &&
      // biome-ignore lint: lint/suspicious/noExplicitAny
      "createTranslator" in (self.translation as any)
    ) {
      try {
        // biome-ignore lint: lint/suspicious/noExplicitAny
        const translator = await (self.translation as any).createTranslator({
          sourceLanguage: "ja",
          targetLanguage: e.target.value,
        });
        const res = await translator.translate(content);
        setTranslatedContent(res);
      } catch (error) {
        console.error("translator error", error);
      }
    } else {
      window.alert("The Translator API is not supported");
    }
  };

  return (
    <>
      {/* <div class="text-right mt-3">
        <label for="pet-select">translate to: </label>
        <select
          value={value}
          class="cursor-pointer"
          onChange={handleSelectChange}
        >
          {SELECT_OPTIONS.map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            );
          })}
        </select>
      </div> */}
      <div class="markdown text-left">
        {children}
        <div
          class="markdown"
          // biome-ignore lint: lint/security/noDangerouslySetInnerHtml
          dangerouslySetInnerHTML={{
            __html:
              translatedContent != null
                ? translatedContent
                : // biome-ignore lint: lint/suspicious/noExplicitAny
                  (content?.toString() as any),
          }}
        />
      </div>
    </>
  );
};

export default ContentWrapper;
