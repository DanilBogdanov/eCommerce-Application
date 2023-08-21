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
import { MessageType, notifier } from '../../../utils/notifier';
import {
  MESSAGE_SHOW_TIME_ERROR,
  MESSAGE_SHOW_TIME_SUCCESS,
} from '../../../types/constants';

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
      notifier.showMessage(
        MessageType.SUCCESS,
        'Registration',
        `User ${registerForm.email} successfully logged up`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      navigate('/');
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Registration',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const onSubmit = methods.handleSubmit(() => {
    const values = methods.getValues();
    const { email, password } = values;

    //
    const {
      defaultBilling,
      streetBilling,
      cityBilling,
      countryBilling,
      postcodeBilling,
      defaultShipping,
      streetShipping,
      cityShipping,
      countryShipping,
      postcodeShipping,
    } = values;

    const BillingObj = {
      key: 'billing',
      streetName: streetBilling,
      postalCode: postcodeBilling,
      city: cityBilling,
      country: countryBilling,
    };

    const ShippingObj = {
      key: 'shipping',
      streetName: streetShipping,
      postalCode: postcodeShipping,
      city: cityShipping,
      country: countryShipping,
    };

    const defaultBillingObj = {
      key: 'defaultBilling',
      streetName: streetBilling,
      postalCode: postcodeBilling,
      city: cityBilling,
      country: countryBilling,
    };

    const defaultShippingObj = {
      key: 'defaultShipping',
      streetName: streetShipping,
      postalCode: postcodeShipping,
      city: cityShipping,
      country: countryShipping,
    };

    const addressArr = [];
    addressArr.push(BillingObj, ShippingObj);
    if (defaultBilling) {
      addressArr.push(defaultBillingObj);
    }
    if (defaultShipping) {
      addressArr.push(defaultShippingObj);
    }

    const registerForm: RegisterForm = {
      email,
      password,
      addresses: addressArr,
      // add rest fields
      // address ID fields add in loop lower
    };

    for (let i = 0; i < registerForm.addresses!.length; i += 1) {
      const element = registerForm?.addresses[i];
      if (element.key === 'defaultBilling') {
        registerForm.defaultBillingAddress = i;
      } else if (element.key === 'defaultShipping') {
        registerForm.defaultShippingAddress = i;
      } else if (element.key === 'billing') {
        registerForm.billingAddresses = [i];
      } else if (element.key === 'shipping') {
        registerForm.shippingAddresses = [i];
      }
      delete element.key;
    }

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
