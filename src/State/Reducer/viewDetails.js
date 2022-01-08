const viewDetails = (state = {}, action) => {
    switch(action.type) {
        case "VIEWDETAILS" :
            return action.payload
        
        default :
            return state
    }
}

export default viewDetails