import { type FC, useEffect, useState } from "hono/jsx";
import { useDebounce } from "../hooks/useDebounce";

const LikeButton: FC = () => {
  const [allCount, setAllCount] = useState(0);
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const value = useDebounce(count, 1000);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/like/${window.location.pathname.replace("/posts/", "")}`,
      );
      const res = await response.json<{ likes: number; slug: string }>();
      setAllCount(res.likes);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (value === 0) {
        return;
      }
      const response = await fetch(
        `${
          import.meta.env.VITE_API_URL
        }/like/${window.location.pathname.replace("/posts/", "")}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ increment: value }),
        },
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
    })();
  }, [value]);

  const handleClick = () => {
    setAllCount((e) => e + 1);
    setCount((e) => e + 1);
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 300);
  };

  return (
    <div class="text-center mt-10">
      <button
        type="button"
        onClick={handleClick}
        className={`px-4 py-2 bg-gray-100 dark:bg-transparent dark:border-2 rounded-full w-36 h-36 text-7xl shadow-lg transform transition duration-500 ease-in-out ${
          clicked ? "scale-110" : "scale-100"
        }`}
      >
        👍
        <br />
      </button>
      <p class="text-lg mt-3">{allCount}</p>
    </div>
  );
};

export default LikeButton;
