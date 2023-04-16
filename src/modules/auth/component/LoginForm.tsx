import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validLogin, validateLogin } from '../utils';
import { Button, message, Space } from 'antd';

interface Props {
  onLogin(values: ILoginParams): void;
}

const LoginForm = (props: Props) => {

  const { onLogin } = props

  const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
  const [validate, setValidate] = React.useState<ILoginValidation>();

  const { handleSubmit, formState: { errors } } = useForm<ILoginParams>();

  const [messageApi, contextHolder] = message.useMessage()
  const error = (error: string) => {
    message.open({
      type: 'error',
      content: error,
    });
  };
  const onSubmit: SubmitHandler<ILoginParams> = () => {
    const validate = validateLogin(formValues);

    setValidate(validate);

    console.log(validate);

    if (validate.email || validate.password) {
      error(validate.email + '\n ,' + validate.password)
    }

    onLogin(formValues);
    if (!validLogin(validate)) {
      return;
    }
  }

  return (
    <form
      style={{ maxWidth: '560px', width: '100%' }}
      className="row g-3 needs-validation"
      onSubmit={
        handleSubmit(onSubmit)
      }>
      {/* register your input into the hook by invoking the "register" function */}
      <div className="col-md-12">
        <div>
          <label htmlFor="inputEmail" className="form-label">
            User Name:
          </label>
        </div>
        <input
          className="form-control"
          value={formValues.email}
          onChange={(e) => { setFormValues({ ...formValues, email: e.target.value }) }}
        />
      </div>
      <div className="col-md-12">
        <div>
          <label htmlFor="inputPassword" className="form-label">
            Password
          </label>
        </div>
        <input
          type='password'
          className="form-control"
          value={formValues.password}
          onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
        />
      </div>



      <div className="col-12">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="invalidCheck"
            value=""
            checked={formValues.rememberMe}
            onChange={(e) => setFormValues({ ...formValues, rememberMe: !!e.target.checked })}
          />
          <div>
            <label className="form-check-label" htmlFor="invalidCheck">
              Remember Me
            </label>
          </div>
        </div>
      </div>





      <button
        className="btn btn-primary"
        type="submit"
        style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Login
      </button>
    </form>
  )
}

export default LoginForm