export class MessageError {

    exceptionName: String
    message: String

    constructor(exceptionName: String, message: String) {
        this.exceptionName = exceptionName;
        this.message = message;
    }

}