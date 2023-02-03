import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import GenericInput from '../components/GenericInput';
import Spinner from '../components/Spinner';
import parseJWT from './../utils/parseJWT'
import { registerLyfeCycle, reset } from '../features/auth/authSlice';

const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Please enter an email address, it is required'),
    password: Yup.string()
      .required('Please enter a password, it is required'),
    confirmPassword: Yup.string()
      .required('Please enter a confirm password, it is required')
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
            navigate(`./../${parseJWT(user.token).user.role}`);
        }

        dispatch(reset());
    }, [isError, isSuccess, user, message, navigate, dispatch]);


    const registerHandle = (value) => {
        const { confirmPassword, ...registerData } = value;
        dispatch(registerLyfeCycle(registerData));
    };

    if (isLoading) return <Spinner />;

    return (
        <>
            <form onSubmit={handleSubmit(registerHandle)}>
                <GenericInput register={register('email')} type='email' errors={errors['email']} />
                <GenericInput register={register('password')} type='password' errors={errors['password']} />
                <GenericInput register={register('confirmPassword')} type='password' errors={errors['confirmPassword']} />
                <button>Submit</button>
            </form>
            <p>
                {'Have an account? '}
                <Link to='/login'>
                Login!
                </Link>
            </p>
        </>
    );
};

export default Register;