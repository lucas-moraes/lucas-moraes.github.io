async function DecryptToken() {
  const key = window.memo.get("key");
  const { iv, encryptedData } = window.memo.get("token");
  const decoder = new TextDecoder();
  const descriptedToken = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedData,
  );

  return decoder.decode(descriptedToken);
}

export async function AccessApi(query) {
  const token = await DecryptToken();

  return await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({ query: query }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
