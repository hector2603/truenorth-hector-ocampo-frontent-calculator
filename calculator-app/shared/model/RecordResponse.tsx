export class RecordResponse {
    id: number;
    amount: number;
    date: string;
    operationResponse: string;
    userBalance: number;
    status: string;
    operationType: string;

    constructor(id: number, amount: number, date: string, operationResponse: string, userBalance: number, status: string, operationType: string) {
        this.id = id;
        this.amount = amount;
        this.date = date;
        this.operationResponse = operationResponse;
        this.userBalance = userBalance;
        this.status = status;
        this.operationType = operationType;
    }
}