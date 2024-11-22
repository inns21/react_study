import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const onLogoutCLick =()=>{
        signOut(auth).then(() => {
            alert('로그아웃!')
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    }
    return(
        <button onClick={onLogoutCLick}>Logout</button>
    )
}

export default Profile;