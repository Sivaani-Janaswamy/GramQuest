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
      <div className="flex justify-center">
        <SubmitButton label={buttonLabel} type="submit" />
      </div>
    </form>
  );
};

export default Form;
