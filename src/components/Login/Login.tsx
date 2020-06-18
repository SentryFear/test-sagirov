import React from 'react'
import {reduxForm, InjectedFormProps} from "redux-form"
import './Login.css'
import {createField, GetStringKeys, Input} from "../../common/FormsControls/FormsControls";
import {
    email,
    normalizePhone, password,
    phone,
    required
} from "../../common/validators/validators";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import Vector from "../../img/Vector.svg";
import {Redirect} from "react-router-dom";


type MapStatePropsType = {
    isAuth: boolean
    isRegister: boolean
    showSuccess: boolean
    showError: string | null
}
type MapDispatchPropsType = {
    login: (email: string, password: string) => void
}

const ShowMessage = (props: any) => {
    return (
        <div className={'success-message' + (props.open ? ' open' : '')}>
            <img src={Vector} alt="Success"/>
            <h1>Вы авторизованы</h1>
        </div>
    )
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, error, submitting, invalid, apiError}) => {
    return (
        <div className="container">
            <div className="register-form">
                <h1>Вход</h1>
                <h2>Введите свои данные</h2>
                {apiError ? <div className="api-error">{apiError}</div> : ''}
                <form onSubmit={handleSubmit}>
                    {createField<LoginFormValuesTypeKeys>("Email или номер телефона", "email", [required], Input)}
                    {createField<LoginFormValuesTypeKeys>("Пароль", "password", [required], Input, {type: 'password'})}
                    <div className="button">
                        <input type="submit" value="Войти" disabled={submitting || invalid}/>
                    </div>

                </form>
                <p className="sign-in">Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
            </div>
        </div>
    )
}
type LoginFormOwnProps = {
    apiError: string | null
}
type LoginFormValuesType = {
    email: string
    password: string
}
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>
const RegisterReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)

const Login: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        props.login(formData.email, formData.password);
    }
    if (props.isAuth) {
        return <Redirect to={"/main"}/>
    }
    return (
        <div>
            <ShowMessage open={props.showSuccess} />
            <RegisterReduxForm onSubmit={onSubmit} apiError={props.showError}/>
        </div>
    )
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    isAuth: state.auth.isAuth,
    isRegister: state.auth.isRegister,
    showSuccess: state.auth.showSuccess,
    showError: state.auth.showError
})

export default connect(mapStateToProps, {login})(Login);