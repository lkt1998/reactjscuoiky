import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  form: PropTypes.object.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled } = props;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, formState }) => (
        <TextField
          name={name}
          value={field.value}
          onChange={field.onChange}
          inputRef={field.ref}
          disabled={disabled}
          label={label}
          fullWidth
          error={!!(formState.errors?.[name])}
          helperText={formState.errors?.[name]?.message}
          variant="outlined"
          margin="dense"
        />
      )}
    />
  );
}

export default InputField;
