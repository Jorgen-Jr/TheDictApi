const fetch = require("node-fetch");
const $ = require("cheerio");

const url = "https://www.dictionary.com/browse/";

exports.handler = async event => {

    const word = event.queryStringParameters.word || 'word'

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': '2592000',
        'Access-Control-Allow-Credentials': 'true',
    };

    const result = await fetch(url + word)
        .then(async (response) => {
            const html = await response.text();

            let definition = {
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
            const first_definition = $(".e16867sm0", html)[0];

            await $("section", first_definition).map(
                async (index, definition_element) => {
                    // Skip the first element, since it's a header for informations about...
                    if (index !== 0) {
                        let category = $.text(await $("h3", definition_element));

                        let return_def = {};

                        let return_cat_definition = [];

                        await definition_element.children.forEach(
                            async (definition_index) => {
                                $(".e1hk9ate4 > div", definition_index).map(
                                    (_, def) => {
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
                                    (_, def) => {
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
        .catch((error) => {
            console.log(error);
            return false;
        });

    return {

        statusCode: 200,
        headers: headers,
        body: JSON.stringify({ msg: `I'm working ${subject}!` }),

    }

}