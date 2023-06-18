export const fetchUser = ()=>{
    const userInfo = 
    localStorage.getItem("userName") !== null
    ? JSON.parse(localStorage.getItem("userNames")) 
    : localStorage.clear();
    return userInfo;
};

export const fetchRoomId = ()=>{
    const userRoomId = 
    localStorage.getItem("roomId") !== null
    ? JSON.parse(localStorage.getItem("roomId")) 
    : localStorage.clear();
    return userRoomId;
};
