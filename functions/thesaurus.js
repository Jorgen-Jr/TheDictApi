const UrbanDictionaryScrapper = require('./../src/controllers/UrbanDictionaryScrapper');

exports.handler = async event => {

    const word = event.queryStringParameters.word || 'word'

    const response = await UrbanDictionaryScrapper.getWordDefinition(word);

    return {

        statusCode: 200,

        body: response,

    }

}