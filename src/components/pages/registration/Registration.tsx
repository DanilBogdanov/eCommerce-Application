/* eslint-disable react/jsx-props-no-spreading */

import { ReactElement, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { GrMail } from 'react-icons/gr';
import { BsFillCheckSquareFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import {
  emailElementParams,
  passwordElementParams,
  nameElementParams,
  surnameElementParams,
  birthdateElementParams,
  streetBillingElementParams,
  cityBillingElementParams,
  countryBillingElementParams,
  postcodeBillingElementParams,
  streetShippingElementParams,
  cityShippingElementParams,
  countryShippingElementParams,
  postcodeShippingElementParams,
  sameAddressCheckboxParams,
  defaultBillingCheckboxParams,
  defaultShippingCheckboxParams,
  sameAddressLabelParams,
  defaultBillingLabelParams,
  defaultShippingLabelParams,
} from '../../../utils/forms/inputElements';
import { InputForm } from '../../../utils/forms/InputForm-component';
import Api from '../../../api/api';
import { RegisterForm } from '../../../types/api';

type RegistrationProps = {
  api: Api;
};

function Registration({ api }: RegistrationProps): ReactElement {
  const methods = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const logup = async (registerForm: RegisterForm) => {
    const resp = await api.auth.registerAndLogin(registerForm);
    if (resp.result) {
      navigate('/');
    } else {
      // handle error
    }
  };

  const onSubmit = methods.handleSubmit((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
    const values = methods.getValues();
    const { email, password } = values;
    const registerForm: RegisterForm = {
      email,
      password,
      // add rest fields
    };
    logup(registerForm);
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
          <InputForm className='' {...emailElementParams} />
          <InputForm
            className=''
            {...passwordElementParams}
            type={passwordShown ? 'text' : 'password'}
          />
          <button type='button' onClick={togglePassword}>
            Show Password
          </button>
          <InputForm className='' {...nameElementParams} />
          <InputForm className='' {...surnameElementParams} />
          <InputForm className='' {...birthdateElementParams} />
          <p>Billing Address</p>
          <InputForm checkbox className='' {...defaultBillingCheckboxParams} />
          <InputForm labelCheck className='' {...defaultBillingLabelParams} />
          <InputForm address className='' {...streetBillingElementParams} />
          <InputForm address className='' {...cityBillingElementParams} />
          <InputForm select className='' {...countryBillingElementParams} />
          <InputForm address className='' {...postcodeBillingElementParams} />
          <p>Shipping Address</p>
          <InputForm checkbox className='' {...sameAddressCheckboxParams} />
          <InputForm labelCheck className='' {...sameAddressLabelParams} />
          <InputForm checkbox className='' {...defaultShippingCheckboxParams} />
          <InputForm labelCheck className='' {...defaultShippingLabelParams} />
          <InputForm address className='' {...streetShippingElementParams} />
          <InputForm address className='' {...cityShippingElementParams} />
          <InputForm select className='' {...countryShippingElementParams} />
          <InputForm address className='' {...postcodeShippingElementParams} />
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
            Sign Up
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default Registration;
