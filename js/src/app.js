import { face } from "./renders/face.js";
import { github } from "./renders/github.js";
import { linkedin } from "./renders/linkedin.js";
import { macbook } from "./renders/macbook.js";
import { whatsapp } from "./renders/whatsapp.js";
import { LoadConfig } from "./utils/loadconfig.js";
import { GetRepos } from "./services/getRepos.js";

(async () => {
  await LoadConfig();
  face();
  github();
  linkedin();
  macbook();
  whatsapp();

  const year = new Date().getFullYear() - 2020;
  document.getElementById("yearExperience").innerHTML = `${year} anos`;

  GetRepos();
})();
