const SwaggerParser = require('@apidevtools/swagger-parser');


module.exports = function (_) {
    const done = this.async();

    SwaggerParser.bundle(this.resourcePath)
        .then(spec => done(null, JSON.stringify(spec)))
        .catch(({message}) => done(message))
} 