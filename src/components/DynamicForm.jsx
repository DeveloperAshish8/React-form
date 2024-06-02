import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const DynamicForm = ({ formData }) => {
  const initialValues = {
    hobbies: [],
  };
  const validationSchema = {};

  formData.forEach((field) => {
    initialValues[field.id] = "";
    let schema = Yup.string();
    if (field.id === "hobbies") {
      schema = Yup.array();
    }
    if (field.required) {
      schema = schema.required("required*");
    }
    if (field.regex) {
      schema = schema.matches(new RegExp(field.regex), "Invalid format");
    }
    validationSchema[field.id] = schema;
  });

  const formValidationSchema = Yup.object().shape(validationSchema);
  const formatFileFormats = (formats) =>
    formats.map((format) => `.${format}`).join(",");

  return (
    <div className="flex flex-col md:w-[550px] w-[90%] mx-auto my-10 bg-slate-100 px-7 py-3 rounded-xl">
      <div className="flex justify-center">
        <h3 className="text-xl font-bold my-5">FORM</h3>
      </div>

      <Formik
        initialValues={{
          ...initialValues,
          hobbies: [],
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values) => {
          console.log("Form Data:", values);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            {formData.map((field) => (
              <div key={field.id} className="flex gap-2 mt-5  ">
                <label
                  htmlFor={field.id}
                  className="w-40 text-base font-semibold"
                >
                  {field.name}
                </label>
                {field.type === "select" ? (
                  <Field
                    id={field.id}
                    name={field.id}
                    as="select"
                    multiple={field.multipleSelect}
                    className="border-[1px] border-[grey] rounded-lg px-3 py-1"
                  >
                    {field.options &&
                      field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </Field>
                ) : field.type === "radio" ? (
                  field.options.map((option) => (
                    <label key={option.value}>
                      <Field
                        type="radio"
                        name={field.id}
                        value={option.value}
                      />
                      {option.label}
                    </label>
                  ))
                ) : field.type === "checkbox" ? (
                  field.options.map((option) => (
                    <label key={option.value} className="ml-1">
                      <Field
                        type="checkbox"
                        name={field.id}
                        value={option.label}
                      />
                      {option.label}
                    </label>
                  ))
                ) : field.type === "file" ? (
                  <input
                    id={field.id}
                    name={field.id}
                    type="file"
                    accept={formatFileFormats(field.fileFormatSupported)}
                    onChange={(event) => {
                      setFieldValue(field.id, event.currentTarget.files[0]);
                    }}
                    className="border-[1px] border-[grey] rounded-lg px-3 py-1 md:w-60 w-40"
                  />
                ) : (
                  <Field
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    className="border-[1px] border-[grey] rounded-lg px-3 py-1"
                  />
                )}
                <ErrorMessage
                  name={field.id}
                  component="div"
                  className="text-red-600"
                />
              </div>
            ))}
            <div className="flex justify-center">
              <button
                type="submit"
                className=" items-center w-28 mt-10 px-3 py-2 bg-[grey] rounded-lg text-white"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DynamicForm;
