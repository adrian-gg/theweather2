import { useCallback, useEffect, useState } from 'react';
import { INPUT_FIELDS } from '../config/consts';
import validateInputField from '../utils/validateInputField';

export type InputFieldType = (typeof INPUT_FIELDS)[number]['name'];

type DefaultFormValuesType = {
  [key in InputFieldType]: string;
};

const defaultFormValues: DefaultFormValuesType = INPUT_FIELDS.reduce(
  (acc, field) => ({ ...acc, [field.name]: '' }), // { name: '', email: '', ... }
  {} as DefaultFormValuesType
);

function useForm() {
  const [formData, setFormData] = useState(defaultFormValues);
  const [errors, setErrors] = useState<DefaultFormValuesType>(
    {} as DefaultFormValuesType
  );
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);

  // Check if all fields are filled in
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ''
    );
    setIsSubmitButtonEnabled(allFieldsFilled);
  }, [formData]);

  const updateFormData = useCallback((name: InputFieldType, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }, []);

  const clearFieldError = useCallback((name: InputFieldType) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  }, []);

  const handleChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const fieldName = name as InputFieldType;

      updateFormData(fieldName, value);

      if (errors[fieldName]) clearFieldError(fieldName);
    },
    [errors, updateFormData, clearFieldError]
  );

  const validateForm = () => {
    const validationErrors: DefaultFormValuesType = {} as DefaultFormValuesType;
    let hasErrors = false;

    INPUT_FIELDS.forEach(({ name }) => {
      const error = validateInputField(name, formData[name]);
      if (error) {
        validationErrors[name] = error;
        hasErrors = true;
      }
    });

    setErrors(validationErrors);
    return !hasErrors;
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    callback: () => void
  ) => {
    e.preventDefault();

    if (validateForm()) {
      callback();
      setFormData(defaultFormValues); // Reset form
    }
  };

  return {
    formData,
    errors,
    isSubmitButtonEnabled,
    handleChangeInput,
    handleSubmit,
  };
}

export default useForm;
