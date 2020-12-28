exports.handler = async event => {

    const subject = event.queryStringParameters.name || 'Hooman :)'

    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Max-Age': '2592000',
        'Access-Control-Allow-Credentials': 'true',
    };

    return {

        statusCode: 200,
        headers: headers,
        body: { msg: `I'm working ${subject}!` },

    }

}