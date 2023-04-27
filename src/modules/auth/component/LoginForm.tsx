import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validLogin, validateLogin } from '../utils';
import {  message } from 'antd';
import { useTranslation} from 'react-i18next';
import { FormattedMessage } from 'react-intl';

interface Props {
  onLogin(values: ILoginParams): void;
}

const LoginForm = (props: Props) => {
  const { t } = useTranslation()

  const { onLogin } = props

  const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
  const [validate, setValidate] = React.useState<ILoginValidation>();

  const { handleSubmit, formState: { errors } } = useForm<ILoginParams>();

  const onSubmit: SubmitHandler<ILoginParams> = () => {
    const validate = validateLogin(formValues);

    setValidate(validate);

    if (!validLogin(validate)) {
      return;
    }
    
    onLogin(formValues);
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
            {t('email')}
          </label>
        </div>
        <input
          className="form-control"
          value={formValues.email}
          onChange={(e) => { setFormValues({ ...formValues, email: e.target.value }) }}
        />
        {!!validate?.email && (
          <small className="text-danger">
            {validate?.email}
          </small>
        )}
      </div>
      <div className="col-md-12">
        <div>
          <label htmlFor="inputPassword" className="form-label">
            {t('password')}
          </label>
        </div>
        <input
          type='password'
          className="form-control"
          value={formValues.password}
          onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
        />
        {!!validate?.password && (
          <small className="text-danger">
            {validate?.password}
          </small>
        )}
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
              {t('rememberMe')}
            </label>
          </div>
        </div>
      </div>





      <button
        className="btn btn-primary"
        type="submit"
        style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {t('login')}
      </button>
    </form>
  )
}

export default LoginForm