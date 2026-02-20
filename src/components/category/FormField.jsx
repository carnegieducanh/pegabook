import { Controller } from "react-hook-form";

// eslint-disable-next-line react/prop-types
const FormField = ({ control, labe, name, Component }) => {
  return (
    <div>
      <p className="mb-1 font-bold">{labe}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => {
          return (
            <Component
              name={name}
              value={value}
              onChange={onChange}
              control={control}
            />
          );
        }}
      />
    </div>
  );
};
export default FormField;
