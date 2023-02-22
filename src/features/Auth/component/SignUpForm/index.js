import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import InputField from 'components/InputField';
import PasswordField from 'components/PasswordField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.scss';

SignUpForm.propTypes = {
  onSubmit: PropTypes.func,
};



function SignUpForm(props) {

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name')
      .test('should has at least two words', 'Please enter at least two words', (value) => {
        return value.trim().split(' ').length >= 2
      }),
    email: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email address'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters'),
    retypePassword: yup
      .string()
      .required('Please enter your retype password')
      .oneOf([yup.ref('password')], 'Password does not match')
  });
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };

  const { isSubmitting } = form.formState

  return (
    <div className="root">
      {isSubmitting && <LinearProgress className='liner' />}
      <Avatar className="avatar" sx={{ backgroundColor: 'rgb(188, 31, 83)', marginTop: '10px' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography sx={{ margin: '8px' }} className="title" component="h3" variant="h5">
        Sign Up
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name='fullName' form={form} label="Full name" />
        <InputField name='email' form={form} label="Email" />
        <PasswordField name='password' form={form} label="Pass Word" />
        <PasswordField name='retypePassword' form={form} label="Retype PassWord" />

        <Button
          disabled={isSubmitting}
          type='submit'
          className="button"
          variant="contained"
          sx={{ marginTop: '8px', color: 'primary' }}
        >
          Sign Up
        </Button>
      </form>

    </div>
  );
}

export default SignUpForm;
