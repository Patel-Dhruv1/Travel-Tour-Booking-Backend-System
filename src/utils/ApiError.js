class ApiError extends Error {
    
    constructor(status, message = "operation failed"){
        super()
        this.status = status
        this.message = message
    }
}

export {ApiError}