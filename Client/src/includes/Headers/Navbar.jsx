import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios"
import {signOut} from "../../store/user/userSlice"
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Avatar,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Badge,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { HomeIcon,ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function (){
    const {currUser}=useSelector((state)=>state.user);
    const {cart}=useSelector((state)=>state.userCart);
    const dispatch=useDispatch();
    
    const handleSignOut=async ()=>{
       
        try{
            
            localStorage.removeItem("access_token");
            dispatch(signOut());
            toast.success("Logged-Out successfully", {
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
            
        }catch(error){
            dispatch(signInFaliure(error.response.data.message));
        }
    }

    return (
        <nav className="sticky top-0 left-0 w-full  bg-black flex flex-row items-center justify-start px-4 py-2 z-10">
            <Link className="text-white text-2xl font-black" to={"/products"}>EcomNest</Link>

            <div className="ml-auto flex gap-4 items-center">
                {
                    currUser && currUser.type==="User"?
                        <Link to={"/cart"}>
                            <Badge content={cart && cart.length}>
                                <Tooltip content={
                                    <p className="text-lg">&nbsp;&nbsp;Cart&nbsp;&nbsp;</p>
                                }>
                                    <IconButton>
                                        <ShoppingCartIcon className="w-8  h-8"/>
                                    </IconButton>
                                </Tooltip>
                            </Badge>
                        </Link>
                    :null
                }
                {
                    (currUser  && currUser.type==="Seller") ?
                        <Menu >
                            <MenuHandler>
                                <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                            </MenuHandler>
                            <MenuList >
                                <Link to={"/sellerProfile"} ><MenuItem>Profile</MenuItem></Link>
                                <Link to={"/addproduct"} ><MenuItem>Add Product</MenuItem></Link> 
                                <Link to={"/seller/orders"} ><MenuItem>Orders </MenuItem></Link>
                                <MenuItem><p onClick={handleSignOut} className=" cursor-pointer ">Sign-Out</p></MenuItem> 
                            </MenuList>
                        </Menu>

                    :null
                }
                {
                    currUser && currUser.type==="User"?
                        <Menu >
                            <MenuHandler>
                                <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                            </MenuHandler>
                            <MenuList>
                                <Link to={"/user/orders"} ><MenuItem>Orders </MenuItem></Link>
                                <Link to={"/user/wishlist"}><MenuItem>WishList</MenuItem></Link>
                                <MenuItem><p onClick={handleSignOut} className=" cursor-pointer ">Sign-Out</p></MenuItem> 
                            </MenuList>
                        </Menu>
                        :null

                }
                {
                    currUser==null &&  <Link to={"/sign-in"} className="text-white">SignIn</Link>
                }
               

            </div>
            
        </nav>
    )
}