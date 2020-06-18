import axios from "axios"
import {UserType} from "../types/types"

axios.defaults.baseURL = 'http://api.dklabs.ru/sagirov';

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

type MeResponseDataType = {
    id: number
    name: string
    nickname: string
    email: string
    phone: string
}

type LoginResponseDataType = {
    userId: number
    email: string
    token: string
}

export const authAPI = {
    me() {
        return axios.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string) {
        return axios.post<APIResponseType<LoginResponseDataType, ResultCodesEnum>>(`auth/login`, {email, password})
            .then(res => res.data)
    },
    register(name: string, nickname: string, email: string, phone: string, password: string) {
        return axios.post<APIResponseType<LoginResponseDataType, ResultCodesEnum>>(`auth/register`, {name, nickname, email, phone, password})
            .then(res => res.data)
    },
    logout() {
        return axios.delete<APIResponseType>(`auth/login`).then(res => res.data)
    }
}