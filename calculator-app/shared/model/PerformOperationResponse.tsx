export class PerformOperationResponse{
    result: string;
    amount: number;
    userBalance: number;


    constructor(result: string, amount: number, userBalance: number){
        this.result = result;
        this.amount = amount;
        this.userBalance = userBalance;
    }
}