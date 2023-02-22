import { unwrapResult } from '@reduxjs/toolkit';
import { register } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import SignUpForm from '../SignUpForm';
import PropTypes from 'prop-types'

SignUp.propTypes = {
  closeDialog: PropTypes.func,
};

function SignUp(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction)
      console.log(user);
      enqueueSnackbar('Register successfully', { variant: 'success' })

      const { closeDialog, openSignIn } = props
      if (closeDialog) closeDialog()
      if (openSignIn) openSignIn()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });

      console.log("failed to register", error);
    }
  };

  return (
    <div>
      <SignUpForm onSubmit={handleSubmit} />
    </div>
  );
}

export default SignUp;
