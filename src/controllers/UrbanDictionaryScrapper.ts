import fetch, { Response } from "node-fetch";
import { Definition } from "src/types";
const $ = require("cheerio");

const url = "https://www.urbandictionary.com/define.php?term=";

module.exports = {
  async getWordDefinition(word: string, simplified: boolean) {
    return fetch(url + word)
      .then(async (response: Response) => {
        const html = await response.text();

        let definitions: Definition[] = [
          {
            word,
            definition: [],
            example: [],
            source: url + word,
          },
        ];

        //Returns word with top definition
        const def_panel = await $(".definition", html);

        let index = 0;

        if (def_panel.length <= 0) {
          return null;
        }

        while (index < def_panel.length) {
          const def = def_panel[index];

          const word = await $(".word", def);
          const definition = await $(".meaning", def);
          const example = await $(".example", def);

          let html = undefined;

          if (!simplified) {
            html = {
              definition: definition.html(),
              example: example.html(),
            };
          }

          definitions[index] = {
            word: word.text(),
            definition: definition.text(),
            example: example.text(),
            source: url + word.text(),
            html,
          };

          index++;
        }

        return definitions;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  },
};
