import axios from 'axios';
import React, { useState, useEffect } from 'react';

const ProductListCustomer = ({ restaurantId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products?restaurantId=${restaurantId}`);
                setProducts(response.data)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className='m-4 text-2xl text-center font-bold'>Products</h2>
            <ul>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                    {products.map((product) => (
                        <div key={product._id} className="card w-50 bg-base-100 shadow-xl m-4">
                            <div className="card-body">
                                <figure>
                                    <img className='max-w-'
                                        src={`http://localhost:5000/${product.imagePath}`} alt="Shoes" /></figure>
                                <h2 className="card-title">
                                    {product.name}
                                    <div className="badge badge-secondary">NEW</div>
                                </h2>
                                <p>Price: {product.price}?</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default ProductListCustomer;
