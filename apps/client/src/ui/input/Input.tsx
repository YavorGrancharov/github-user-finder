import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import { InputWrapper, StyledInput, StyledLabel } from "./Input.styles";

export type InputProps = {
  value: string;
  onChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  id?: string;
  name?: string;
  type?: "text" | "number" | "date" | "email" | "password";
  placeholderText?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      value,
      onChange,
      type,
      placeholderText,
      id,
      name,
      className,
      ...rest
    }: InputProps,
    ref
  ) => {
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
      onChange(ev);
    };

    return (
      <InputWrapper>
        {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
        <StyledInput
          {...rest}
          ref={ref}
          value={value}
          id={id}
          name={name}
          type={type}
          placeholder={placeholderText}
          onChange={handleChange}
          className={className}
        />
      </InputWrapper>
    );
  }
);

export default Input;
