// Import statements...
import React, { useState } from 'react';
import "../App.css"
import Tab from '../components/Tab'
import Loginform from '../components/Loginform'
import Signupform from '../components/Signupform'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import { db, auth} from '../Firebase';
import { collection, doc, setDoc } from 'firebase/firestore'

function Login() {
  const tabNames =["Login" , "Signup"]
  const [activeTab, setActiveTab] = useState("Login");

  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login')

  const [userCredentials, setUserCredentials] = useState({})
  const navigate = useNavigate();

  const space = 'space-x-10'

  const handleSocial = async (authProvider) => {
    try {
      const result = await signInWithPopup(auth, authProvider);
      const user = result.user;

      // Check if the user is already registered
      const userDoc = await doc(db, 'users', user.uid).get();
      
      if (!userDoc.exists()) {
        // If not, add user to the 'users' collection
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
        });
      }

      // Navigate to the desired page (change "/a" to your desired route)
      navigate("/a");
    } catch (error) {
      console.error('Social Sign-In Error:', error);
    }
  };

  function handleCredentials(e) {
    setUserCredentials({...userCredentials, [e.target.name] : e.target.value});
    console.log(userCredentials);
  } 

  function handleSignUp(e){ 
    e.preventDefault();

    if (userCredentials.password !== userCredentials.confirmPassword) {
      alert("Password does not match");
      return;
    }

    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        navigate("/a");
      })
      .catch((error) => {
        if (error.code === "auth/weak-password") {
          alert("Password should be at least 8 characters long");
        } else if (error.code === "auth/email-already-in-use") {
          alert("Email already taken, please use a different email or login");
        } else if( error.code === "auth/invalid-email") {
          alert("Invalid email address, please try again.")
        }
        else {
          alert(error.message);
        }
      });
  }

  function handleLogIn(e){
    e.preventDefault();
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/a");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          alert("Invalid email, please try again!");
        } else if (error.code === "auth/wrong-password") {
          alert("Wrong password, please try again!");
        } 
        else {
          alert(error.message);
        }
      });
  }

  return (
    <div className="flex w-full h-full">
      <div className='w-1/2 h-[700px] mt-1 flex flex-col justify-center items-center'>
        <div className='text-white text-lg flex flex-col justify-center items-center'>
          <Tab tabNames={tabNames} activeTab={activeTab} setActiveTab={setActiveTab} space={space}></Tab>
          {activeTab === "Login" && <Loginform handleCredentials={handleCredentials} handleLogIn={handleLogIn} handleSocial={handleSocial}/>}
          {activeTab === "Signup" && <Signupform handleCredentials={handleCredentials} handleSignUp={handleSignUp}/>}
        </div>
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img src="src\assets\CHECK-removebg-preview.png" alt="Your Image" className="w-1/2 h-auto" />
    </div>
    
    </div>
  );
}

export default Login;
