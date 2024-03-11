import React, { useState, useEffect } from 'react';
import Tab from '../components/Tab';
import Loginform from '../components/Loginform';
import Signupform from '../components/Signupform';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../Firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation-1710175289637.json';

function Login() {
  const tabNames = ["Login", "Signup"];
  const [activeTab, setActiveTab] = useState("Login");
  const [userCredentials, setUserCredentials] = useState({});
  const navigate = useNavigate();

  const space = 'space-x-10';

  const handleSocial = async (authProvider) => {
    // ... (unchanged)
  };

  const handleCredentials = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSignUp = (e) => {
    // ... (unchanged)
  };

  const handleLogIn = (e) => {
    // ... (unchanged)
  };

  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 h-[700px] mt-1 flex flex-col justify-center items-center">
        <div className="text-white text-lg flex flex-col justify-center items-center">
          <Tab tabNames={tabNames} activeTab={activeTab} setActiveTab={setActiveTab} space={space} />
          {activeTab === "Login" && <Loginform handleCredentials={handleCredentials} handleLogIn={handleLogIn} handleSocial={handleSocial} />}
          {activeTab === "Signup" && <Signupform handleCredentials={handleCredentials} handleSignUp={handleSignUp} />}
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Lottie animationData={animationData} autoplay={true} />
        </div>
      </div>
    </div>
  );
}

export default Login;
