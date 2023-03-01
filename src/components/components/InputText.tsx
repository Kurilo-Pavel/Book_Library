type InputTextProps = {
  labelText: string;
  value: string;
  setValue: (value: string) => void;
}

const InputText = ({labelText, value, setValue}: InputTextProps) => {

  return (
    <label>{labelText}
      <input
        type="text"
        onChange={(e) => {
          setValue(e.target.value)
        }}
        value={value}
      />
    </label>
  );
};
export default InputText;