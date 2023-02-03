import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import GenericInput from '../components/GenericInput';
import Spinner from '../components/Spinner';
import { registerLifeCycle, reset } from '../features/auth/authSlice';
import FormHeader from '../components/FormHeader';

const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Please enter an email address, it is required'),
    password: Yup.string()
      .required('Please enter a password, it is required'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
});

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isError, user, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) });

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess || user) {
            toast.success('Login successfull!');
            navigate('./../company-list');
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);


    const registerHandle = (value) => {
        const { confirmPassword, ...registerData } = value;
        dispatch(registerLifeCycle(registerData));
    };

    if (isLoading) return <Spinner />;

    return (
        <>
            <div className='card h-60 my-auto card-container'>
                <FormHeader title={'Register'} />
                <form onSubmit={handleSubmit(registerHandle)}>
                    <GenericInput register={register('email')} type='email' errors={errors['email']} />
                    <GenericInput register={register('password')} type='password' errors={errors['password']} />
                    <GenericInput register={register('confirmPassword')} type='password' errors={errors['confirmPassword']} />
                    <div className='d-flex py-4'>
                        <button className='btn btn-success mx-auto'>Submit</button>
                    </div>
                </form>
                <div className='d-flex flex-column align-items-center'>
                    <p>
                        {'Have an account? '}
                        <Link to='/login'>
                        Login!
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Register;