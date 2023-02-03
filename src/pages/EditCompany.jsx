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

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter a name, it is required'),
  address: yup.string().required('Please enter an address, it is required'),
  phoneNumber: yup.string().required('Please enter a phone number, it is required'),
});

const EditCompany = () => {

    const { company_NIT } = useParams();
    
    const [ company, setCompany ] = useState({})

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

    return (
        <div>
            <main>
                <div>
                <h1>Edit company {company && company.name}</h1>
                <p>Please fill out the form bellow</p>
                </div>
                <form onSubmit={handleSubmit(editCompanyHandle)}>
                    <GenericInput value={company.name} register={register('name')} errors={errors['name']} type='text' />
                    <GenericInput value={company.address} register={register('address')} errors={errors['address']} type='text' />
                    <GenericInput value={company.phoneNumber} register={register('phoneNumber')} errors={errors['phoneNumber']} type='text' />
                    <button>Submit</button>
                </form>
            </main>
        </div>
    );
};
export default EditCompany;