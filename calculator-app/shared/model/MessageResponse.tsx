import { MessageError } from "./MessageError";

export class MessageResponse {

    message: String
    error: MessageError

    constructor(message: String, error: MessageError) {
        this.message = message;
        this.error = error;
    }

}