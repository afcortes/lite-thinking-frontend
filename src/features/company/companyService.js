import axios from 'axios';
import constants from '../../constants/constants'
 
const API_URL = `${process.env.REACT_APP_API_URL + constants.endpoints.company.base}`;

const companyAPI = axios.create({ baseURL: API_URL });

const getCompanies = async () => {

    const response = await companyAPI.get('')

    return response.data;
}

const getCompany = async (companyNIT) => {

    const response = await companyAPI.get(`/${companyNIT}`)

    return response.data;
}

const createCompany = async (companyData) =>{

    const response = await companyAPI.post('', companyData)

    return response.data;
}

const editCompany = async (companyData, companyNIT) =>{

    const response = await companyAPI.patch(`/${companyNIT}`, companyData)

    return response.data;
}

const deleteCompany = async (companyNIT) => {

    const response = await companyAPI.delete(`/${companyNIT}`)

    return response.data;
}

export { getCompanies, createCompany, deleteCompany, getCompany, editCompany };