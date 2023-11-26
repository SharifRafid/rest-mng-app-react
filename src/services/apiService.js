import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export async function loginUser(email, password) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/login`,
                {
                    "email": email,
                    "password": password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return {
            data: null,
            error: "error.response.data",
        };
    }
}

export async function updateUser(email, password, name) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/profile`,
                {
                    "email": email,
                    "password": password,
                    "name": name,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        return {
            data: null,
            error: error.response.data,
        };
    }
}

export async function signUpUser(email, password, name) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/signup`,
                {
                    "email": email,
                    "password": password,
                    "name": name,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return {
            data: null,
            error: error.response.data,
        };
    }
}

export async function loginConsumer(email, password) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/login-consumer`,
                {
                    "email": email,
                    "password": password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return {
            data: null,
            error: "error.response.data",
        };
    }
}

export async function updateConsumer(email, password, name) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/profile-consumer`,
                {
                    "email": email,
                    "password": password,
                    "name": name,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        return {
            data: null,
            error: error.response.data,
        };
    }
}

export async function signUpConsumer(email, password, name) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/signup-consumer`,
                {
                    "email": email,
                    "password": password,
                    "name": name,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return {
            data: null,
            error: error.response.data,
        };
    }
}


export async function addProduct(name, price, restaurantId, imageFile, shortDesc, desc) {
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('price', price);
    formDataToSend.append('restaurantId', restaurantId);
    formDataToSend.append('imageFile', imageFile);
    formDataToSend.append('shortDescription', shortDesc);
    formDataToSend.append('description', desc);
    try {
        var response = await axios
            .post(`${API_BASE_URL}/products`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getProducts(restaurantId) {
    try {
        var response = await axios
            .get(`${API_BASE_URL}/products?restaurantId=${restaurantId}`);
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getOrders(restaurantId) {
    try {
        var response = await axios
            .get(`${API_BASE_URL}/orders?restaurantId=${restaurantId}`);
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}


export async function getCartProducts(email, password) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/cartProducts`,
                {
                    "email": email,
                    "password": password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function addProductToCart(email, password, productId) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/addCartProduct`,
                {
                    "email": email,
                    "password": password,
                    "productId": productId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function removeProductFromCart(email, password, productId) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/removeCartProduct`,
                {
                    "email": email,
                    "password": password,
                    "productId": productId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getWishistProducts(email, password) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/wishListProducts`,
                {
                    "email": email,
                    "password": password,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function addProductToWishist(email, password, productId) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/addWishListProduct`,
                {
                    "email": email,
                    "password": password,
                    "productId": productId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function removeProductFromWishist(email, password, productId) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/removeWishListProduct`,
                {
                    "email": email,
                    "password": password,
                    "productId": productId,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function placeOrder(email, password, restaurantId, totalPrice) {
    try {
        var response = await axios
            .post(`${API_BASE_URL}/placeOrder`,
                {
                    "email": email,
                    "password": password,
                    "restaurantId": restaurantId,
                    "totalPrice": totalPrice,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        return response;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function deleteProduct(id) {
    try {
        var response = await axios
            .delete(`${API_BASE_URL}/products?id=${id}`);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}