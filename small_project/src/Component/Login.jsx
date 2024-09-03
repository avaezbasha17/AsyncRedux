import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccountCircle } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { loginUsers } from '../Redux/action';

const Login = () => {

    const [user, setUser] = useState({})
    const [emailPhone, setEmailPhone] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
    const phonePattern = /^(\+91[\-\s]?)?[789]\d{9}$/;
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loginUsers())
        .then(res=>setUser(res.payload.reducer.users[0])) //Changes have to be done here 
        .catch(err=>console.log(err))
    },[])

    const fetchUser = (data, type) => {
        if (user.length == 0) return toast.error('User not Found');
        (user[`${type}`] == data) ? (user.password == password) ? (navigate('/home')) : (toast.error("Invalid Password")) : (toast.error((type == 'email') ? ("Invalid Email Id") : ("Invalid Phone Number")))
    }

    const submit = () => {
        if (emailPhone == "" || password == "") return toast.error('All fields are required');
        (emailPattern.test(emailPhone)) ? (fetchUser(emailPhone, "email")) : ((phonePattern.test(emailPhone)) ? (fetchUser(emailPhone, "phone")) : (toast.error("Invaild Email or Phone Number")))
    }
    return (
        <div className='min-h-screen bg-amber-600 bg-opacity-20 flex justify-center items-center'>
            <div className='bg-white rounded-2xl shadow-2xl p-8 sm:p-12 md:p-16'>
                <h1 className='text-center text-4xl sm:text-5xl md:text-6xl'>Login</h1>
                <div className='mt-8 sm:mt-10 md:mt-12 flex flex-col'>
                    <TextField
                        id="outlined-email-phone"
                        label="Email or Phone Number"
                        variant="outlined"
                        sx={{ width: '100%', marginY: '1em' }}
                        name="emailPhone"
                        value={emailPhone}
                        onChange={(e) => setEmailPhone(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="outlined-password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="outlined"
                        sx={{ width: '100%', marginY: '1em' }}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div className='mt-4 flex flex-col justify-center items-center'>
                    <span className='mb-4'>If you're not registered, please <Link className='text-amber-700' to='/register'>register here</Link></span>
                    <button className='rounded-2xl w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 flex justify-center px-4 py-2 bg-sky-700 bg-opacity-45 hover:text-white hover:bg-opacity-30' onClick={submit}>Submit</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Login