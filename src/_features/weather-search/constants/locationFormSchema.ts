import * as yup from "yup";

export const locationFormSchema = yup
  .object({
    id: yup
      .string()
      .trim()
      .default("")
      .required("Please enter a town, city or postal code"),
    latitude: yup.number().default(0).required(),
    longitude: yup.number().default(0).required(),
    timezone: yup.string().trim().default("").required(),
  })
  .required();

export type LocationFormSchema = yup.InferType<typeof locationFormSchema>;
