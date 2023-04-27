import { ILoginParams, ILoginValidation, ISignUpParams } from "../../models/auth";
import { validEmailRegex } from "../../utils";

const validateEmail = (email: string) => {
    if (!email) {
        return 'Email Require';
    }

    if (!validEmailRegex.test(email)) {
        return 'Email Invalid';
    }

    return '';
};

const validatePassword = (password: string) => {
    if (!password) {
        return 'Password Require';
    }

    if (password.length < 4) {
        return 'Min Password Invalid';
    }

    return '';
};


const validateRePeatPassword = (RepeatPassword: string, password: string) => {
    if (!RepeatPassword) {
        return "Repeat Password Require";
    }

    if (RepeatPassword !== password) {
        return "Not same Password";
    }

    return '';
}

const validateFullname = (fullname: string) => {
    if (!fullname) {
        return "Full Name Require";
    }
    return "";
}


const validateGender = (gender: string) => {
    if (!gender) {
        return "Gender Require";
    }
    return "";
}


const validateRegion = (region: string) => {
    if (!region) {
        return "Region Require";
    }
    return "";
}


const validateState = (state: string) => {
    if (!state) {
        return "State Require";
    }
    return "";
}


export const validateLogin = (values: ILoginParams): ILoginValidation => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
    };
};

export const validLogin = (values: ILoginValidation) => {
    return !values.email && !values.password;
};

export const validateSignUp = (values: ISignUpParams): ISignUpParams => {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        repeatPassword: validateRePeatPassword(values.repeatPassword, values.password),
        name: validateFullname(values.name),
        gender: validateGender(values.gender),
        region: validateRegion(values.region),
        state: validateState(values.state)
    };
};



export const validSignUp = (values: ISignUpParams) => {
    return !values.email && !values.password && !values.repeatPassword
        && !values.name && !values.gender && !values.region && !values.state;
};