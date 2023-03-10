import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createCompany } from './../features/company/companyService'
import GenericInput from '../components/GenericInput';
import FormHeader from '../components/FormHeader';
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner';

const formSchema = yup.object().shape({
  name: yup.string().required('Please enter a name, it is required'),
  address: yup.string().required('Please enter an address, it is required'),
  NIT: yup.string().required('Please enter a NIT, it is required'),
  phoneNumber: yup.string().required('Please enter a phone number, it is required'),
});

const CreateCompany = () => {

    const navigate = useNavigate();

    const { isLoading } = useSelector(
        (state) => state.company
    );

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) });

    const createCompanyHandle = async (value) => {
        await createCompany(value);
        navigate('./../company-list')
    }

    if (isLoading) return <Spinner/>

    return (
        <div>
            <div className='card h-50 my-auto card-container'>
                <FormHeader title={'Create company'}/>
                <form onSubmit={handleSubmit(createCompanyHandle)}>
                    <GenericInput register={register('name')} errors={errors['name']} type='text' />
                    <GenericInput register={register('address')} errors={errors['address']} type='text' />
                    <GenericInput register={register('NIT')} errors={errors['NIT']} type='text' />
                    <GenericInput register={register('phoneNumber')} errors={errors['phoneNumber']} type='text' />
                    <div className='d-flex py-4'>
                        <button className='btn btn-success mx-auto'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreateCompany;