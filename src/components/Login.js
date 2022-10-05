import React from "react";
import firebase from "firebase";
import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

var uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: async (authResult) => {
      const userInfo = authResult.additionalUserInfo;
      if (userInfo.isNewUser && userInfo.providerId === "password") {
        try {
          await authResult.user.sendEmailVerification();
          console.log("check your email");
        } catch (e) {
          console.log("Unable to send email verification email");
        }
      }
      return false;
    },
  },
};

function Login(props) {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <div className=" min-h-screen bg-gray-50 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center" style={{fontFamily:'Garamond', fontSize:'45px' }}>
          WEIGHT TRACKER APP
        </div>
      </div>
      <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
        <div action="" className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-1">
              Email
            </label>
            <input
              type="email"
              autoFocus
              required
              className="w-full mb-2 p-2 border border-gray-300 rounded mt-1 "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="font-normal text-sm text-red-600">{emailError}</p>
            <label className="text-sm mb-1 font-bold text-gray-600 block">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="font-normal text-sm text-red-600">{passwordError}</p>
          </div>
          <div>
            {hasAccount ? (
              <>
                <button
                  onClick={handleLogin}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                >
                  Sign In
                </button>
                <p className="flex justify-between items-center  mt-2">
                  Don't have an account ?
                  <span
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => setHasAccount(!hasAccount)}
                  >
                    Sign Up
                  </span>
                </p>
              </>
            ) : (
              <>
                <button
                  onClick={handleSignup}
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                >
                  Sign Up
                </button>
                <p className="flex justify-between text-blue-500 items-center mt-2">
                  Have an account ?
                  <span
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                    onClick={() => setHasAccount(!hasAccount)}
                  >
                    Sign In
                  </span>
                </p>
              </>
            )}
          </div>
          <div className="mb-1 border border-t-1 border-gray-300"></div>

          <StyleFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
