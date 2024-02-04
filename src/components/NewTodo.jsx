import React from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../services/apiconnector";
import { endpoints } from "../services/apis";

const NewTodo = () => {
  const {
    register,
    handleSubmit,
    reset, // Add reset function from useForm
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const res = await apiConnector("POST", endpoints.CREATE_TODO_API, data);
      console.log(res);
      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <div className="max-w-[1080px] mx-auto mt-2 lg:mt-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-1/2 mx-auto gap-2 border rounded-lg shadow-lg p-6"
      >
        <label htmlFor="title">Title</label>
        <input
          placeholder="Enter Title Here"
          {...register("title", {
            required: "Please enter title",
          })}
          className="p-2 border-2 rounded-lg"
        />
        {errors.title && (
          <p className=" text-red-500">{errors.title.message}</p>
        )}

        <label htmlFor="description">Description</label>
        <input
          placeholder="Enter Description Here"
          {...register("description", {
            required: "Please enter decription",
          })}
          className="p-2 border-2 rounded-lg"
        />
        {errors.description && (
          <p className=" text-red-500">{errors.description.message}</p>
        )}

        <button
          type="submit"
          className="border-1 mt-2 w-1/2 mx-auto bg-slate-500 text-white p-2 rounded-lg hover:bg-slate-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewTodo;
