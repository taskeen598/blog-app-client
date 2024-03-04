import { create } from "zustand";
import useBlogStore from "./blog.zustand";
import {persist,devtools} from "zustand/middleware"

// const domain = "http://localhost:3006";
const domain = "https://blog-app-server-ecru.vercel.app";
interface AuthState {
  token: string;
  user: {};
  isLoggedin:boolean,
  login: (loginData: { email: string; password: string }) => void;

  signup: (signupData: {
    name: string;
    email: string;
    password: string;
    role: string;
    file?: File | null;
  }) => void;

  forgotpassword: (forgotpasswordData: { email: string }) => void;
  resetpassword: (resetpasswordData: { password: string; otp: string }) => void;
  signout: () => void;
}

const AuthStore = (set: any): AuthState => ({
  token: "",
  user: {},
  isLoggedin:false,
  login: async (loginData) => {
    try {
      const res = await fetch(`${domain}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(`Login Failed: ${errorMessage}`);
      }

      const loginToken = await res.json();
      console.log(loginToken);

      set({
        token: loginToken.token,
        user: loginToken.user,
        isLoggedin:true
      });
      return loginToken
    } catch (error) {
      console.log(error);
    }
  },

  signup: async (signupData) => {
    try {
        const res = await fetch(`${domain}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });
  
        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(`Sign up Failed: ${errorMessage}`);
        }
  
        const signupToken = await res.json();
        console.log(signupToken);
  
        set({
          token: signupToken.token,
          user: signupToken.user,
          isLoggedin:true
        });

      } catch (error) {
        console.log(error);
        return false
      }
  },

  forgotpassword: async (forgotpasswordData) => {
    try {
        const res = await fetch(`${domain}/auth/password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(forgotpasswordData),
        });
  
        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(`Failed: ${errorMessage}`);
        }
  
        const forgotPasswordToken = await res.json();
        console.log(forgotPasswordToken);
        localStorage.setItem("forgetPassword", forgotPasswordToken.token)

      } catch (error) {
        console.log(error);
      }
  },

  resetpassword: async (resetpasswordData) => {
    try {
        const data = localStorage.getItem('forgetPassword')
        console.log(data);
        
        const res = await fetch(`${domain}/auth/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `bearer ${data}` 
          },
          body: JSON.stringify(resetpasswordData),
        });
  
        if (!res.ok) {
          const errorMessage = await res.text();
          throw new Error(`Failed: ${errorMessage}`);
        }
  
        const resetPasswordToken = await res.json();
        console.log(resetPasswordToken);
        localStorage.removeItem("forgetPassword")
        
      } catch (error) {
        console.log(error);
      }
  },

  signout: async () => {

    localStorage.clear();
    set({
      token:'',
      user:{},
      isLoggedin:false
    })
  }


});
const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      AuthStore,
      {name:'Auth'}
    )
  )
);
export default useAuthStore;
