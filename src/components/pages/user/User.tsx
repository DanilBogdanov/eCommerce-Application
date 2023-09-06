/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */

import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Profile, UserAddress, Address } from '../../../types/api';

// import Table from '../../../utils/table/Table';

import { MessageType, notifier } from '../../../utils/notifier';
import {
  MESSAGE_SHOW_TIME_ERROR,
  MESSAGE_SHOW_TIME_SUCCESS,
} from '../../../types/constants';
import { api } from '../../../api/api';

import {
  getChangeEmailRequestLine,
  getSetFirstNameRequestLine,
  getSetLastNameRequestLine,
  getAddAddressRequestLine,
  getSetDateOfBirthRequestLine,
  getRemoveAddressRequestLine,
  getSetDefaultShippingAddressRequestLine,
  getAddShippingAddressIdRequestLine,
  getRemoveShippingAddressIdRequestLine,
  getSetDefaultBillingAddressRequestLine,
  getAddBillingAddressIdRequestLine,
  getRemoveBillingAddressIdRequestLine,
} from './getRequestLine';

import {
  currentPasswordElementParams,
  newPasswordElementParams,
  emailElementParams,
  nameElementParams,
  surnameElementParams,
  birthdateElementParams,
  addressElementParams,
  cityElementParams,
  countryElementParams,
  postcodeElementParams,
} from '../../../utils/forms/inputElements';
import { InputForm } from '../../../utils/forms/InputForm-component';
import '../../../utils/forms/FormsStyle.css';
import './User.css';

function User(): ReactElement {
  const methodsName = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const methodsPassword = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const methodsSurname = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const methodsBirthdate = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const methodsEmail = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });
  const methodsAddress = useForm({
    shouldFocusError: false,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });

  const [dataProfile, setDataProfile] = useState<Profile>();
  const [dataAddresses, setDataAddresses] = useState<Array<UserAddress>>();
  let dataAddressesLabel;
  let dataShippingAddress;
  let dataBillingAddress;
  let dataDefaultShippingAddress;
  let dataDefaultBillingAddress;
  const [dataLabels, setDataLabels] = useState<Array<string[]>>([]);

  const [passwordShown, setPasswordShown] = useState(false);

  const [visibleUserData, setVisibleUserData] = useState(false);
  const onClickEditUserData = () => {
    setVisibleUserData(!visibleUserData);
  };

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
        dataShippingAddress = data.shippingAddressIds;
        dataBillingAddress = data.billingAddressIds;
        dataDefaultShippingAddress = data.defaultShippingAddressId;
        dataDefaultBillingAddress = data.defaultBillingAddressId;
        setDataLabels(dataLabels);
        dataLabels.length = 0;
        dataAddressesLabel = data.addresses;
        if (dataAddressesLabel) {
          for (let i = 0; i < dataAddressesLabel.length; i++) {
            const el: string = dataAddressesLabel[i].id;

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

  const updatePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    const resp = await api.user.changePassword(currentPassword, newPassword);
    if (resp.isSuccessful) {
      if (dataProfile) {
        api.auth.login(dataProfile.email, newPassword);
      }
      notifier.showMessage(
        MessageType.SUCCESS,
        'Changing password',
        `Password successfully changed`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Changing password',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const onSubmitChangePassword = methodsPassword.handleSubmit(() => {
    const values = methodsPassword.getValues();
    const { currentPassword, newPassword } = values;

    updatePassword(currentPassword, newPassword);
    methodsPassword.reset();
  });

  const updateName = async (name: string) => {
    const resp = await api.user.updateProfile([
      getSetFirstNameRequestLine(name),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Hello, ${resp.data?.firstName}`,
        `Name successfully changed`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Changing Name',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const onSubmitChangeName = methodsName.handleSubmit(() => {
    const values = methodsName.getValues();
    const { name } = values;
    updateName(name);
    methodsName.reset();
  });

  const updateSurname = async (surnam: string) => {
    const resp = await api.user.updateProfile([
      getSetLastNameRequestLine(surnam),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Changing Surname`,
        `Name successfully changed`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Changing Surname',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const onSubmitChangeSurname = methodsSurname.handleSubmit(() => {
    const values = methodsSurname.getValues();
    const { surnam } = values;
    updateSurname(surnam);
    methodsSurname.reset();
  });

  const updateBirthdate = async (dateOfBirth: Date) => {
    const resp = await api.user.updateProfile([
      getSetDateOfBirthRequestLine(dateOfBirth),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Everyday ia a Birthday`,
        `Bithdate successfully changed`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Changing Birthday',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const onSubmitChangeBirthdate = methodsBirthdate.handleSubmit(() => {
    const values = methodsBirthdate.getValues();
    const { dateOfBirth } = values;
    updateBirthdate(dateOfBirth);
    methodsBirthdate.reset();
  });

  const updateEmail = async (email: string) => {
    const resp = await api.user.updateProfile([
      getChangeEmailRequestLine(email),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Changing Email`,
        `Email successfully changed`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Changing Email',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const onSubmitChangeEmail = methodsEmail.handleSubmit(() => {
    const values = methodsEmail.getValues();
    const { email } = values;
    updateEmail(email);
    methodsEmail.reset();
  });

  const addAddress = async (address: Address) => {
    const resp = await api.user.updateProfile([
      getAddAddressRequestLine(address),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Success!`,
        `Address added`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Adding Address',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const onSubmitAddAddress = methodsAddress.handleSubmit(() => {
    const values = methodsAddress.getValues();
    const { street, city, country, postcode } = values;
    const AddressObj: Address = {
      streetName: street,
      postalCode: postcode,
      city,
      country,
    };

    addAddress(AddressObj);
    methodsAddress.reset();
  });

  const deleteAddress = async (id: string) => {
    const resp = await api.user.updateProfile([
      getRemoveAddressRequestLine(id),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Success!`,
        `Address was successfully deleted`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Deleting Address',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const setDefaultShippingAddress = async (id: string) => {
    const resp = await api.user.updateProfile([
      getSetDefaultShippingAddressRequestLine(id),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Address chanching`,
        `Address is set as Default Shipping`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Changing Address',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const setDefaultBillingAddress = async (id: string) => {
    const resp = await api.user.updateProfile([
      getSetDefaultBillingAddressRequestLine(id),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Address chanching`,
        `Address is set as Default Billing`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Changing Address',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const setBillingAddress = async (id: string) => {
    const resp = await api.user.updateProfile([
      getAddBillingAddressIdRequestLine(id),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Address chanching`,
        `Address is set as Billing`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Changing Address',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const setShippingAddress = async (id: string) => {
    const resp = await api.user.updateProfile([
      getAddShippingAddressIdRequestLine(id),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Address chanching`,
        `Address is set as Shipping`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Changing Address',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const unsetBillingAddress = async (id: string) => {
    const resp = await api.user.updateProfile([
      getRemoveBillingAddressIdRequestLine(id),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Address chanching`,
        `Address is unset as Default Shipping`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'You have no active label to unset it!',
        'Label your address first',
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  const unsetShippingAddress = async (id: string) => {
    const resp = await api.user.updateProfile([
      getRemoveShippingAddressIdRequestLine(id),
    ]);
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.SUCCESS,
        `Address changing`,
        `Address is unset as Default Shipping`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      fetchData();
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'You have no active label to unset it!',
        'Label your address first',
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  return (
    <div className='UserProfileWrapper'>
      <h1 className='FormHeader UserFormHeader'>Profile Settings</h1>
      <div className=' UserSection'>
        <hr />
        <div className='SectionHeaderWrapper'>
          <h2 className='SectionHeader UserDataHeader'>User info</h2>
          <button
            type='button'
            onClick={onClickEditUserData}
            className='FormButton SubmitButton'
          >
            {visibleUserData ? 'Exit edit mode' : 'Edit'}
          </button>
        </div>
        <FormProvider {...methodsName}>
          <form className='UserSectionElement'>
            <div className='TitleSection'>
              <p className='UserSectionTitle'>Name:</p>
              <p className='UserSectionTitle UserSectionValue'>
                <b>{dataProfile?.firstName}</b>
              </p>
            </div>
            {visibleUserData && (
              <div className='ChangeWrapper'>
                <InputForm
                  {...nameElementParams}
                  placeholder='type new name'
                  id='userName'
                  label=''
                  className='InputForm UserInputForm'
                />
                <button
                  type='button'
                  onClick={onSubmitChangeName}
                  className='FormButton SubmitButton'
                >
                  Update Name
                </button>
              </div>
            )}
          </form>
        </FormProvider>

        <FormProvider {...methodsSurname}>
          <form className='UserSectionElement'>
            <div className='TitleSection'>
              <p className='UserSectionTitle'>Surname:</p>
              <p className='UserSectionTitle UserSectionValue'>
                <b>{dataProfile?.lastName}</b>
              </p>
            </div>
            {visibleUserData && (
              <div className='ChangeWrapper'>
                <InputForm
                  {...surnameElementParams}
                  placeholder='type new surname'
                  id='userSurname'
                  label=''
                  className='InputForm UserInputForm'
                />
                <button
                  type='button'
                  onClick={onSubmitChangeSurname}
                  className='FormButton SubmitButton'
                >
                  Update Surname
                </button>
              </div>
            )}
          </form>
        </FormProvider>

        <FormProvider {...methodsBirthdate}>
          <form className='UserSectionElement'>
            <div className='TitleSection'>
              <p className='UserSectionTitle'>Date of birth:</p>
              <p className='UserSectionTitle UserSectionValue'>
                <b>{dataProfile?.dateOfBirth}</b>
              </p>
            </div>
            {visibleUserData && (
              <div className='ChangeWrapper'>
                <InputForm
                  {...birthdateElementParams}
                  id='userBirth'
                  label=''
                  className='InputForm UserInputForm'
                />
                <button
                  type='button'
                  onClick={onSubmitChangeBirthdate}
                  className='FormButton SubmitButton'
                >
                  Update Date of birth
                </button>
              </div>
            )}
          </form>
        </FormProvider>

        <FormProvider {...methodsEmail}>
          <form className='UserSectionElement'>
            <div className='TitleSection'>
              <p className='UserSectionTitle'>Email:</p>
              <p className='UserSectionTitle UserSectionValue'>
                <b>{dataProfile?.email as ReactNode}</b>
              </p>
            </div>
            {visibleUserData && (
              <div className='ChangeWrapper'>
                <InputForm
                  {...emailElementParams}
                  placeholder='type new email'
                  id='userEmail'
                  label=''
                  className='InputForm UserInputForm'
                />
                <button
                  type='button'
                  onClick={onSubmitChangeEmail}
                  className='FormButton SubmitButton'
                >
                  Update Email
                </button>
              </div>
            )}
          </form>
        </FormProvider>
      </div>
      <div className=' UserSection'>
        <hr />
        <h2 className='SectionHeader'>Update password</h2>
        <FormProvider {...methodsPassword}>
          <form>
            <InputForm
              {...currentPasswordElementParams}
              type={passwordShown ? 'text' : 'password'}
              className='InputForm PasswordInputForm'
            />
            <InputForm
              {...newPasswordElementParams}
              type={passwordShown ? 'text' : 'password'}
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
              onClick={onSubmitChangePassword}
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
              <th className='AddressTableHeader'>Settings</th>
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
                    <button
                      type='button'
                      className='FormButton SetButton'
                      onClick={() => setDefaultShippingAddress(dataAddress?.id)}
                    >
                      Add Default Shipping
                    </button>
                    <button
                      type='button'
                      className='FormButton SetButton'
                      onClick={() => setDefaultBillingAddress(dataAddress?.id)}
                    >
                      Add Default Billing
                    </button>
                    <button
                      type='button'
                      className='FormButton SetButton'
                      onClick={() => setShippingAddress(dataAddress?.id)}
                    >
                      Add Shipping
                    </button>
                    <button
                      type='button'
                      className='FormButton SetButton'
                      onClick={() => setBillingAddress(dataAddress?.id)}
                    >
                      Add Billing
                    </button>

                    <button
                      type='button'
                      className='FormButton UnsetButton'
                      onClick={() => unsetShippingAddress(dataAddress?.id)}
                    >
                      Remove Shipping
                    </button>

                    <button
                      type='button'
                      className='FormButton UnsetButton'
                      onClick={() => unsetBillingAddress(dataAddress?.id)}
                    >
                      Remove Billing
                    </button>
                    <button
                      type='button'
                      onClick={() => deleteAddress(dataAddress?.id)}
                      className='FormButton DeleteButton'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <hr />
        <FormProvider {...methodsAddress}>
          <form>
            <div className='FormSection UserSectionAddress'>
              <h2 className='AddressHeader SectionHeader'>Add new address</h2>
              <button
                type='button'
                onClick={onSubmitAddAddress}
                className='FormButton SubmitButton SubmitButtonAddress'
              >
                Add address
              </button>
              <InputForm address {...addressElementParams} />
              <InputForm address {...cityElementParams} />
              <InputForm select {...countryElementParams} />
              <InputForm address {...postcodeElementParams} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default User;
