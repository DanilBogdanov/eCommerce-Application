/* eslint-disable react/jsx-props-no-spreading */

import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GrMail } from 'react-icons/gr';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
  emailElementParams,
  loginPasswordElementParams,
} from '../../../utils/forms/inputElements';
import { InputForm } from '../../../utils/forms/InputForm-component';
import Api from '../../../api/api';

type LoginProps = {
  api: Api;
};

function Login({ api }: LoginProps): ReactElement {
  const methods = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    const values = methods.getValues();
    const { email, password } = values;
    const resp = await api.auth.login(email, password);
    if (resp.result) {
      navigate('/');
    }
  };

  const onSubmit = methods.handleSubmit(() => {
    // data
    login();
    methods.reset();
    setSuccess(true);
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <FormProvider {...methods}>
      <form autoComplete='off' onSubmit={(e) => e.preventDefault()} noValidate>
        <div>
          <InputForm multiline={false} className='' {...emailElementParams} />
          <InputForm
            multiline={false}
            className=''
            {...loginPasswordElementParams}
            type={passwordShown ? 'text' : 'password'}
          />
          <button type='button' onClick={togglePassword}>
            Show Password
          </button>
        </div>
        <div>
          {success && (
            <p>
              <BsFillCheckSquareFill />
              Form has been submitted successfully
            </p>
          )}
          <button type='button' onClick={onSubmit}>
            <GrMail />
            Sign In
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Login;
