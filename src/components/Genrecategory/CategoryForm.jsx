import { useEffect } from "react";
import { useForm } from "react-hook-form";

import FormField from "./FormField";
import GenresCategory from "./GenresCategory";
import useFetch from "../../hooks/useFetch";

// eslint-disable-next-line react/prop-types
const CategoryForm = ({ setSearchFormValues }) => {
  const { handleSubmit, watch, control } = useForm({
    defaultValues: { genres: [] },
  });

  const { data } = useFetch({ url: `/all-books` }, { enabled: true });

  const formValues = watch();

  useEffect(() => {
    const idsToSearch =
      Array.isArray(formValues.genres) && formValues.genres.length > 0
        ? formValues.genres
        : data;

    setSearchFormValues({
      ...formValues,
      genres: idsToSearch || [], // Đảm bảo genres luôn là một mảng
    });
  }, [JSON.stringify(formValues), data, setSearchFormValues]);

  const onSubmit = (data) => {
    console.log("dataform", JSON.stringify(data));
  };

  return (
    <div className="mb-10 py-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="genres"
          label="Genres"
          control={control}
          Component={GenresCategory}
        />
      </form>
    </div>
  );
};

export default CategoryForm;
