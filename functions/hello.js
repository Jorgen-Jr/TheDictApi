exports.handler = async event => {

    const subject = event.queryStringParameters.name || 'Hooman :)'

    return {

        statusCode: 200,

        body: { msg: `I'm working ${subject}!` },

    }

}