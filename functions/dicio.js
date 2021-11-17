const DicioController = require("../dist/controllers/DicioController");

exports.handler = async event => {

    const word = event.queryStringParameters.word || 'palavra'

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': '2592000',
        'Access-Control-Allow-Credentials': 'true',
    };

    const response = await DicioController.default.get(word);

    return {

        statusCode: 200,

        headers: headers,

        body: JSON.stringify(response),

    }

}