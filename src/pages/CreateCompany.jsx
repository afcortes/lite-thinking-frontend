import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createCompany } from './../features/company/companyService'
import GenericInput from '../components/GenericInput';

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter a name, it is required'),
  address: yup.string().required('Please enter an address, it is required'),
  NIT: yup.string().required('Please enter a NIT, it is required'),
  phoneNumber: yup.string().required('Please enter a phone number, it is required'),
});

const CreateCompany = () => {

    const navigate = useNavigate();

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) });

    const createCompanyHandle = async (value) => {
        await createCompany(value);
        navigate('./../company-list')
    }

    return (
        <div>
            <main>
                <div>
                <h1>Create new company </h1>
                <p>Please fill out the form bellow</p>
                </div>
                <form onSubmit={handleSubmit(createCompanyHandle)}>
                    <GenericInput register={register('name')} errors={errors['name']} type='text' />
                    <GenericInput register={register('address')} errors={errors['address']} type='text' />
                    <GenericInput register={register('NIT')} errors={errors['NIT']} type='text' />
                    <GenericInput register={register('phoneNumber')} errors={errors['phoneNumber']} type='text' />
                    <button className='form-button'>Submit</button>
                </form>
            </main>
        </div>
    );
};
export default CreateCompany;