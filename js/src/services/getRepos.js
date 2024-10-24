import { AccessApi } from "./accessApi.js";

export async function GetRepos() {
  const query = `query{ 
        viewer{ 
          repositories(
            first:100, 
            isFork:false, 
            ownerAffiliations: OWNER,
            privacy:PUBLIC, 
            orderBy:{
              field: CREATED_AT, 
              direction: DESC
            }
          ){
            nodes{ 
              name,
              primaryLanguage {
                name
              }        
            } 
          } 
        } 
      }`;
  return AccessApi(query)
    .then((res) => res.text())
    .then((body) => {
      const base = JSON.parse(body);

      console.log("getRepos", base.data.viewer.repositories.nodes);
      //return base.data.viewer.repositories.nodes;
    })
    .catch((error) => console.error(error));
}
