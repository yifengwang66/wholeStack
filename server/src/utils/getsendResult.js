exports.getErr = function (err="server inner error", errCode = 500) {
    return {
        code: errCode,
        msg: err
    }
}

exports.getResult = function (result, msg = 'OK') {
    return {
        code: 200,
        msg: msg,
        data: result
    }
}

exports.asyncHandler = function (handler, msg) {
    return async (req, res, next) => {
        try{
            const result = await handler(req, res, next);
            res.send(exports.getResult(result, msg))
        }catch (err) {
            next(err)
        }
    }
}
