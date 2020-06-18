export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;

    return "Field is required";
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value) => {
    if (value.length > maxLength) return `Max length is ${maxLength} symbols`;
    return undefined;
}

export const email: FieldValidatorType = (value) => {

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) return "Invalid email address"

    return undefined;
}

export const phone: FieldValidatorType = (value) => {

    if (!/^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}$/i.test(value)) return "Invalid phone number"

    return undefined;
}

export const password: FieldValidatorType = (value) => {

    if (!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(value)) return "Invalid password"

    return undefined;
}

export const normalizePhone = (value:any, previousValue:any) => {
    if (!value) {
        return value
    }
    const onlyNums = value.replace(/[^\d]/g, '')
    if (!previousValue || value.length > previousValue.length) {
        // typing forward
        if (onlyNums.length === 1) {
            return "+"+onlyNums + ' ('
        }
        if (onlyNums.length === 4) {
            return "+"+onlyNums.slice(0, 1) + ' (' + onlyNums.slice(1, 4) + ') '
        }
        if (onlyNums.length === 7) {
            return "+"+onlyNums.slice(0, 1) + ' (' + onlyNums.slice(1,4) + ') ' + onlyNums.slice(4, 7)
        }
        if (onlyNums.length === 9) {
            return "+"+onlyNums.slice(0, 1) + ' (' + onlyNums.slice(1,4) + ') ' + onlyNums.slice(4, 7) + '-' + onlyNums.slice(7, 9)
        }
    }
    if (onlyNums.length <= 1) {
        return "+"+onlyNums
    }
    if (onlyNums.length <= 4) {
        return "+"+onlyNums.slice(0, 1) + ' (' + onlyNums.slice(1,4)
    }
    if (onlyNums.length <= 7) {
        return "+"+onlyNums.slice(0, 1) + ' (' + onlyNums.slice(1,4) + ') ' + onlyNums.slice(4, 7)
    }
    if (onlyNums.length <= 9) {
        return "+"+onlyNums.slice(0, 1) + ' (' + onlyNums.slice(1,4) + ') ' + onlyNums.slice(4, 7) + '-' + onlyNums.slice(7, 9)
    }

    return "+" + onlyNums.slice(0, 1) + ' (' + onlyNums.slice(1, 4) + ') ' + onlyNums.slice(4, 7) + '-' + onlyNums.slice(7, 9) + '-' + onlyNums.slice(9, 11)
}