import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify';
import { loginLifeCycle } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import GenericInput from '../components/GenericInput';
import * as yup from 'yup';

const formSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter an email address, it is required'),
    password: yup.string().required('Please enter a password, it is required'),
});

const Login = () => {
    
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
    }, [isError, isSuccess, user, message, navigate, dispatch]);

    const handleLogin = (value) => {
        dispatch(loginLifeCycle(value));
    };

    if (isLoading) return <Spinner />;

    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)}>
                <GenericInput register={register('email')} type='email' errors={errors['email']} />
                <GenericInput register={register('password')} type='password' errors={errors['password']} />
                <button>Submit</button>
            </form>
            <p>
                {'you can also '}
                <Link to='/register'>
                    Register!
                </Link>
            </p>
            <p>
                {'or can login as '}
                <Link to='/company-list'>
                    External!
                </Link>
            </p>
        </>
    )
}

export default Login;