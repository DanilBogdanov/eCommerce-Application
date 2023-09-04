/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */

import { ReactElement, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Profile, UserAddress, DefaultAddress } from '../../../types/api';
import { api } from '../../../api/api';
import {
  emailElementParams,
  passwordElementParams,
  nameElementParams,
  surnameElementParams,
  birthdateElementParams,
  addressBillingElementParams,
  cityBillingElementParams,
  countryBillingElementParams,
  postcodeBillingElementParams,
  defaultBillingCheckboxParams,
  defaultShippingCheckboxParams,
  billingCheckboxParams,
  shippingCheckboxParams,
} from '../../../utils/forms/inputElements';
import { InputForm } from '../../../utils/forms/InputForm-component';
import '../../../utils/forms/FormsStyle.css';
import './User.css';

function User(): ReactElement {
  const methods = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const [dataProfile, setDataProfile] = useState<Profile>();
  const [dataAddresses, setDataAddresses] = useState<Array<UserAddress>>();
  const [dataShippingAddress, setDataShippingAddresses] = useState<string[]>();
  const [dataBillingAddress, setDataBillingAddresses] = useState<string[]>();
  const [dataDefaultShippingAddress, setDataDefaultShippingAddress] =
    useState<DefaultAddress>();
  const [dataDefaultBillingAddress, setDataDefaultBillingAddress] =
    useState<DefaultAddress>();
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [dataLabels, setDataLabels] = useState<Array<string[]>>([]);
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  async function fetchData() {
    await api.user
      .getProfile()
      .then((response) => {
        return response.data as Profile;
      })
      .then((data) => {
        setDataProfile(data);
        setDataAddresses(data.addresses);
        setDataShippingAddresses(data.shippingAddressIds);
        setDataBillingAddresses(data.billingAddressIds);
        setDataDefaultShippingAddress(data.defaultShippingAddressId);
        setDataDefaultBillingAddress(data.defaultBillingAddressId);

        dataLabels.length = 0;
        if (dataAddresses) {
          for (let i = 0; i < dataAddresses.length; i++) {
            const el: string = dataAddresses[i].id;

            const arr: string[] = [];
            if (dataShippingAddress && dataShippingAddress.includes(el)) {
              arr.push('Shipping/ ');
            }
            if (dataBillingAddress && dataBillingAddress.includes(el)) {
              arr.push('Billing/ ');
            }
            if (dataShippingAddress && el === dataDefaultShippingAddress) {
              arr.push('Default shipping/ ');
            }
            if (dataShippingAddress && el === dataDefaultBillingAddress) {
              arr.push('Default billing/ ');
            }
            dataLabels.push(arr);
          }
        }
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className='UserProfileWrapper'>
      <h1 className='FormHeader UserFormHeader'>Profile Settings</h1>
      <div className=' UserSection'>
        <hr />
        <h2 className='SectionHeader'>User info</h2>
        <FormProvider {...methods}>
          <form className='UserSectionElement'>
            <div className='TitleSection'>
              <p className='UserSectionTitle'>Name:</p>
              <p className='UserSectionTitle UserSectionValue'>
                <b>{dataProfile?.firstName}</b>
              </p>
            </div>
            <div className='ChangeWrapper'>
              <InputForm
                {...nameElementParams}
                placeholder={dataProfile?.firstName}
                label=''
                className='InputForm UserInputForm'
              />
              <button
                type='button'
                // onClick={onSubmitChangeName}
                className='FormButton SubmitButton'
              >
                Update Name
              </button>
            </div>
          </form>
        </FormProvider>

        <FormProvider {...methods}>
          <form className='UserSectionElement'>
            <div className='TitleSection'>
              <p className='UserSectionTitle'>Surname:</p>
              <p className='UserSectionTitle UserSectionValue'>
                <b>{dataProfile?.lastName}</b>
              </p>
            </div>
            <div className='ChangeWrapper'>
              <InputForm
                {...surnameElementParams}
                placeholder={dataProfile?.lastName}
                label=''
                className='InputForm UserInputForm'
              />
              <button
                type='button'
                // onClick={onSubmitChangeSurname}
                className='FormButton SubmitButton'
              >
                Update Surname
              </button>
            </div>
          </form>
        </FormProvider>

        <FormProvider {...methods}>
          <form className='UserSectionElement'>
            <div className='TitleSection'>
              <p className='UserSectionTitle'>Date of birth:</p>
              <p className='UserSectionTitle UserSectionValue'>
                <b>{dataProfile?.dateOfBirth}</b>
              </p>
            </div>
            <div className='ChangeWrapper'>
              <InputForm
                {...birthdateElementParams}
                placeholder={dataProfile?.dateOfBirth}
                label=''
                className='InputForm UserInputForm'
              />
              <button
                type='button'
                // onClick={onSubmitChangeBirthdate}
                className='FormButton SubmitButton'
              >
                Update Date of birth
              </button>
            </div>
          </form>
        </FormProvider>

        <FormProvider {...methods}>
          <form className='UserSectionElement'>
            <div className='TitleSection'>
              <p className='UserSectionTitle'>Email:</p>
              <p className='UserSectionTitle UserSectionValue'>
                <b>{dataProfile?.email}</b>
              </p>
            </div>
            <div className='ChangeWrapper'>
              <InputForm
                {...emailElementParams}
                placeholder={dataProfile?.email}
                label=''
                className='InputForm UserInputForm'
              />
              <button
                type='button'
                // onClick={onSubmitChangeEmail}
                className='FormButton SubmitButton'
              >
                Update Email
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
      <div className=' UserSection'>
        <hr />
        <h2 className='SectionHeader'>Update password</h2>
        <FormProvider {...methods}>
          <form>
            <InputForm
              {...passwordElementParams}
              type={passwordShown ? 'text' : 'password'}
              id='oldPassword'
              label='Current Password'
              className='InputForm PasswordInputForm'
            />
            <InputForm
              {...passwordElementParams}
              type={passwordShown ? 'text' : 'password'}
              id='newPassword'
              label='New Password'
              className='InputForm PasswordInputForm'
            />
            <button
              type='button'
              onClick={togglePassword}
              className='FormButton'
            >
              Show Passwords
            </button>
            <button
              type='button'
              // onClick={onSubmitChangePassword}
              className='FormButton SubmitButton'
            >
              Update Password
            </button>
          </form>
        </FormProvider>
      </div>
      <div className=' UserSection'>
        <hr />
        <h2 className='SectionHeader'>Addresses</h2>
        <table className='AddressTable'>
          <thead className='AddressTableHead'>
            <tr className='AddressTableRow'>
              <th className='AddressTableHeader'>Address</th>
              <th className='AddressTableHeader'>City</th>
              <th className='AddressTableHeader'>Country</th>
              <th className='AddressTableHeader'>Postcode</th>
              <th className='AddressTableHeader'>Labels</th>
              <th className='AddressTableHeader'>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataAddresses?.map((dataAddress: UserAddress, index: number) => {
              return (
                <tr key={index} className='AddressTableRow'>
                  <td className='AddressTableData'>
                    {dataAddress?.streetName}
                  </td>
                  <td className='AddressTableData'>{dataAddress?.city}</td>
                  <td className='AddressTableData'>{dataAddress?.country}</td>
                  <td className='AddressTableData'>
                    {dataAddress?.postalCode}
                  </td>
                  <td className='AddressTableData'>{dataLabels[index]}</td>
                  <td className='AddressTableData'>
                    <button className='FormButton UserFormButton' type='button'>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr />
        <FormProvider {...methods}>
          <form>
            <div className='FormSection UserSectionAddress'>
              <h2 className='AddressHeader SectionHeader'>Add new address</h2>
              <button
                type='button'
                // onClick={onSubmit}
                className='FormButton SubmitButton SubmitButtonAddress'
              >
                Add address
              </button>
              <InputForm checkbox {...billingCheckboxParams} />
              <InputForm checkbox {...defaultBillingCheckboxParams} />
              <InputForm checkbox {...shippingCheckboxParams} />
              <InputForm checkbox {...defaultShippingCheckboxParams} />
              <InputForm address {...addressBillingElementParams} />
              <InputForm address {...cityBillingElementParams} />
              <InputForm select {...countryBillingElementParams} />
              <InputForm address {...postcodeBillingElementParams} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default User;
