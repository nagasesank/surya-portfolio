export async function getHashnodePosts() {
  const res = await fetch("https://gql.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          publication(host: "fridaysecurity.hashnode.dev") {
            posts(first: 10) {
              edges {
                node {
                  title
                  brief
                  slug
                  publishedAt
                }
              }
            }
          }
        }
      `,
    }),
  });

  const json = await res.json();

  const edges = json?.data?.publication?.posts?.edges || [];

  return edges.map((edge: any) => ({
    title: edge.node.title,
    description: edge.node.brief,
    url: `https://fridaysecurity.hashnode.dev/${edge.node.slug}`,
    date: edge.node.publishedAt,
    source: "hashnode",
  }));
}
