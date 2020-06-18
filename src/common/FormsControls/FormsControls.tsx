import React, {useState} from "react"
import {FieldValidatorType} from "../validators/validators"
import {Field, WrappedFieldMetaProps, WrappedFieldProps} from "redux-form"

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
}
type OwnProps = {
    placeholder: string | undefined
}

const FormControl: React.FC<FormControlPropsType> = ({meta : {touched, error}, children}) => {
    const hasError = touched && error
    return (
        <label className={(hasError ? 'error' : "")}>
            {children}
        </label>
    )
}

export const Input: React.FC<any> = (props) => {
    //const {input, meta, child, ...restProps} = props;
    const {input, meta, placeholder, type, ...restProps} = props
    const [typePasw, setTypePassw] = useState(type)

    const ChangeType = () => {
        if(typePasw === 'text') setTypePassw('password')
        else if(typePasw === 'password') setTypePassw('text')
    }

    if (type === 'password') return <FormControl {...props}><span className="eye" onClick={ChangeType}>&nbsp;</span><input {...input} {...restProps} type={typePasw} /><div className="label-text">{placeholder}</div></FormControl>
    return <FormControl {...props}><input {...input} {...restProps} /><div className="label-text">{placeholder}</div></FormControl>
}

export const Checkbox: React.FC<any> = (props) => {
    const {input, meta, child, id, text, placeholder, ...restProps} = props;
    return (
        <label className="checkbox">
            <input {...input} {...restProps} />
            <div className="checkbox__text">{text}</div>
        </label>
    )
}

export type GetStringKeys<T> = Extract<keyof T, string>

export function createField<FormValuesKey extends string>(
                            placeholder: string | undefined,
                            name: FormValuesKey,
                            validators: Array<FieldValidatorType>,
                            component: React.FC<WrappedFieldProps>,
                            props = {},
                            text = "") {
    return <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validators}
               component={component}
               text={text}
               required
               {...props}
        />
    </div>
}