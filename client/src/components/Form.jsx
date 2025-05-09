import InputField from './InputField';
import SubmitButton from './SubmitButton';

const Form = ({ inputs, buttonLabel, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {inputs.map((input, index) => (
        <InputField
          key={index}
          type={input.type}
          name={input.name}
          value={input.value}
          onChange={input.onChange}
          placeholder={input.placeholder}
          required={input.required}
        />
      ))}
        <SubmitButton label={buttonLabel} type="submit" className="w-full p-2 mt-4" />
    </form>
  );
};

export default Form;
