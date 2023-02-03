import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { editCompany } from './../features/company/companyService'
import GenericInput from '../components/GenericInput';
import { useEffect } from 'react';
import { useState } from 'react';
import { getCompany } from './../features/company/companyService'
import { useParams } from 'react-router-dom';
import FormHeader from '../components/FormHeader';
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner';



const formSchema = yup.object().shape({
  name: yup.string().required('Please enter a name, it is required'),
  address: yup.string().required('Please enter an address, it is required'),
  phoneNumber: yup.string().required('Please enter a phone number, it is required'),
});

const EditCompany = () => {

    const { company_NIT } = useParams();

    const [ company, setCompany ] = useState({})
    
    const { isLoading } = useSelector(
        (state) => state.company
    );

    const navigate = useNavigate();

    useEffect(() => {
        getCompany(company_NIT).then((company) => {
            setCompany(company)
        })

    }, [company_NIT, setCompany]);

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) });

    const editCompanyHandle = async (value) => {
        await editCompany(value, company_NIT);
        navigate('./../company-list')
    }

    if (isLoading) return <Spinner/>

    return (
        <div>
            <div className='card h-50 my-auto card-container'>
                <FormHeader title={'Edit company'}/>
                <form onSubmit={handleSubmit(editCompanyHandle)}>
                    <GenericInput value={company.name} register={register('name')} errors={errors['name']} type='text' />
                    <GenericInput value={company.address} register={register('address')} errors={errors['address']} type='text' />
                    <GenericInput value={company.phoneNumber} register={register('phoneNumber')} errors={errors['phoneNumber']} type='text' />
                    <div className='d-flex py-4'>
                        <button className='btn btn-success mx-auto'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default EditCompany;