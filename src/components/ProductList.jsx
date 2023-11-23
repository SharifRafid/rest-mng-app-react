import React, { useState, useEffect } from 'react';
import { store } from '../redux/store';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    store.subscribe(() => {
        var state = store.getState();
        console.log(state.home.productsData);
        setProducts(state.home.productsData);
    });

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
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">Delete Product</div>
                                    <div className="badge badge-outline">Edit Product</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ul>
        </div>
    );
};

export default ProductList;
