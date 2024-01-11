const CustomButton = ({
  title,
  containerStyles,
  iconRight,
  type,
  onClick,
}: {
  title: string;
  type?: string | any;
  onClick?: () => {};
  containerStyles?: any;
  iconRight?: any;
}) => {
  return (
    <button
      onClick={onClick}
      type={type || "button"}
      className={`inline-flex items-center text-base ${containerStyles}`}
    >
      {title}

      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  );
};

export default CustomButton;
