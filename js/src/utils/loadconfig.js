export async function LoadConfig() {
  window.env = await fetch("./js/src/config.json").then((res) => res.json());

  console.log("LoadConfig", window.env);
}
