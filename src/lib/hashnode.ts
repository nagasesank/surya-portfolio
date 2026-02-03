type HashnodePost = {
  title: string;
  url: string;
  date: string;
};

export async function getHashnodePosts(): Promise<HashnodePost[]> {
  const query = `
    query Publication($host: String!) {
      publication(host: $host) {
        posts(first: 10) {
          edges {
            node {
              title
              slug
              publishedAt
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://gql.hashnode.com", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        host: "fridaysecurity.hashnode.dev",
      },
    }),
  });

  if (!res.ok) {
    console.error("Hashnode fetch failed:", res.status);
    return [];
  }

  const json = await res.json();

  const edges = json?.data?.publication?.posts?.edges;
  if (!edges) return [];

  return edges.map((edge: any) => ({
    title: edge.node.title,
    url: `https://fridaysecurity.hashnode.dev/${edge.node.slug}`,
    date: edge.node.publishedAt,
  }));
}
