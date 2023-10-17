import API from "../environment/APIConfig";
import { DataResponse } from "../model/Data";
import { performOperationRequest } from "../model/PerformOperationRequest";

const OPERATION_ENDPOINTS = {
    OPERATION: "operation"
};

const OperationService = {
    getOperations: (token: string) =>
        API.get<DataResponse>(OPERATION_ENDPOINTS.OPERATION, { headers: { Authorization: `Bearer ${token}` } }).then(
            (res) => {
                console.log(res.data);
                return res.data
            }
        ),
    performOperation: (request: performOperationRequest,token: string) =>
        API.post<DataResponse>(OPERATION_ENDPOINTS.OPERATION, request, { headers: { Authorization: `Bearer ${token}` } }).then(
            (res) => {
                console.log(res.data);
                return res.data
            }
        ),
};

export default OperationService;