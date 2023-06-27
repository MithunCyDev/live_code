export const actionType = {
    SET_USER: "SET_USER",
    SET_ROOM: "SET_ROOM",
    SET_CODE: "SET_CODE",
}

const Reducer = (state, action) =>{

    switch (action.type){
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            };
        case actionType.SET_ROOM:
            return {
                ...state,
                roomId: action.roomId,
            };
        case actionType.SET_CODE:
            return {
                ...state,
                newCode: action.newCode,
            };

            default:
                return state;
    }
}

export default Reducer;