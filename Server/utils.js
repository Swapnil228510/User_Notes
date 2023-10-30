function createSuccessResponse(data){
    return {status : 'success' , data}
}

function createErrorResponse(error){
    return {status : 'error' , error}
}

function createResponse(error , data){
    return error ? createErrorResponse(error) : createSuccessResponse(data)
}
module.exports ={
    createErrorResponse,
    createSuccessResponse,
    createResponse
}
