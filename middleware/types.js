const ValidateBodyCategory = (request, response, next) => {
    if (request.body.name && request.body.icon) {
        next();
    } else {
        response.json({
            error: "HACEN FALTAN CAMPOS"
        })
    }
}

module.exports = { ValidateBodyCategory };