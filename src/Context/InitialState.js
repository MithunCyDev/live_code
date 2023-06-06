import {fetchRoomId, fetchUser} from '../FetchLocalStorage/FetchLocalStorage'

const userInfo= fetchUser()
const userRoomId= fetchRoomId()

export const InitialState = {
    user: userInfo,
    roomId: userRoomId,
};