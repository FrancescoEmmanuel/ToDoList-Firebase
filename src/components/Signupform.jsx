import React from 'react'

function Signupform({handleCredentials, handleSignUp}) {
    return (
        <div className="p-8 rounded w-[600px]">
            <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium 0">
              Name
            </label>
            <input type="text"  name="name" className="login-input" onChange={(e) =>{handleCredentials(e)}}/>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input type="email" name="email" className="login-input" onChange={(e) =>{handleCredentials(e)}}/>
          </div>
    
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium 0">
              Password
            </label>
            <input type="password"  name="password" className="login-input" onChange={(e) =>{handleCredentials(e)}}/>
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-sm font-medium 0">
              Confirm password
            </label>
            <input type="password"  name="confirmPassword" className="login-input" onChange={(e) => { handleCredentials(e) }} />
          </div>


    
          <div className="flex flex-col justify-end items-end">
            <button onClick = {(e) => {handleSignUp(e)}} className="bg-blue-700 shadow-lg text-white text-base py-1 px-4 rounded-3xl hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
              Create account
            </button>
          </div>
    
          <div className="flex items-center mt-4">
            <hr className="flex-grow border-t" />
            <span className="mx-2 text-sm">or continue with</span>
            <hr className="flex-grow border-t" />
          </div>
    
          <div className="flex flex-col items-center mt-4">
            <div className='flex flex-row'>
                <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Icon" className="w-6 h-6" />
                </div>
    
                <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center mr-4 shadow-md">
                <img src="src\assets\icons8-github-50.png" alt="Github Icon" className="w-6 h-6" />
                </div>
            </div>
            
          </div>
    
          
        </div>
      );
}

export default Signupform