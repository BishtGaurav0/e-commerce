export const addToCart = (data) => {
    return {
        type : "ADDTOCART",
        payload : data
    }
}

export const removeFromCart = (data) => {
    return {
        type : "REMOVEFROMCART",
        payload : data
    }
}

export const emptyCart = () => {
    return {
        type : "EMPTYCART"
    }
}

export const viewDetails = (data) => {
    return {
        type : "VIEWDETAILS",
        payload : data
    }
}

export const login = (data) => {
    return {
        type : "LOGIN",
        payload : data
    }
}

export const logout = () => {
    return {
        type : "LOGOUT",
    }
}