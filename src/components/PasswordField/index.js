import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { FormHelperText } from '@mui/material';

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function PasswordField(props) {
  const [showPassword, setShowPassword] = useState(false);
  const { form, name, label, disabled } = props;
  const { formState } = form

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  return (
    <FormControl error={!!(formState.errors?.[name])} variant="outlined" fullWidth margin="dense">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <div>
            <OutlinedInput
              fullWidth
              id={name}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label={label}
              value={field.value}
              onChange={field.onChange}
              inputRef={field.ref}
              disabled={disabled}
              error={!!(formState.errors?.[name])}
            />
            <FormHelperText>{formState.errors?.[name]?.message}</FormHelperText>
          </div>
        )}
      />
    </FormControl>
  );
}

export default PasswordField;
