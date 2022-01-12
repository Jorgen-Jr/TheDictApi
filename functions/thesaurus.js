const ThesaurusScrapper = require('../src/controllers/ThesaurusScrapper');

exports.handler = async event => {

    const word = event.queryStringParameters.word || 'word';
    const simplified = event.queryStringParameters.simplified || 'true';

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': '2592000',
        'Access-Control-Allow-Credentials': 'true',
    };


    const response = await ThesaurusScrapper.getWordDefinition(word, simplified).catch((error) => {
        console.log(error);
        return false;
    });

    return {

        statusCode: 200,
        headers: headers,
        body: JSON.stringify(response),

    }

}