import { writeFileSync } from "node:fs";
import Parser from "rss-parser";
const parser = new Parser();

(async () => {
  let jsonFeed = {};
  const [feed1, feed2, feed3, caRss, noteFeed] = await Promise.all([
    parser.parseURL("https://zenn.dev/yuto76/feed"),
    parser.parseURL(
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCu6ckjaLjqCKY-c01fEqUqw",
    ),
    parser.parseURL("https://speakerdeck.com/yossydev.rss"),
    parser.parseURL("https://speakerdeck.com/cyberagentdevelopers.rss"),
    parser.parseURL("https://note.com/yossydev/rss"),
  ]);
  const items = feed1.items.map((data) => {
    return data;
  });
  jsonFeed = items;
  writeFileSync("app/libs/rss/data.json", JSON.stringify(jsonFeed));

  const items2 = feed2.items.map((data) => {
    return data;
  });
  jsonFeed = items2;
  writeFileSync("app/libs/rss/youtube.json", JSON.stringify(jsonFeed));

  const items3 = feed3.items.map((data) => {
    return data;
  });
  const items4 = caRss.items
    .map((data) => {
      return data;
    })
    .filter((data) => {
      return (
        data.link ===
        "https://speakerdeck.com/cyberagentdevelopers/fantech-web-biome"
      );
    });

  jsonFeed = [...items3, ...items4].sort((a, b) => {
    const dateA = new Date(a.isoDate).getTime();
    const dateB = new Date(b.isoDate).getTime();
    return dateB - dateA;
  });
  writeFileSync("app/libs/rss/speakerdeck.json", JSON.stringify(jsonFeed));

  const noteItems = noteFeed.items.map((data) => {
    return data;
  });
  jsonFeed = noteItems;
  writeFileSync("app/libs/rss/note.json", JSON.stringify(jsonFeed));
})();
