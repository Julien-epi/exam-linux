import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import carService from "@/services/carService";
import toast from "react-hot-toast";
import { ICar } from "@/interfaces/car";
import { useRouter } from "next/router";

export default function AddCar() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICar>();

  const onSubmit: SubmitHandler<ICar> = (carData) => {
    carService
      .addCar(carData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Car was added successfully!", { duration: 3000 });
          router.push('/cars');
        }
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Error adding car!", { duration: 3000 });
      });
  };

  return (
    <div className="flex justify-center">
      <form
        className="mx-auto flex flex-col w-[50%] border-2 border-gray-300 p-5 m-5 items-center bg-gray-100 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Add Car</h1>
        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("brand", { required: { value: true, message: "This is required" } })}
          placeholder="Brand"
        />
        {errors.brand && <p className="text-red-600">Brand is required</p>}
        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("model", { required: { value: true, message: "This is required" } })}
          placeholder="Model"
        />
        {errors.model && <p className="text-red-600">Model is required</p>}
        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("immat", { required: { value: true, message: "This is required" } })}
          placeholder="Immatriculation"
        />
        {errors.immat && <p className="text-red-600">Immatriculation is required</p>}
        <button
          type="submit"
          className="w-%[50] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Car
        </button>
      </form>
    </div>
  );
}
