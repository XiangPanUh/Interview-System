import axios from "axios";
import {appConstants} from "../shared/constants";

export const uploadFile = (formData: FormData, id: number) => {
    const uploadFilePromise = axios.post('http://localhost:8080/files/upload/'+ id,formData)
    return {
        type: appConstants.UPLOAD_FILE,
        payload: uploadFilePromise
    }
}

export const uploadExcel = (formData: FormData) => {
    const uploadExcelPromise = axios.post('http://localhost:8080/files/import',formData)
    return {
        type: appConstants.UPLOAD_EXCEL,
        payload: uploadExcelPromise
    }
}