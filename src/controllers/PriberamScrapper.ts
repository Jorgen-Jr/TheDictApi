import fetch, { Response } from "node-fetch";
import { Definition } from "src/types";
import $ from "cheerio";
import { ErrorCallback } from "typescript";

const url = "https://dicionario.priberam.org/";

module.exports = {
  async getWordDefinition(word: string) {
    return await fetch(url + word)
      .then(async (response: Response) => {
        const html = await response.text();

        let definition: Definition = {
          word,
          definition: [],
          source: url + word,
        };

        //Returns word with top definition
        const def_card = await $("#resultados", html);

        definition.word = word;

        await $(".def", def_card).map(async (index, def) => {
          const text = $(await def.children).text();

          definition.definition.push({
            index,
            definition: text,
          });
        });

        return definition;
      })
      .catch((error: ErrorCallback) => {
        console.log(error);
        return false;
      });
  },
};
