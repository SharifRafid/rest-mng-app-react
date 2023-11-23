import { useEffect, useState } from "react"
import Home from "./components/Home";
import Login from "./components/Login";
import { store } from "./redux/store";
import ProductListCustomer from "./components/ProductListCustomer";
import { useDispatch } from "react-redux";
import { setRestaurantId, setRestaurantIdTime } from "./redux/homeSlice";
import { updateLoginState } from "./redux/authSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const [loggedIn, setIsLoggedIn] = useState(null);
  const [restaurantId, setRestaurantIdLocal] = useState(null);

  store.subscribe(() => {
    var state = store.getState();
    // console.log(state);
    setIsLoggedIn(state.auth.loggedIn);
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("restaurantId")) {
      setRestaurantIdLocal(params.get("restaurantId"));
    }
    async function loginTry() {
      try {
        const response = await axios
          .post('http://localhost:5000/api/login',
            {
              "email": localStorage.getItem("email"),
              "password": localStorage.getItem("password"),
            },
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
          console.log(response.data);
          setIsLoggedIn(true)
          dispatch(setRestaurantIdTime(Date.now()));
          dispatch(setRestaurantId(response.data.restaurantId));
          dispatch(updateLoginState({
            loggedIn: true,
            email: response.data.email,
            password: response.data.password
          }));
        } else {
          setIsLoggedIn(false)
          // dispatch(showToast({status:true,message:response.statusText}));
        }
      } catch (error) {
        console.error('Error creating product:', error);
      }
    }
    if (localStorage.getItem("email")) {
      loginTry();
    }else{
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div data-theme="light">
      {restaurantId == null ? loggedIn == null ?
        <div className="w-screen h-screen flex align-center justify-center">
          <span className="loading loading-infinity loading-lg"></span>
        </div> :
        loggedIn == true ?
          <Home /> : <Login /> :
        <ProductListCustomer restaurantId={restaurantId} />
      }
    </div>
  )
}

export default App
