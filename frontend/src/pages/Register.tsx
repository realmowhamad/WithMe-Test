import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Register.css';
import Navbar from '../components/Navigation';
import useAuth, { type RegisterDataTypes, type RegisterResponseTypes } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
// Validation schema
const schema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  password_confirm: yup 
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
    date_of_birth: yup
    .date()
    .required('Date of birth is required')
    .max(new Date(), 'Date of birth cannot be in the future')
    .test('age', 'You must be at least 13 years old', function(value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 13;
      }
      return age >= 13;
    }),
  gender: yup
    .string()
    .required('Please select your gender')
    .oneOf(['M', 'F', 'O'], 'Please select a valid gender option'),
});

type FormData = yup.InferType<typeof schema>;

const Register = () => {
  const { mutate: mutateRegister } = useAuth().useRegister();

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
      // Format date_of_birth to YYYY-MM-DD string format
      const formattedData = {
        ...data,
        date_of_birth: new Date(data.date_of_birth).toISOString().split('T')[0]
      };
      
      console.log(formattedData);
      mutateRegister(formattedData as unknown as RegisterDataTypes,{
        onSuccess:(data:RegisterResponseTypes) => {
          setMessageType('success');
          setMessage(data.message);
          setShowMessage(true);
        },
        onError: (error:any) => {
          setMessageType('error');
          setMessage(error.response?.data?.message || 'Registration failed. Please try again.');
          setShowMessage(true);
        }
      });
    } catch (error) {
      setMessageType('error');
      setMessage('Registration failed. Please try again.');
      setShowMessage(true);
    }
  };

  return (
    <div className="register-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Navbar />      
      <div className="register-form-container">
        <h2 className="register-title">
          Create Account
        </h2>
        {showMessage && (
          <div className={`message-container ${messageType}`}>
            <p className="message-text">{message}</p>
          </div>
        )}        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                id="username"
                className="form-input"
                placeholder="Choose a username"
              />
              {errors.username && (
                <p className="error-message">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="form-input"
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="error-message">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                {...register('password')}
                type="password"
                id="password"
                className="form-input"
                placeholder="Create a strong password"
              />
              {errors.password && (
                <p className="error-message">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                {...register('password_confirm')}
                type="password"
                id="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
              />
              {errors.password_confirm && (
                <p className="error-message">
                  {errors.password_confirm.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date_of_birth" className="form-label">
                Date of Birth
              </label>
              <input
                {...register('date_of_birth')}
                type="date"
                id="date_of_birth"
                className="form-input"
              />
              {errors.date_of_birth && (
                <p className="error-message">
                  {errors.date_of_birth.message}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                {...register('gender')}
                id="gender"
                className="form-input"
              >
                <option value="">Select your gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              {errors.gender && (
                <p className="error-message">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="register-button"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="login-link-container">
          <p className="login-text">
            Already have an account? <a href="/login" className="login-link">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
