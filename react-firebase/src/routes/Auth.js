import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const auth = getAuth();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password'){
      setPassword(value);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (newAccount) {
      // 회원가입
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });
    } else {
      // 로그인
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });
    }
  }
  const toggleAccount = () => setNewAccount(prev => !prev);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name='email' type='email' placeholder='Email' required value={email} onChange={onChange}></input>
        <input name='password' type='password' placeholder='password' required value={password} onChange={onChange}></input>
        <button>{newAccount ? "Create Account" : "Login"}</button>
        {error}
      </form>
      <div onClick={toggleAccount}>{newAccount ? "Login" : "Create Account"}</div>
    </div>
  )
}
export default Auth;