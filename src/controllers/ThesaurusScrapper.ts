import fetch, { Response } from "node-fetch";
import { Definition } from "src/types";
import { ErrorCallback } from "typescript";
const $ = require("cheerio");

const url = "https://www.dictionary.com/browse/";

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

        definition.source = url + word;

        //Returns the found word
        definition.word = await $(".entry-headword > div > h1", html).text().toUpperCase();

        //Returns word definition
        const first_definition = $(".e16867sm0", html)[0];

        await $("section", first_definition).map(async (index: number, definition_element: any) => {
          // Skip the first element, since it's a header for informations about...
          if (index !== 0) {
            let return_def: String[] = [];

            let return_cat_definition: String[] = [];

            await definition_element.children.forEach(async (definition_index: number) => {
              await $(".e1hk9ate4 > div", definition_index).map((_: any, def: any) => {
                let definition = [];

                definition = $.text($("span", def));

                return_cat_definition.push(definition);
              });

              $(".expandable-content > div", definition_index).map((_: any, def: any) => {
                let definition = [];

                definition = $.text($("span", def));

                return_cat_definition.push(definition);
              });

              return_def = return_cat_definition;
            });

            definition.definition = return_def;
          }
        });

        return definition;
      })
      .catch((error: ErrorCallback) => {
        console.log(error);
        return false;
      });
  },
};
