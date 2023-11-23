import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setProductsData } from "../redux/homeSlice";
import { store } from "../redux/store";

function Home() {
    var dispatch = useDispatch();

    var prevTime = 0;

    const [showToast, setShowToast] = useState(false);

    const fetchProducts = async (resId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products?restaurantId=${resId}`);
            dispatch(setProductsData(response.data))
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    store.subscribe(() => {
        var state = store.getState();
        console.log(state);
        if (state.home.resId && (prevTime != state.home.time || prevTime == 0)) {
            prevTime = state.home.time;
            fetchProducts(state.home.resId);
        }
    });

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <AddProduct />
                <ProductList />
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