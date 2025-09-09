import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Login.css';
import Navbar from '../components/Navigation';
import useAuth from '../hooks/useAuth';
import type { LoginDataTypes, LoginResponseTypes } from '../hooks/useAuth';
import { useEffect, useState } from 'react';

// Validation schema
const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

type FormData = yup.InferType<typeof schema>;

const Login = () => {
const  {mutate: mutateLogin} = useAuth().useLogin();
const [showMessage, setShowMessage] = useState<boolean>(false);
const [message, setMessage] = useState<string>('');
const [messageType, setMessageType] = useState<'success' | 'error'>('success'); 
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [showMessage]);

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      console.log('Login data:', data);
      mutateLogin(data as unknown as LoginDataTypes,{
        onSuccess:(data:LoginResponseTypes) => {
          setMessageType('success');
          setMessage(data.message);
          setShowMessage(true);
        },
        onError:(error:any) => {
          setMessageType('error');
          setMessage(error.response?.data?.message);
          setShowMessage(true);
        }
      });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Navbar />      
      <div className="login-form-container">
        <h2 className="login-title">
          Login
        </h2>
          {showMessage && (
          <div className={`message-container ${messageType}`}>
            <p className="message-text">{message}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              {...register('username')}
              type="text"
              id="username"
              className="form-input"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="error-message">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="error-message">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="login-button"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="signup-link-container">
          <p className="signup-text">
            Haven't registered yet? <a href="/register" className="signup-link">Register now</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
