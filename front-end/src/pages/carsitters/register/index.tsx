import { useForm, SubmitHandler } from "react-hook-form";
import carsitterService from "@/services/carsitterService";
import toast from "react-hot-toast";
import { ICarsitter } from "@/interfaces/carsitter";
import { useRouter } from "next/router";

export default function AddCarsitter() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICarsitter>();

  const onSubmit: SubmitHandler<ICarsitter> = (carsitterData) => {
    carsitterService
      .addCarsitter(carsitterData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Carsitter was added successfully!", {
            duration: 3000,
          });
          router.push("/carsitters");
        }
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Error adding carsitter!", { duration: 3000 });
      });
  };

  return (
    <div className="flex justify-center">
      <form
        className="mx-auto flex flex-col w-[50%] border-2 border-gray-300 p-5 m-5 items-center bg-gray-100 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Add Carsitter</h1>
        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("firstname", {
            required: { value: true, message: "This is required" },
          })}
          placeholder="First Name"
        />
        {errors.firstname && (
          <p className="text-red-600">First Name is required</p>
        )}
        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("lastname", {
            required: { value: true, message: "This is required" },
          })}
          placeholder="Last Name"
        />
        {errors.lastname && (
          <p className="text-red-600">Last Name is required</p>
        )}
        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("contactInfo", {
            required: { value: true, message: "This is required" },
          })}
          placeholder="Contact Info"
        />
        {errors.contactInfo && (
          <p className="text-red-600">Contact Info is required</p>
        )}
        <button
          type="submit"
          className="w-%[50] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Carsitter
        </button>
      </form>
    </div>
  );
}
