export async function AccessApi(query) {
  const token = window.env.TOKEN;
  return await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query: query }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
