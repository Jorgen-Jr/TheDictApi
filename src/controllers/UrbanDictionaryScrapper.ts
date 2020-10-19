import fetch, { Response } from "node-fetch";
import { Definition } from "src/types";
const $ = require("cheerio");

const url = "https://www.urbandictionary.com/define.php?term=";

module.exports = {
  async getWordDefinition(word: string) {
    return fetch(url + word)
      .then(async (response: Response) => {
        const html = await response.text();

        let definitions: Definition[] = [
          {
            word,
            antonyms: [],
            definition: [],
            examples: [],
            source: url + word,
            synonyms: [],
          },
        ];

        //Returns word with top definition
        const def_panel = await $(".def-panel", html);

        let index = 0;

        if (def_panel.length <= 0) {
          return null;
        }

        while (index < def_panel.length) {
          const def = def_panel[index];

          console.log(index + 1 + " de " + def_panel.length);

          definitions[index] = {
            word: await $(".word", def).text(),
            definition: await $(".meaning", def).text(),
            examples: await $(".example", def).text(),
            source: url + word,
            synonyms: [],
            antonyms: [],
          };

          index++;
        }

        //Returns the words found at website.

        return definitions;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
};
