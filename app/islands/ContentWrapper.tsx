import type { Child } from "hono/jsx";
import { ContentWrapper } from "./ContentWrapper.1";

export type SupportedTranslatorAPI =
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

export type Props = {
  content: Child;
};

export default ContentWrapper;
