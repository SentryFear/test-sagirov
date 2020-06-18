import {getAuthUserData} from "./auth-reducer";
import {InferActionsTypes} from "./store";
import setAuthToken from "../api/setAuthToken";

let initialState = {
    initialized: false
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess: () => ({type: 'SN/APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeApp = () => (dispatch: any) => {

    if(localStorage.userData) {

        // @ts-ignore
        let user = JSON.parse(localStorage.getItem('userData'))

        setAuthToken(user.token);
    }

    let promise = dispatch(getAuthUserData());

    Promise.all([promise]).then(() => dispatch(actions.initializedSuccess()));
}


export default appReducer;