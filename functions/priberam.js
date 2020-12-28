const fetch = require("node-fetch");
const $ = require("cheerio");

const url = "https://dicionario.priberam.org/";

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