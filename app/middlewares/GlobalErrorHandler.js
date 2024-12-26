const ErrorProvider = require("../Error/ErrorProvider")
const DatabaseError = require("../Error/DatabaseError")
const ConflictError = require("../Error/ConflictError")
const ValidationError = require("../Error/ValidationError")
const GlobalErrorHandler = (err,req,res,next) => {
    console.log("running error controller")
    console.log(err)

    if(err instanceof ErrorProvider || err instanceof DatabaseError || err instanceof ConflictError || err instanceof ValidationError) {
        console.log('running this also')
        return res.status(err.statusCode).json({"status":err.status,Error:err.message})
    }
    return res.status(500).json({"status":false,"Error":"Some internal server error"})
}

module.exports = GlobalErrorHandler