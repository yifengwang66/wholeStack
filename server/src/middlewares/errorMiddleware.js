module.exports = function (err, req, res, next) {
    console.log("errorMiddleware", err)
    if(err){
        const errObj = {
            code: 500,
            err: err instanceof Error ? err.message : err
        }
        res.status(500).send(errObj);
    }else{
        next();
    }
}
