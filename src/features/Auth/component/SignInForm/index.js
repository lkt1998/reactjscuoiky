import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, LinearProgress, Typography } from '@mui/material';
import InputField from 'components/InputField';
import PasswordField from 'components/PasswordField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import './styles.scss';

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
};



function SignInForm(props) {

  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required('Please enter your email')
      .email('Please enter a valid email address'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 6 characters'),
  });
  const form = useForm({
    defaultValues: {
      identifier: '',
      password: '',
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
      <Avatar className="avatar" sx={{ backgroundColor: 'rgb(188, 31, 83)' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography sx={{ margin: '8px' }} className="title" component="h3" variant="h5">
        Sign In
      </Typography>

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <InputField name='identifier' form={form} label="Email" />
        <PasswordField name='password' form={form} label="Pass Word" />

        <Button
          disabled={isSubmitting}
          type='submit'
          className="button"
          variant="contained"
          sx={{ marginTop: '8px', color: 'primary' }}
        >
          Sign In
        </Button>
      </form>

    </div>
  );
}

export default SignInForm;
