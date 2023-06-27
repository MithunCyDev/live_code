import {fetchNewCode, fetchRoomId, fetchUser} from '../FetchLocalStorage/FetchLocalStorage'

const userInfo= fetchUser()
const userRoomId= fetchRoomId()
const userCode = fetchNewCode()

export const InitialState = {
    user: userInfo,
    roomId: userRoomId,
    newCode: userCode,
};