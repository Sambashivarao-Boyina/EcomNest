import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux"
import { signInFaliure ,signInStart,signSuccess } from "../../../store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserGoogelAuth from "../UserGoogleAuth/UserGoogelAuth";
import {useFormik} from "formik";
import signUserSchema from "./signinSchema";
import {setCart} from "../../../store/userCart/userCartSlice"
import {Link} from "react-router-dom";

export function SignIn() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
    const dispatch=useDispatch();
    const {currUser,loading,error}=useSelector((state)=>state.user);
    const navigate=useNavigate();

    const onSubmit=async (values,actions)=>{
        const user=values;
        try{
            dispatch(signInStart());
            const res=await axios.post("/api/auth/user-signin",{email:user.email,password:user.password});
            const data=await res.data;
            if(data.isSuccess){
                localStorage.setItem("access_token",data.token);
                dispatch(signSuccess(data.user));
                dispatch(setCart(data.user.cart));
                navigate("/products");
            }else{
                toast.error(data.message, {
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
                dispatch(signInFaliure(data.message));

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

    
    const {values,errors,touched,isSubmitting,handleChange,handleBlur,handleSubmit}=useFormik({
        initialValues:{
           email:"",
           password:"",
        },
        validationSchema:signUserSchema,
        onSubmit,
    })

    

    
    return (
        <>
            <div className="breadcrumbs text-sm lg:ml-20 -mb-10">
                <ul className='lg:text-lg'>
                    <li></li>
                    <li><Link to={"/products"}>Home</Link></li>
                    <li><Link to={"/sign-in"}>Sign-in</Link></li>
                </ul>
            </div>
            <section className="grid text-center h-screen items-center p-8">
            <div>
                <Typography variant="h3" color="blue-gray" className="mb-2">
                User Sign In
                </Typography>
            
                <form className="mx-auto max-w-[30rem] text-left">
                    <div className="mb-6">
                        <label htmlFor="email">
                        <Typography
                            variant="small"
                            className="mb-2 block font-medium text-gray-900"
                        >
                            Your Email
                        </Typography>
                        </label>
                        <Input
                            id="email"
                            color="gray"
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="name@mail.com"
                            
                            className="w-full text-xl  placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
                            labelProps={{
                                className: "hidden",
                            }}
                            onChange={handleChange}
                            value={values.email}
                        />
                        {errors.email && touched.email  && <div className="mb-2 text-red-500 text-sm">{errors.email}</div>}

                    </div>
                    <div className="mb-6">
                        <label htmlFor="password">
                            <Typography
                                variant="small"
                                className="mb-2 block font-medium text-gray-900"
                            >
                                Password
                            </Typography>
                        </label>
                        <Input
                            size="lg"
                            placeholder="********"
                            labelProps={{
                                className: "hidden",
                            }}
                            name="password"
                            id="password"
                            onChange={handleChange}
                            value={values.password}
                            className="w-full text-xl placeholder:opacity-100 focus:border-t-black border-t-blue-gray-200"
                            type={passwordShown ? "text" : "password"}
                            icon={
                                <i onClick={togglePasswordVisiblity}>
                                {passwordShown ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                                </i>
                            }
                            
                        />
                        {errors.password && touched.password  && <div className="mb-2 text-red-500 text-sm">{errors.password}</div>}

                    </div>
                    <Button onClick={handleSubmit}  size="lg" className="mt-6 bg-primary" fullWidth>
                        sign in
                    </Button>
                    
                    {/* <UserGoogelAuth/> */}

                    <Typography
                        variant="small"
                        color="gray"
                        className="mt-4 text-center font-normal"
                    >
                        Not registered?{" "}
                        <NavLink to={"/sign-up"} className="font-medium inline cursor-pointer text-gray-900">
                            Create account
                            
                        </NavLink>
                        
                    </Typography>
                </form>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Zoom}
                />
            </div>
            </section>
        </>
    );
}

export default SignIn;