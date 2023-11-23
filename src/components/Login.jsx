import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProductItem, setRestaurantId, setRestaurantIdTime, showToast } from '../redux/homeSlice';
import { updateLoginState } from '../redux/authSlice';

const AddProduct = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
    });

    const [isLogin, setIsLogin] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imageFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios
                .post('http://localhost:5000/api/login',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
            if (response.data) {
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("password", response.data.password);
                localStorage.setItem("name", response.data.name);
                localStorage.setItem("restaurantId", response.data.restaurantId);
                dispatch(setRestaurantId(response.data.restaurantId));
                dispatch(setRestaurantIdTime(response.data.restaurantId));
                dispatch(updateLoginState({
                    loggedIn: true,
                    email: response.data.email,
                    password: response.data.password
                }));
            } else {
                // dispatch(showToast({status:true,message:response.statusText}));
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center'>
            <h1 className="m-4 text-2xl text-center font-bold">{isLogin ? "Login" : "Register"}</h1>

            {!isLogin ?
                <input
                    className="input m-4 input-bordered input-primary w-full max-w-xs"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                /> : null
            }

            <input
                className="input m-4 input-bordered input-primary w-full max-w-xs"
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
            />
            <input
                className="input m-4 input-bordered input-primary w-full max-w-xs"
                type="text"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
            />
            <button className="btn m-4 btn-primary" onClick={handleSubmit}>{isLogin ? "Login" : "Register"}</button>
            <button className="m-4" onClick={() => {
                setIsLogin(!isLogin);
            }}>{!isLogin ? "Login" : "Register"}</button>
        </div>
    );
};

export default AddProduct;
