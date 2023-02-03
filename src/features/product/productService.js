import axios from 'axios';
import constants from '../../constants/constants'
 
const API_URL = `${process.env.REACT_APP_API_URL + constants.endpoints.product.base}`;

const productAPI = axios.create({ baseURL: API_URL });

const getProducts = async (company_NIT) => {

    const response = await productAPI.get(`/general/${company_NIT}`);

    return response.data;
}

const getProduct = async (productId) => {

    const response = await productAPI.get(`/specific/${productId}`)

    return response.data;
}

const createProduct = async (productData) =>{

    const response = await productAPI.post('', productData)

    return response.data;
}

export { getProducts, createProduct, getProduct };