import InputField from './InputField'; 
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
        <button type="submit" className="px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition duration-200 ease-in-out">
          {buttonLabel}
        </button>
      </div>
    </form>
  );
};

export default Form;