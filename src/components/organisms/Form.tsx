import { useContext } from 'react';
import { INPUT_FIELDS } from '../../config/consts';
import { LanguageContext } from '../../context/LanguageContext';
import useForm from '../../hooks/useForm';
import Button from '../atoms/Button';
import InputField from '../atoms/InputField';
import AnimateTextEffect from '../molecules/AnimateTextEffect';

function Form() {
  const { getTranslation } = useContext(LanguageContext);
  const {
    formData,
    errors,
    isSubmitButtonEnabled,
    handleChangeInput,
    handleSubmit,
  } = useForm();

  const onSubmit = () => {
    // eslint-disable-next-line no-alert
    alert(`Form submitted successfully: ${JSON.stringify(formData)}`);
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e, onSubmit)}>
      {INPUT_FIELDS.map(({ name, type }) => (
        <InputField
          key={name}
          id={name}
          type={type}
          value={formData[name]}
          error={errors[name] && getTranslation(errors[name]!)}
          onChange={handleChangeInput}
        >
          <AnimateTextEffect text={name} />
        </InputField>
      ))}

      <Button
        type="submit"
        className="btn--primary"
        disabled={!isSubmitButtonEnabled}
      >
        <AnimateTextEffect text="send" />
      </Button>
    </form>
  );
}

export default Form;
