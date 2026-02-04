export async function getMediumPosts() {
  const res = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@nagasesank"
  );

  const json = await res.json();

  const items = json?.items || [];

  return items.map((item: any) => ({
    title: item.title,
    description:
      item.description.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
    url: item.link,
    date: item.pubDate,
    source: "medium",
  }));
}
