const SubmitButton = ({ label, onClick, type = 'button', className = '' }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${className}`}
      >
        {label}
      </button>
    );
  };
  
  export default SubmitButton;
  