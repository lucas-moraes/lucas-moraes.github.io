export async function LoadConfig() {
  //window.env = await fetch("./js/src/config.json").then((res) => res.json());
  window.env = Document.querySelector('meta[name="api-token"]').getAttribute(
    "content",
  );

  console.log("LoadConfig", window.env);
}