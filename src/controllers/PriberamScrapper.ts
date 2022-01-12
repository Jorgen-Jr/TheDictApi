import fetch, { Response } from "node-fetch";
import { Definition } from "src/types";
import $ from "cheerio";
import { ErrorCallback } from "typescript";

const url = "https://dicionario.priberam.org/";

module.exports = {
  async getWordDefinition(word: string, simplified: boolean) {
    return await fetch(url + word)
      .then(async (response: Response) => {
        const target = await response.text();

        let definition: Definition = {
          word,
          definition: [],
          source: url + word,
        };

        //Returns word with top definition
        const def_card = await $("#resultados", target);

        definition.word = word;

        await $(".def", def_card).map(async (_, def) => {
          const text = $(await def.children).text();

          definition.definition.push(text);
        });

        if (!simplified) {
          definition.html = {
            definition: def_card.html(),
          };
        }

        if (definition.definition.length === 0) {
          return null;
        }

        return definition;
      })
      .catch((error: ErrorCallback) => {
        console.log(error);
        return false;
      });
  },
};
