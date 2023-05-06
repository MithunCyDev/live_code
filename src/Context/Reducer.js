export const actionType = {
    SET_USER: "SET_USER",
}

const Reducer = (state, action) =>{

    switch (action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };

            default:
                return state;
    }
}

export default Reducer;