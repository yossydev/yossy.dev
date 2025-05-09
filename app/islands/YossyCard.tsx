import type { FC } from "hono/jsx";

export const YossyCard: FC = () => {
  return (
    <div class="mt-10 rounded-lg overflow-hidden bg-transparent dark:text-white text-sm leading-relaxed p-4 border-2">
      <pre>
        <code>
          {`$ npx yossydev

┌──────────────────────────────────────────────────┐
│                                                  │
│      Yuto Yoshino / yossydev                     │
│ ─────────────────────────────────────────────────│
│                                                  │
│ Work    :: Frontend Engineer in Tokyo            │
│ X       :: https://x.com/yossydev                │
│ Bluesky :: https://bsky.app/profile/yossydev.com │
│ GitHub  :: https://github.com/yossydev           │
│ Email   :: yossydev@yossy.dev                    │
│ Web     :: https://yossy.dev/                    │
│                                                  │
│ ─────────────────────────────────────────────────│
│ > Run npx yossydev anytime to see this card      │
└──────────────────────────────────────────────────┘`}
        </code>
      </pre>
    </div>
  );
};
