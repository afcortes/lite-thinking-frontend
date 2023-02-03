import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import GenericInput from '../components/GenericInput';
import FormHeader from '../components/FormHeader';
import { createProduct } from './../features/product/productService'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import Spinner from '../components/Spinner';


const formSchema = yup.object().shape({
  name: yup.string().required('Please enter a name, it is required'),
  price: yup.number().required('Please enter a price, it is required'),
  description: yup.string().required('Please enter a phone number, it is required'),
});

const CreateProduct = () => {

    const { company_NIT } = useParams();

    const navigate = useNavigate();

    const { isLoading } = useSelector(
        (state) => state.product
    );

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) });

    const createProductHandle = async (value) => {
        await createProduct({...value, companyNIT: company_NIT});
        navigate('./../inventory')
    }

    if (isLoading) return <Spinner/>

    return (
        <div>
            <div className='card h-50 my-auto card-container'>
                <FormHeader title={'Create product'}/>
                <form onSubmit={handleSubmit(createProductHandle)}>
                    <GenericInput register={register('name')} errors={errors['name']} type='text' />
                    <GenericInput register={register('price')} errors={errors['price']} type='number' />
                    <GenericInput register={register('description')} errors={errors['description']} type='text' />
                    <div className='d-flex py-4'>
                        <button className='btn btn-success mx-auto'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CreateProduct;