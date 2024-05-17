module.exports= function errorMiddleware(err, req, res, next) {
    let status;
    let message = {};
    
    switch (err.name) {
        case "ProductNotFound":
            status =  404;
            message = `Product not found`;
            break;
        case "OrderNotFound":
            status =  404;
            message = `Product not found`;
            break;
        case "NoAccess":
            status =  403;
            message = `You have no access to this page`;
            break;
        case "JsonWebTokenError":
            status =  401;
            message = `Invalid Token`;
            break;
        case "InvalidUser":
            status =  401;
            message = `Invalid Email/Password`;
            break; 
        case "EmptyEmail":
            status =  400;
            message = `Empty Email field`;
            break;  
        case "EmptyPassword":
            status =  400;
            message = `Empty Password field`;
            break;  
        case "SequelizeValidationError":
            status =  400;
            message = `${err.errors[0].message}`;
            break;   
        case "SequelizeUniqueConstraintError":
            status =  400;
            message = `${err.errors[0].message}`;
            break;  
        case "sizeNotFound":
            status =  400;
            message = `Please select your preferred size`;
            break;  
        case "notOnCart":
            status =  403;
            message = `Not allowed to change this order`;
            break; 
        default:
            console.log(err); 
            status = 500;
            message = `Internal Server Error`;
            break;
    }

    res.status(status).json( {message })
}