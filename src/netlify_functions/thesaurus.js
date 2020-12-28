import ThesaurusScrapper from '../controllers/ThesaurusScrapper'

exports.handler = async event => {

    const word = event.queryStringParameters.word || 'word'

    const response = await ThesaurusScrapper.getWordDefinition(word);

    return {

        statusCode: 200,

        body: response,

    }

}