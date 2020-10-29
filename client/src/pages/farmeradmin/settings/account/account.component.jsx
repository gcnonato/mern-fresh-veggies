import React, { useState, useRef, useEffect } from 'react';
import './account.component.styles.scss';
import axios from 'axios';

import CustomButton from 'components/UI/custom-button/custom-button.component';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import Modal from 'components/modal/modal.component';

const AccountSetting = ({ user }) => {
  /* Modal State */
  const [modalStatus, setIsOpen] = useState(false);

  /* Toggle Modal function */
  const toggleModal = () => {
    setIsOpen(!modalStatus);
  };

  const email = useRef(null);
  const password = useRef(null);
  const newPassword = useRef(null);
  const repeatNewPassword = useRef(null);

  const handleEmail = (event) => {
    event.preventDefault();

    const data = {
      email: email.current.value,
      currentPassword: password.current.value,
    };

    axios
      .patch('/account/email', data)
      .then((res) => {
        console.log(res);
        // if the password was changed with sucess clear the fields
        toggleModal();
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert('etwas ist schief gelaufen');
      });
  };

  const handlePassword = (event) => {
    event.preventDefault();
    if (newPassword.current.value !== repeatNewPassword.current.value) return console.log('Passwords does not match');

    const data = {
      currentPassword: password.current.value,
      password: newPassword.current.value,
      repeatPassword: newPassword.current.value,
    };

    axios
      .patch('/account/password', data)
      .then((res) => {
        console.log(res);

        // if the password was changed with sucess clear the fields
        password.current.value = '';
        newPassword.current.value = '';
        repeatNewPassword.current.value = '';
        alert('Password changed');
      })
      .catch((err) => {
        console.log(err.response.data.message);
        alert('etwas ist schief gelaufen');
      });
  };

  return (
    <div className="settings__page__item__wrapper">
      <div className="settings__page__item__wrapper__account">
        <h4>Account</h4>
        <p>Edit your account settings and change your password here.</p>
        <hr />

        <div className="settings__accounts__email">
          <h5>Email:</h5>

          <div className="settings__accounts__email__input">
            <div>{`Your email address is ${user.data.email}`}</div>
            <Icon icon={['far', 'edit']} onClick={toggleModal} />
          </div>
        </div>
        <hr />
        <h5>Password:</h5>

        <div className="settings__accounts__email">
          <form onSubmit={handlePassword}>
            <input
              type="password"
              ref={password}
              id="currentPassword"
              name="currentPassword"
              placeholder={`Enter Current Password`}
              required
            />
            <input
              type="password"
              ref={newPassword}
              id="newPassword"
              name="newPassword"
              placeholder={`Enter New Password`}
              required
            />
            <input
              type="password"
              ref={repeatNewPassword}
              id="rnewPassword"
              name="rnewPassword"
              placeholder={`Repeat New Password`}
              required
            />

            <hr />
            <div className="settings__accounts__button">
              <CustomButton type="submit" style={{ width: '15rem' }}>
                Save Password
              </CustomButton>
            </div>
          </form>
        </div>
      </div>

      <Modal
        handleEmail={handleEmail}
        modalStatus={modalStatus}
        closeModal={toggleModal}
        className={'modal__email'}
        overlayClassName={'overlay__email'}
      >
        <div className="a">
          <h3>Change Your Email</h3>
          <Icon icon={'times'} className="fa-times" onClick={toggleModal} />
        </div>
        <hr />
        <div className="b">
          <form onSubmit={handleEmail}>
            <input type="email" ref={email} id="email" name="email" placeholder={`${user.data.email}`} required />
            <input
              type="password"
              ref={password}
              id="rnewPassword"
              name="rnewPassword"
              placeholder={`Password`}
              required
            />
            <div className="c">
              <CustomButton type="submit" style={{ width: 'auto' }}>
                Save
              </CustomButton>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AccountSetting;