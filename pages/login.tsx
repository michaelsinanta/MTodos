import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import styles from "@/styles/Home.module.css";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useRecoilState } from "recoil";
import { accessTokenState, userNameState } from "@/components/storage/storage";
import { useEffect } from "react";

export default function LoginPage() {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const provider = new GoogleAuthProvider();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (accessToken) {
      window.location.replace("/");
    }
  }, [accessToken]);

  const logIn = async () => {
    const result = await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // The signed-in user info.
        const user = result.user;
        setAccessToken(user['accessToken']);
        setUserName(user.displayName);
        window.location.replace("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <div className={styles.main}>
        {accessToken ? 
          <div/>
         : 
          <div className="flex justify-center flex-col items-center">
            <h1 className="text-xl font-bold">Ooops you're not login yet</h1>
            <img
              className="lg:w-[60%] md:w-[80%] w-[80%]"
              src="https://i.pinimg.com/originals/31/36/cd/3136cd447c99783f59cd1a4c7d9ca9c1.png"
              alt="not logged in"
            />
            <button
              onClick={logIn}
              className="flex items-center shadow-md space-x-2 bg-indigo-500 text-gray-100 p-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <AiFillGoogleCircle
                size={30}
                color={"white"}
              ></AiFillGoogleCircle>
              <div className="text-lg">Login with Google</div>
            </button>
          </div>
        }
      </div>
    </>
  );
}
