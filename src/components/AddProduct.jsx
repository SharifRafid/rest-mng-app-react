import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProductItem, setRestaurantId, setRestaurantIdTime } from '../redux/homeSlice';

const AddProduct = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        imageFile: null,
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, imageFile: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('restaurantId', localStorage.getItem("restaurantId"));
        formDataToSend.append('imageFile', formData.imageFile);

        try {
            const response = await axios.post('http://localhost:3200/api/products', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data) {
                dispatch(addProductItem(response.data));
                dispatch(setRestaurantId(response.data.restaurantId));
                dispatch(setRestaurantIdTime(Date.now()));
                setFormData({
                    name: '',
                    price: '',
                    restaurantId: '',
                    imageFile: null,
                });
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="m-4 text-2xl text-center font-bold">Add Products</h1>
            <input
                className="input m-4 input-bordered input-primary w-full max-w-xs"
                type="text"
                placeholder="Product Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
            <input
                className="input m-4 input-bordered input-primary w-full max-w-xs"
                type="text"
                placeholder="Price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
            />
            <input
                className="file-input m-4 file-input-bordered file-input-primary w-full max-w-xs" type="file" name="imageFile" onChange={handleFileChange} />
            <button className="btn m-4 btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default AddProduct;
