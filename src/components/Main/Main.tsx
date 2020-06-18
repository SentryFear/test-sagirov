import React from 'react'
import {connect} from "react-redux";
import {logout} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/store";

type MapStatePropsType = {
    isAuth: boolean
    isRegister: boolean
    showSuccess: boolean
    showError: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string) => void
}

const Main = (props:any) => {
    return (
        <div>main page
            <button onClick={props.logout}>Log out</button>
        </div>
    )
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    isRegister: state.auth.isRegister,
    showSuccess: state.auth.showSuccess,
    showError: state.auth.showError
})

export default connect(mapStateToProps, {logout})(Main)