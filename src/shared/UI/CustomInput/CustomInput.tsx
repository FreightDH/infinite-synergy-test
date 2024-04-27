import type { ChangeEvent, ComponentProps, FC, ReactElement } from 'react';

import cl from './CustomInput.module.scss';

interface CustomInputProps extends ComponentProps<'input'> {
  name: string;
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const CustomInput: FC<CustomInputProps> = ({
  name,
  label,
  value,
  setValue,
  ...props
}): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <label className={cl.label} htmlFor={name}>
      <div>{label}</div>
      <input
        className={cl.input}
        id={name}
        placeholder={value ? '' : 'Не указано'}
        type="text"
        value={value}
        onChange={handleChange}
        {...props}
      />
    </label>
  );
};
