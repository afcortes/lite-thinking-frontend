import axios from 'axios';
import parseJwt from '../../utils/parseJWT';
import constants from '../../constants/constants'
 
const API_URL = `${process.env.REACT_APP_API_URL + constants.endpoints.auth.base}`;

const authAPI = axios.create({ baseURL: API_URL });

const register = async (registerData) => {
    await authAPI.post(constants.endpoints.auth.register, registerData);
}

const login = async (loginData) => {
    const response = await authAPI.post(constants.endpoints.auth.login, loginData);
    const user = parseJwt(response.data.accessToken);
    if (response.data) {
        localStorage.setItem(constants.localStorage.user, JSON.stringify(user));
    }
    return user;
}

const logout = () => localStorage.removeItem(constants.localStorage.user);


export { register, login, logout };