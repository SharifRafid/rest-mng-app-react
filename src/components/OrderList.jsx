import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILES_BASE_URL } from '../utils/constants';
import { addProductToCart, addProductToWishist, deleteProduct } from '../services/apiService';
import { setCartProductsData, setProductsData, setWishlistProductsData } from '../redux/homeSlice';
import { toast } from 'react-toastify';
import OrderItem from './admin/OrderItem';

const getOrders = state => state.home.orderItems;
const getIsConsumer = state => state.auth.isCustomer;
const getUserData = state => state.auth;
const getTables = state => state.home.tables;

const OrderList = () => {
    const dispatch = useDispatch();

    const orders = useSelector(getOrders);
    const isConsumer = useSelector(getIsConsumer);
    const userData = useSelector(getUserData);
    const tables = useSelector(getTables);

    const [selectedOption, setSelectedOption] = useState(""); // Set initial selected value
    const [filteredOrders, setFilteredOrders] = useState([]); // Set initial selected value

    const handleButtonClick = (tableItem) => {
        if (selectedOption == tableItem) {
            setSelectedOption(""); // Deselect if already 
            setFilteredOrders(orders);
        } else {
            setSelectedOption(tableItem);
            const filtered = orders.filter(order => order.tableId === tableItem.num);
            setFilteredOrders(filtered);
        }
    };

    return (
        <div className='w-full h-full'>
            <h2 className='m-4 text-2xl text-center font-bold'>Orders</h2>
            Select Table :
            <div className="overflow-x-auto whitespace-no-wrap">
                <div className="flex">
                    {tables ? (
                        tables.map((tableItem, index) => (
                            <button
                                key={index}
                                onClick={() => handleButtonClick(tableItem)}
                                className={`btn ${selectedOption === tableItem ? 'btn-primary' : 'btn-secondary'} mx-2`}
                            >
                                {tableItem.name}
                            </button>
                        ))
                    ) : (
                        <p>No tables available</p>
                    )}
                </div>
            </div>
            {filteredOrders.length !== 0 ? (
                <ul className='flex flex-col'>
                    {filteredOrders.map(order => (
                        isConsumer ? <div key={order._id} className="card w-auto bg-base-100 shadow-xl m-2">
                            <div className="card-body">
                                <p>Name: {order.name}</p>
                                <p>Email: {order.email}</p>
                                {/* <p>Restaurant ID: {order.restaurantId}</p> */}
                                <p>Total Price: {order.totalPrice}</p>
                                <p>Customer ID: {order.customerId}</p>
                                <p>Wifi Pass: {order.wifiPass}</p>
                                <p>Table Name: {order.tableName}</p>
                                <p>Table No: {order.tableId}</p>
                                <p>WIFI Password: {order.wifiPass}</p>
                                <p>Order Status: {order.orderStatus}</p>
                                <h3>Products:</h3>
                                <ul>
                                    {order.products.map(product => (
                                        <li key={product._id}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <h4 className="card-title">{product.name}</h4>
                                                    <p>{product.shortDescription}</p>
                                                    <p>Price: {product.price}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div> :
                            <OrderItem order={order} key={order._id} />
                    ))}
                </ul>
            ) : (
                <div className="w-full h-1/2 flex items-center justify-center text-center">
                    <div className="max-w-md">
                        <h1 className="text-1xl font-bold">No Orders Found</h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
