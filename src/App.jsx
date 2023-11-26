import { useEffect, useState } from "react"
import Home from "./components/restaurant/Home";
import { useDispatch } from "react-redux";
import { setCustomerRestaurantId } from "./redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import HomeConsumer from "./components/consumer/HomeConsumer";

function App() {
  const dispatch = useDispatch();

  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (params.get("restaurantId")) {
      dispatch(setCustomerRestaurantId(params.get("restaurantId")));
    }
  }, []);

  return (
    <div data-theme="light">
      {
        params.get("restaurantId") != null ?
          <HomeConsumer /> :
          <Home />
      }
      <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
    </div>
  );
}

export default App
