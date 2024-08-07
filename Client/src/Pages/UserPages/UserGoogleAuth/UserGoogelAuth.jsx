import React from 'react'
import { Button } from "@material-tailwind/react";
import {GoogleAuthProvider, signInWithPopup,getAuth} from "firebase/auth"
import { app } from '../../Firebase/fireBase';
import axios from "axios";
import {useDispatch} from "react-redux";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {signInFaliure,signSuccess,signInStart} from "../../../store/user/userSlice"
import {setCart} from "../../../store/userCart/userCartSlice";
import { useNavigate } from 'react-router-dom';

export default function UserGoogelAuth() {

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const randomNumber=()=>{
        let s="";
        for(let i=0;i<6;i++){
            s+=Math.floor(Math.random()*10)
        }
        return s;
    }
    const handleGoogleAuth=async ()=>{
        try{
            dispatch(signInStart());
            const provider=new GoogleAuthProvider()
            const auth=getAuth(app);
            const result=await signInWithPopup(auth,provider);
            const randomString=randomNumber();
            const user={
                username:result._tokenResponse.firstName+randomString,
                email:result._tokenResponse.email
            }
            const res=await axios.post("/api/auth/user-google",{user});
            const data=await res.data;
            if(data.isSuccess){
                localStorage.setItem("access_token",data.token);
                dispatch(signSuccess(data.user));
                dispatch(setCart(data.user.cart));
                navigate("/");
            }else{
                toast.error(error?.response?.data?.message, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Zoom,
                });
            }
            
        }catch(error){
            toast.error(error?.response?.data?.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Zoom,
            });
            dispatch(signInFaliure(error?.response?.data?.message));
        }
    }
    return (
        <>
            <Button
                variant="outlined"
                size="lg"
                className="mt-6 flex h-12 items-center justify-center gap-2"
                fullWidth
                onClick={handleGoogleAuth}
            >
                <img
                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                alt="google"
                className="h-6 w-6"
                />{" "}
                sign in with google
            </Button>
            
        </>
    )
}
