import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addProductItem, setProductsData, setRestaurantId } from "../redux/homeSlice";
import { updateLoginState } from "../redux/authSlice";

function Home() {
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

    const [products, setProducts] = useState([]);
    const [showToast, setShowToast] = useState(false);

    const fetchProducts = async (resId) => {
        try {
            const response = await axios.get(`http://localhost:3200/api/products?restaurantId=${resId}`);
            console.log(response);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        if (localStorage.getItem("restaurantId")) {
            fetchProducts(localStorage.getItem("restaurantId"));
        }
    }, [])

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <div>
                    <button className="btn m-4 btn-primary" onClick={() => {
                        localStorage.clear();
                        dispatch(updateLoginState({
                            loggedIn: false,
                            email: "",
                            password: ""
                        }));
                    }}>Logout</button>
                </div>

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
                <div>
                    <h2 className='m-4 text-2xl text-center font-bold'>Products</h2>
                    <ul>
                        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
                            {products.map((product) => (
                                <div key={product._id} className="card w-50 bg-base-100 shadow-xl m-4">
                                    <div className="card-body">
                                        <figure>
                                            <img className='max-w-'
                                                src={`http://localhost:3200/${product.imagePath}`} alt="Shoes" /></figure>
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
            </div>
            {showToast ?
                <div className="toast toast-end">
                    <div className="alert alert-info">
                        <span>New mail arrived.</span>
                    </div>
                    <div className="alert alert-success">
                        <span>Message sent successfully.</span>
                    </div>
                </div> :
                <div></div>
            }
        </div>
    );
}

export default Home