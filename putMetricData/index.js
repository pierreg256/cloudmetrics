module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.', req.body);

    var params;
    if (req.query.version != '2016-07-01'){
        return context.done(null, {status:400, body:{code:400, message:"Unsupported version. Supported versions : [2016-07-01]"}});
    }

    try {
        params = JSON.stringify(req.body);
    } catch (ex){
        context.log("Error parsing body:", ex);
        return context.done(null, {status:400, body:{code:400, message:"Body of your request must be in JSON format!"}});
    }

    if (!(req.body.namespace
    && req.body.metricname
    && req.body.metricvalue
    && req.body.metricunit
    && req.body.dimensions
    )) {
        return context.done(null, {status:400, body:{code:400, message:"Argument missing. Please read the documentation"}});
    }

    if (!(Array.isArray(req.body.dimensions))){
        return context.done(null, {status:400, body:{code:400, message:"dimensions parameter needs to be an array!"}});
    }

    req.body.dimensions.map(function(dimension){
        context.log(dimension.name, dimension.value);
    });

    return context.done(null, {status:200, body:{code:200, message:"Ok.", data:req.body}});
};

// format à mettre en place : 
// {
/*                        userID:"testuser001",
                        namespace:req.query.namespace,
                        metricTime: new Date(),
                        metricName: req.query.metricname,
                        metricValue:Number(req.query.metricvalue),
                        metricUnit:req.query.metricunit,
                        dimensionName: req.query.dimensionname,
                        dimensionValue: req.query.dimensionvalue
                    }*/