interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export default function InputText({ label, id, ...props }: InputTextProps) {
  return (
    <>
      <label htmlFor={id} className="mb-4">
        {label}
      </label>
      <input
        {...props}
        className="mb-4 p-2 border border-[#bf5baa5c] rounded-full"
        type="text"
        id={id}
      />
    </>
  );
}
