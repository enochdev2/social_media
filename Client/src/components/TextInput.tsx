
// const TextInput = React.forwardRef(
const TextInput = (
  (
    {
      type,
      placeholder,
      styles,
      label,
      labelStyles,
      register,
      name,
      error,
    }: {
      type?: any,
      placeholder?: any,
      styles?:any,
      label?:any,
      labelStyles?:any,
      register?:any,
      name?:any,
      error?:any,
    },
    ref:any
  ) => {

    //  const checked = error ? true : false
    return (
      <div className="w-full flex flex-col mt-2">
        {label && (
          <p className={`text-ascent-2 text-sm mb-2 ${labelStyles}`}>{label}</p>
        )}

        <div>
          <input
          title="input"
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            className={`bg-secondary rounded border border-[#66666690] outline-none text-sm text-ascent-1 px-4 py-3 placeholder:text-[#666] ${styles}`}
            {...register}
            // aria-invalid = {checked}
          />
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5 ">{error}</span>
        )}
      </div>
    );
  }
);

export default TextInput;
