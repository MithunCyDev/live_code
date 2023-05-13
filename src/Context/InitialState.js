import {fetchUser} from '../FetchLocalStorage/FetchLocalStorage'

const userInfo= fetchUser()

export const InitialState = {
    user: userInfo,
};