import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ICar } from "@/interfaces/car";
import { useRouter } from "next/router";
import carService from "@/services/carService";

export default function UpdateCar() {
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICar>();

  useEffect(() => {
    if (id) {
      carService
        .getCarById(id as string)
        .then((response) => {
          const car = response.data;
          setValue("brand", car.brand);
          setValue("model", car.model);
          setValue("immat", car.immat);
        })
        .catch(() => {
          toast.error("Error retrieving car!", { duration: 3000 });
        });
    }
  }, [id, setValue]);

  if (!id) {
    return <div>Loading...</div>;
  }

  const onSubmit: SubmitHandler<ICar> = (formData) => {
    if (id) {
      carService
        .updateCar(id as string, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Car was updated successfully!", { duration: 3000 });
            router.push("/cars");
          }
        })
        .catch((err) => {
          toast.error("Error updating car!", { duration: 3000 });
        });
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="mx-auto flex flex-col w-[50%] border-2 border-gray-300 p-5 m-5 items-center bg-gray-100 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Edit Car</h1>
        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("brand", {
            required: { value: true, message: "This is required" },
          })}
          placeholder="Brand"
        />
        {errors.brand && <p className="text-red-600">Brand is required</p>}

        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("model", {
            required: { value: true, message: "This is required" },
          })}
          placeholder="Model"
        />
        {errors.model && <p className="text-red-600">Model is required</p>}

        <input
          className="border-2 border-gray-300 p-2 m-5 rounded-lg w-3/4"
          {...register("immat", {
            required: { value: true, message: "This is required" },
          })}
          placeholder="Immatriculation"
        />
        {errors.immat && (
          <p className="text-red-600">Immatriculation is required</p>
        )}

        <button
          type="submit"
          className="w-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Car
        </button>
      </form>
    </div>
  );
}
