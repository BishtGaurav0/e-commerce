const initial = JSON.parse(localStorage.getItem("ecomUser")) || {}


const userReducer = (state = initial, action) => {
    let newState;
    
    switch(action.type){
        case "LOGIN" :
            newState = {...state, userName:action.payload}
            localStorage.setItem("ecomUser", JSON.stringify(newState));
            return newState

        case "LOGOUT" :
            localStorage.removeItem("ecomUser")
            localStorage.removeItem("cart");
            return null;

        default :
            return state;
    }
}

export default userReducer