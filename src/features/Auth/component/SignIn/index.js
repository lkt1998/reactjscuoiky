import { unwrapResult } from '@reduxjs/toolkit';
import { login } from 'features/Auth/userSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import SignInForm from '../SignInForm';

SignIn.propTypes = {
  closeDialog: PropTypes.func,
};

function SignIn(props) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values) => {
    try {
      values.username = values.email;

      const action = login(values);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction)

      const { closeDialog } = props
      if (closeDialog) closeDialog()
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });

      console.log("failed to login", error);
    }
  };

  return (
    <div>
      <SignInForm onSubmit={handleSubmit} />
    </div>
  );
}

export default SignIn;
