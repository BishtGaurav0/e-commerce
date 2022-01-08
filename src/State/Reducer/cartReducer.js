const cartItems = JSON.parse(localStorage.getItem("cart")) || [] 

const cartReducer = (state = cartItems, action) => {
    let newState;
    switch(action.type){
        case "ADDTOCART" :
            newState =  [...state, action.payload]
            localStorage.setItem("cart", JSON.stringify(newState));
            return newState

        case "REMOVEFROMCART" :
            newState = state.filter( (e)=> (e.id !== action.payload) )
            localStorage.setItem("cart", JSON.stringify(newState))
            // console.log("14", newState)
            return newState;

        case "EMPTYCART" :
            localStorage.removeItem("cart");
            return null

        default :
            return state;
    }
}

export default cartReducer;