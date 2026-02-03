import Parser from "rss-parser";

const parser = new Parser();

export async function getMediumPosts() {
  const feed = await parser.parseURL(
    "https://medium.com/feed/@sesanknagamunukutla"
  );

  return feed.items.slice(0, 10).map(item => ({
    title: item.title ?? "",
    url: item.link ?? "",
    date: item.pubDate ?? "",
    source: "Medium",
  }));
}
