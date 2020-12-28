const fetch = require('node-fetch');

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

    const url = "https://www.urbandictionary.com/define.php?term=";

    const response = await fetch(url + word)
        .then(async (response) => {
            const html = await response.text();

            let definitions = [
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

    return {

        statusCode: 200,

        headers: headers,

        body: JSON.stringify(response),

    }

}