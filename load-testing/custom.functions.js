module.exports = {
    logHeaders: logHeaders,
    afterResponseHandler: afterResponseHandler
}

function logHeaders (requestParams, response, context, ee, next) {
    console.log(response.headers);
    return next(); // MUST be called for the scenario to continue
}

function afterResponseHandler (requestParams, response, context, event, next) {
    console.log(response.statusCode);
    if (response.statusCode !== 200 && response.statusCode !== 201) {
        if (response.statusMessage) {
            console.error(`${response.request.method}: ${response.request.uri.path},
                ${response.statusCode}: ${response.statusMessage}`);
        }

        let err = new Error();
        err.code = response.statusCode;
        // If needed, stop all tests as soon as the first error will occur
        // process.exit(err.code);
        return next(err);
    }

    return next(); 
}
