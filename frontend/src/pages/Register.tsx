import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Register.css';
import Navbar from '../components/navigation';

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
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  dateOfBirth: yup
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
    .oneOf(['male', 'female', 'other', 'prefer-not-to-say'], 'Please select a valid gender option'),
});

type FormData = yup.InferType<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      console.log('Registration data:', data);
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Registration successful! Welcome to our platform.');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Navbar />      
      <div className="register-form-container">
        <h2 className="register-title">
          Create Account
        </h2>
        
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
                {...register('confirmPassword')}
                type="password"
                id="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="error-message">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dateOfBirth" className="form-label">
                Date of Birth
              </label>
              <input
                {...register('dateOfBirth')}
                type="date"
                id="dateOfBirth"
                className="form-input"
              />
              {errors.dateOfBirth && (
                <p className="error-message">
                  {errors.dateOfBirth.message}
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
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
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
