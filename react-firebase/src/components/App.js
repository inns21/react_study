import React, { useState } from "react";
import AppRouter from './Router';
import { authService } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

console.log(authService);

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUserObj(user.uid);
    } else {
      setIsLoggedIn(false);
    }
    setInit(true);
  });

  return (
    <>
      {
        init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}></AppRouter> : "회원 정보 확인 중..."
      }
    </>
  );
}

export default App;
