export class UserInfo {
    
    id : number
    username : String
    status : String
    role : String
    balance : number

    constructor(id: number, username: String, status: String, role: String, balance: number) {
        this.id = id;
        this.username = username;
        this.status = status;
        this.role = role;
        this.balance = balance;
    }

}