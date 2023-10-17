export class performOperationRequest{
    operation: string;
    firstOperator: number;
    secondOperator: number;

    constructor(operation: string, firstOperator: number, secondOperator: number){
        this.operation = operation;
        this.firstOperator = firstOperator;
        this.secondOperator = secondOperator;
    }
}