const InputField = ({ type, name, value, onChange, placeholder, required = false }) => {
    return (
      <div className="mb-4">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded-md"
          required={required}
        />
      </div>
    );
  };
  
  export default InputField;
  