class ApiResponse {
    constructor(status, data, message = "process is successfull"){
        this.status = status;
        this.data = data;
        this.message = message;
    }
}

export {ApiResponse}