import API from "../environment/APIConfig";
import { DataResponse } from "../model/Data";

const RECORD_ENDPOINTS = {
    RECORD: "record",
    RECORD_DELETE: "record/"
};

const RecordService = {
    getRecord: (token: string, page: number, numberperpage: number, columnFilter: string|undefined, valueFilter: string|undefined, columnSort: string|undefined, sortDirection: string|undefined, status: string) => {
        const params = {
            page: page || undefined,
            numberperpage: numberperpage || undefined,
            columnFilter: columnFilter || undefined,
            valueFilter: valueFilter || undefined,
            columnSort: columnSort || undefined,
            sortDirection: sortDirection || undefined,
            status: status || undefined
        };
        console.log(params);
        console.log("token -> ", token);
        return API.get<DataResponse>(RECORD_ENDPOINTS.RECORD, {
            headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json' },
            params
        }).then((res) => {
            console.log(res.data);
            return res.data;
        });
    },
    deleteByID: (token: string,id : number ) => API.delete(RECORD_ENDPOINTS.RECORD_DELETE + id,  { headers: { Authorization: `Bearer ${token}` , 'Content-Type': 'application/json' } }).then((res) => res),
};

export default RecordService;
