import React from 'react'
import {reduxForm, InjectedFormProps} from "redux-form"
import './Login.css'
import {Checkbox, createField, GetStringKeys, Input} from "../../common/FormsControls/FormsControls";
import {
    email,
    normalizePhone, password,
    phone,
    required
} from "../../common/validators/validators";
import {AppStateType} from "../../redux/store";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import { register } from '../../redux/auth-reducer';
import Vector from '../../img/Vector.svg';

const RegisterForm: React.FC<InjectedFormProps<RegisterFormValuesType, RegisterFormOwnProps> & RegisterFormOwnProps> = ({handleSubmit, error, submitting, invalid, apiError}) => {
    return (
        <div className="container">
            <div className="register-form">
                <h1>Регистрация</h1>
                <h2>Введите свои данные</h2>
                {apiError ? <div className="api-error">{apiError}</div> : ''}
                <form onSubmit={handleSubmit}>
                    {createField<LoginFormValuesTypeKeys>("Имя", "name", [required], Input)}
                    {createField<LoginFormValuesTypeKeys>("Никнейм", "nickname", [required], Input)}
                    {createField<LoginFormValuesTypeKeys>("Email", "email", [required, email], Input)}
                    {createField<LoginFormValuesTypeKeys>("Телефон", "phone", [required, phone], Input, {normalize: normalizePhone})}
                    {createField<LoginFormValuesTypeKeys>("Пароль", "password", [required, password], Input, {type: 'password'})}
                    {createField<LoginFormValuesTypeKeys>("", "allowCheck", [required], Checkbox, {type: 'checkbox'}, "Я даю свое согласие на обработку персональных данных")}
                    <div className="button">
                        <input type="submit" value="Зарегистрироваться" disabled={submitting || invalid}/>
                    </div>

                </form>
                <p className="sign-in">Есть аккаунт? <a href="/login">Войти</a></p>
            </div>
        </div>
    )
}
type RegisterFormOwnProps = {
    apiError: string | null
}
type RegisterFormValuesType = {
    name: string
    nickname: string
    email: string
    phone: string
    password: string
    allowCheck: boolean | null
}
type LoginFormValuesTypeKeys = GetStringKeys<RegisterFormValuesType>
const RegisterReduxForm = reduxForm<RegisterFormValuesType, RegisterFormOwnProps>({form: 'login',
    //initialValues: {name: 'string', nickname: 'string', email: 'string@ya.ru', phone: '+7 (123) 444-55-66', password: 'stringGG44%'}
})(RegisterForm)

type MapStatePropsType = {
    isAuth: boolean
    isRegister: boolean
    showSuccess: boolean
    showError: string | null
}

type MapDispatchPropsType = {
    register: (name: string, nickname: string, email: string, phone: string, password: string) => void
}

const ShowMessage = (props: any) => {
    return (
        <div className={'success-message' + (props.open ? ' open' : '')}>
            <img src={Vector} alt="Success"/>
            <h1>Вы зарегистрированы</h1>
        </div>
    )
}

const Register: React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: RegisterFormValuesType) => {
        props.register(formData.name, formData.nickname, formData.email, formData.phone, formData.password);
    }
    if (props.isRegister) {
        return <Redirect to={"/login"}/>
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

export default connect(mapStateToProps, {register})(Register);