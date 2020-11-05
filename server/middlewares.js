function printReq(req, res, next) {
    const { url, query, params, body, headers } = req;
    console.log("printReq : ")
    console.log({
        url,
        query,
        params,
        body
    });
    console.log("¤¤¤\n")
    next();
}

exports.printReq = printReq;
