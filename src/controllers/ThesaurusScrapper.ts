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
        definition.word = await $(".entry-headword > div > h1", html)
          .text()
          .toUpperCase();

        //Returns word definition
        const first_definition = $(".css-1fj93w9", html)[0];

        await $("section", first_definition).map(
          async (index: number, definition_element: any) => {
            // Skip the first element, since it's a header for informations about...
            if (index !== 0) {
              let category = $.text(await $("h3", definition_element));

              let return_def: Object = {};

              let return_cat_definition: Object[] = [];

              await definition_element.children.forEach(
                async (definition_index: number) => {
                  $(".default-content > div", definition_index).map(
                    (_: any, def: any) => {
                      let index = def.attribs.value;

                      let definition = [];

                      definition = $.text($("span", def));

                      return_cat_definition.push({
                        index,
                        definition,
                      });
                    }
                  );

                  $(".expandable-content > div", definition_index).map(
                    (_: any, def: any) => {
                      let index = def.attribs.value;

                      let definition = [];

                      definition = $.text($("span", def));

                      return_cat_definition.push({
                        index,
                        definition,
                      });
                    }
                  );

                  return_def = {
                    category,
                    definitions: return_cat_definition,
                  };
                }
              );

              await definition.definition.push(return_def);
            }
          }
        );

        return definition;
      })
      .catch((error: ErrorCallback) => {
        console.log(error);
        return false;
      });
  },
};
