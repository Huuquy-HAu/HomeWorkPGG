import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { ILocationParams, ISignUpParams } from '../../../models/auth';
import axios from 'axios';
import { API_PATHS } from '../../../configs/api';
import { notification } from 'antd';
import { useTranslation} from 'react-i18next';


interface Props {
    location: Array<ILocationParams>,
    onSignUp(values:ISignUpParams):void
}

const SignUpForm = (props: Props) => {
    const { location, onSignUp } = props
    const [formValues, setFormValues] = React.useState<ISignUpParams>({ email: '', password: '', repeatPassword: '', name: '', gender: '', region: '', state: "" });
    const { handleSubmit, register , formState: { errors } } = useForm<ISignUpParams>();
    const [region, setRegion] = useState<string | null>(null)
    const [pid, setPid] = useState<Array<any>>([])
    const { t } = useTranslation()

    const getRegion = async () => {
        const res = await axios.get(API_PATHS.getLocation + `?pid=${region}`)
        setPid([...res.data.data])
    }

    const errorToastAntd = (message:string) => {
        notification.error({
            message:"Error",
            description:message
        })
    }

    const onSubmitt:SubmitHandler<ISignUpParams> = () => {
        if(!formValues.email || !formValues.gender || !formValues.name || !formValues.password || !formValues.region || !formValues.repeatPassword || !formValues.state){
            return errorToastAntd("Không được bỏ trống thông tin")
        }

        if(formValues.password === formValues.repeatPassword){
            onSignUp(formValues);
        }else{
            return errorToastAntd("PassWord and Repeat Password not same")
        }

    } 

    useEffect(() => {
        getRegion()
    }, [region])

    return (
        <form
            style={{ maxWidth: '560px', width: '100%' }}
            className="row g-3 needs-validation"
            onSubmit={
                handleSubmit(onSubmitt)
            }
        >
            <div className="col-md-12 text-center h1">
                {t('signUpForm')}
            </div>

            <div className="col-md-12">
                <div>
                    <label htmlFor="inputEmail" className="form-label">
                        {t('email')}
                    </label>
                </div>
                <input
                    className="form-control"
                    value={formValues.email}
                    {...register("email", { required :true})}
                    onChange={(e) => { setFormValues({ ...formValues, email: e.target.value }) }}
                />
            </div>
            <div className="col-md-12">
                <div>
                    <label htmlFor="inputEmail" className="form-label">
                        {t('password')}
                    </label>
                </div>
                <input
                    className="form-control"
                    value={formValues.password}
                    onChange={(e) => { setFormValues({ ...formValues, password: e.target.value }) }}
                />
            </div>

            <div className="col-md-12">
                <div>
                    <label htmlFor="inputEmail" className="form-label">
                        {t('repeatPassword')}
                    </label>
                </div>
                <input
                    className="form-control"
                    value={formValues.repeatPassword}
                    onChange={(e) => { setFormValues({ ...formValues, repeatPassword: e.target.value }) }}
                />
            </div>

            <div className="col-md-12">
                <div>
                    <label htmlFor="inputEmail" className="form-label">
                        {t('fullName')}
                    </label>
                </div>
                <input
                    className="form-control"
                    value={formValues.name}
                    onChange={(e) => { setFormValues({ ...formValues, name: e.target.value }) }}
                />
            </div>

            <div className="col-md-12">
                <div>
                    <label htmlFor="inputEmail" className="form-label">
                        {t('gender')}
                    </label>
                </div>
                <select
                    name=""
                    className='form-control'
                    onChange={(e) => { setFormValues({ ...formValues, gender: e.target.value }) }}
                >
                    <option selected disabled={true}>--select an option--</option>
                    <option value="male">
                        {t('male')}
                    </option>
                    <option value="female">
                        {t('female')}
                    </option>
                </select>
            </div>

            <div className="col-md-12">
                <div>
                    <label htmlFor="inputEmail" className="form-label">
                        {t('region')}
                    </label>
                </div>
                <select
                    name=""
                    id=""
                    className='form-control'
                    onChange={(e) => {
                        console.log(e.target.value);
                        if (e.target.value) {
                            setFormValues({ ...formValues, region: e.target.value })
                            setRegion(e.target.value)
                        }
                    }}
                >
                    <option selected disabled={true}>--select an option--</option>
                    {location.map((value, index) => {
                        return (
                            <option value={value.id} key={index}>
                                {value.name}
                            </option>
                        )
                    })}

                </select>
            </div>

            {

                formValues?.region ?
                    <div className="col-md-12">
                        <div>
                            <label htmlFor="inputEmail" className="form-label">
                                {t('state')}
                            </label>
                        </div>
                        <select
                            name=""
                            id=""
                            className='form-control'
                            onChange={(e) => { setFormValues({ ...formValues, state: e.target.value }) }}
                        >
                            <option selected disabled={true}>--select an option--</option>
                            {pid?.map((value, index) => {
                                return (
                                    <option value={value.id} key={index}>
                                        {value.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    : null
            }

            <button
                className="btn btn-primary"
                type="submit"
                style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                {t('register')}
            </button>

        </form>

    )
}

export default SignUpForm