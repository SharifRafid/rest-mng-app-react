import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, placeOrder, removeProductFromCart } from '../../services/apiService';
import { setCartProductsData } from '../../redux/homeSlice';
import { FILES_BASE_URL } from '../../utils/constants';

const getCartProducts = state => state.home.cartItems;
const getUserData = state => state.auth;

const CartPage = () => {
    const dispatch = useDispatch();

    const products = useSelector(getCartProducts);
    const userData = useSelector(getUserData);

    return (
        <div className='w-full h-full'>
            <div className="flex flex-row items-center justify-between w-full">
                <h2 className='m-4 text-2xl text-center font-bold'>Products</h2>
                <button className="btn m-4 btn-primary" onClick={async () => {
                    var response = await placeOrder(userData.email, userData.password, userData.restaurantId, "0");
                    if (response) {
                        dispatch(setCartProductsData([]));
                        toast.success("Successfully Placed Order");
                    } else {
                        toast.warn("No products found");
                    }
                }}>Order Now</button>
            </div>
            {products.length != 0 ?
                <ul>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                        {products.map((product) => (
                            <div key={product._id} className="card w-auto bg-base-100 shadow-xl m-2">
                                <div className="card-body">
                                    <figure>
                                        <img className='w-full' src={`${FILES_BASE_URL}/${product.imagePath}`} alt="Shoes" /></figure>
                                    <p>{product.shortDescription}</p>
                                    <p>Price: {product.price}</p>
                                    <div className="flex flex-row justify-end">
                                        <button
                                            onClick={async (c_event) => {
                                                c_event.preventDefault();
                                                var resp = await removeProductFromCart(userData.email, userData.password, product._id);
                                                if (resp) {
                                                    dispatch(setCartProductsData(resp.data));
                                                    toast.success("Added To Cart");
                                                } else {
                                                    toast.error("Failed to add to cart");
                                                }
                                            }}
                                            className="m-1 btn btn-sm btn-outline btn-error">Remove From Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ul> :
                <div className="w-full h-1/2 flex items-center justify-center text-center">
                    <div className="max-w-md">
                        <h1 className="text-1xl font-bold">No Products Found</h1>
                    </div>
                </div>
            }
        </div>
    );
};

export default CartPage;
