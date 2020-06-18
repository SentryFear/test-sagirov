import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsTypes} from "./store";
import {ResultCodesEnum, authAPI} from "../api/api";
import setAuthToken from "../api/setAuthToken";

let initialState = {
    userId: null as number | null,
    name: null as string | null,
    nickname: null as string | null,
    email: null as string | null,
    phone: null as string | null,
    isAuth: false,
    isRegister: false,
    showSuccess: false,
    showError: null as string | null
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'TS/AUTH/SHOW_SUCCESS':
        case "TS/AUTH/SHOW_ERROR":
        case 'TS/AUTH/SET_USER_DATA':
        case "TS/AUTH/SET_IS_REGISTER":
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

export const actions = {
    setAuthUserData: (userId:number | null, name:string | null, nickname:string | null, email:string | null, phone:string | null, isAuth:boolean) => ({
        type: 'TS/AUTH/SET_USER_DATA', payload:
            {userId, name, nickname, email, phone, isAuth}
    } as const),
    showSuccess: (showSuccess:boolean) => ({
        type: 'TS/AUTH/SHOW_SUCCESS', payload:
            {showSuccess}
    } as const),
    showError: (showError:string) => ({
        type: 'TS/AUTH/SHOW_ERROR', payload:
            {showError}
    } as const),
    setIsRegister: (isRegister:boolean) => ({
        type: 'TS/AUTH/SET_IS_REGISTER', payload:
            {isRegister}
    } as const)
}

export const getAuthUserData = (): ThunkType => async (dispatch) => {

    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, name, nickname, email, phone} = meData.data;
        dispatch(actions.setAuthUserData(id, name, nickname, email, phone, true))
    }
}

export const login = (email: string, password: string):ThunkType => async (dispatch) => {

    let data = await authAPI.login(email, password);

    if (data.resultCode === ResultCodesEnum.Success) {

        let {userId, email, token} = data.data;

        localStorage.setItem('userData', JSON.stringify({
            userId: userId, token: token
        }))

        setAuthToken(token)

        dispatch(actions.showSuccess(true))

        setTimeout(() => {
            dispatch(getAuthUserData())
            dispatch(actions.showSuccess(false))
        }, 2000)


    } else {
        dispatch(actions.showError(data.messages[0]))
        setTimeout(() => dispatch(actions.showError('')), 4000)
    }
}

export const register = (name: string, nickname: string, email: string, phone: string, password: string):ThunkType => async (dispatch) => {
    let data = await authAPI.register(name, nickname, email, phone, password);
    if (data.resultCode === ResultCodesEnum.Success) {
        //dispatch(getAuthUserData())
        dispatch(actions.showSuccess(true))
        setTimeout(() => {
            dispatch(actions.setIsRegister(true))
            dispatch(actions.showSuccess(false))
        }, 2000)
    } else {
        dispatch(actions.showError(data.messages[0]))
        setTimeout(() => dispatch(actions.showError('')), 4000)
    }

}

export const logout = (): ThunkType => async (dispatch) => {
    //let response = await authAPI.logout();
    //if (response.resultCode === ResultCodesEnum.Success) {
        localStorage.setItem('userData', JSON.stringify({
            userId: '', token: ''
        }))
        dispatch(actions.setAuthUserData(null, null, null,null,null, false));
    //}
}

export default authReducer

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>