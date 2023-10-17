import API from "../environment/APIConfig";
import { DataResponse } from "../model/Data";

const USER_ENDPOINTS = {
    INFORMATION: "user"
};

const UserService = {
    getUser: (token: string) =>
        API.get<DataResponse>(USER_ENDPOINTS.INFORMATION, { headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json' } }).then(
            (res) => {
                console.log(res.data);
                return res.data
            }
        )
};

export default UserService;