import { IconButton, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, Phone, Email } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { createUsers } from '../Redux/action';


const Register = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const emailPattern = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    const phonePattern = /^(\+91[\-\s]?)?[789]\d{9}$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

    const submit = () => {
        if (name == "" || email == "" || phone == "" || password == "") return toast.error("All field are required");
        if (!emailPattern.test(email)) return toast.error("Invalid Email Id");
        if (!phonePattern.test(phone)) return toast.error("Invalid Phone Number");
        if (!passwordRegex.test(password)) return toast.error("Password should conatin first uppercase letter, special character and length should be 8");
        const obj = { name, email, phone, password }
        dispatch(createUsers(obj)); 
        setTimeout(()=>{
            navigate('/login')
        },1000)
        // navigate('/login')
    }

  return (
    <div className='min-h-screen bg-green-600 bg-opacity-20 flex justify-center items-center'>
            <div className='bg-white rounded-2xl shadow-2xl p-8 sm:p-12 md:p-16'>
                <h1 className='text-center text-4xl sm:text-5xl md:text-6xl'>Register</h1>
                <div className='mt-8 sm:mt-10 md:mt-12 flex flex-col'>
                    <TextField
                        sx={{ width: '100%', marginY: '1em' }}
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Name"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        sx={{ width: '100%', marginY: '1em' }}
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="outlined-email"
                        label="Email"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                     <Email/>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        sx={{ width: '100%', marginY: '1em' }}
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        id="outlined-phone"
                        label="Phone Number"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                     <Phone/>
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
                    <span className='mb-4'>If you're already registered, please <Link className='text-blue-700' to='/login'>login here</Link></span>
                    <button className='rounded-2xl w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 flex justify-center px-4 py-2 bg-blue-600 bg-opacity-45 hover:text-white hover:bg-opacity-30' onClick={submit}>Submit</button>
                </div>
            </div>
            <ToastContainer />
        </div>
  )
}

export default Register