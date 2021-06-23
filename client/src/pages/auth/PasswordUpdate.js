import React, { useState, Fragment } from 'react';
import firebase from '../../firebase';
import { toast } from 'react-toastify';
import AuthForm from '../../components/forms/AuthForm';

const PasswordUpdate = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    //
  }
  return (
    <div className="container p-5" >
      { loading ? <h4 className="text-danger">Loading...</h4> : <h4>Password update</h4>}
      <AuthForm
        password={password}
        setPassword={setPassword}
        loading={loading}
        handleSubmit={handleSubmit}
        showPasswordInput="true"
        hideEmailInput="true"
      />
    </div>
  )
};

export default PasswordUpdate;
