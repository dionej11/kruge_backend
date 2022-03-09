const ValidateBodyCategory = (request, response, next) => {
    if (request.body.name && request.body.icon) {
        next();
    } else {
        response.json({
            error: "HACEN FALTAN CAMPOS"
        })
    }
}

const ValidateBodyTransaction = (request, response, next) => {
    if (request.body.type && request.body.amount && request.body.category && 
        request.body.date && request.body.details && request.body.badge) {
        next();
    } else {
        response.json({
            error: "HACEN FALTAN CAMPOS"
        })
    }
}
module.exports = { ValidateBodyCategory, ValidateBodyTransaction };