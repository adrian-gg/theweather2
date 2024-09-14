import { INPUT_FIELDS } from '../config/consts';
import type { InputFieldType } from '../hooks/useForm';

/*
 * Get the type of input by the name assigned to it from INPUT_FIELDS list.
 * (e.g., (fieldName: 'city') => 'text')
 */
const getInputTypeByName = (fieldName: InputFieldType) => {
  const field = INPUT_FIELDS.find(
    (inputField) => inputField.name === fieldName
  );
  return field ? field.type : null;
};

/*
 * Validates the input and returns an error (in key format to get its
 * translation in TRANSLATIONS file) if the value is not compatible.
 */
const validateInputField = (name: InputFieldType, value: string) => {
  let error = '';
  const type = getInputTypeByName(name);

  switch (type) {
    case 'text':
      if (!value.match(/^[a-zA-Z\s]+$/)) error = 'error_text';
      break;

    case 'email':
      if (!value.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/))
        error = 'error_email';
      break;

    case 'date':
      if (!value) error = 'error_date';
      break;

    case 'tel':
      if (!value.match(/^\d{9}$/)) error = 'error_tel';
      break;

    default:
      break;
  }

  return error;
};

export default validateInputField;
