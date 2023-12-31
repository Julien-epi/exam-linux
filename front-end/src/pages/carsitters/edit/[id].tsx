import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ICarsitter } from "@/interfaces/carsitter";
import { useRouter } from "next/router";
import carsitterService from "@/services/carsitterService";

export default function UpdateCarsitter() {
  const router = useRouter();
  const { id } = router.query;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICarsitter>();

  useEffect(() => {
    if (id) {
      carsitterService
        .getCarsitterById(id as string)
        .then((response) => {
          const carsitter = response.data;
          setValue("firstname", carsitter.firstname);
          setValue("lastname", carsitter.lastname);
          setValue("contactInfo", carsitter.contactInfo);
        })
        .catch(() => {
          toast.error("Error retrieving carsitter!", { duration: 3000 });
        });
    }
  }, [id, setValue]);

  if (!id) {
    return <div>Loading...</div>;
  }

  const onSubmit: SubmitHandler<ICarsitter> = (formData) => {
    if (id) {
      carsitterService
        .updateCarsitter(id as string, formData)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Carsitter was updated successfully!", {
              duration: 3000,
            });
            router.push("/carsitters");
          }
        })
        .catch((err) => {
          toast.error("Error updating carsitter!", { duration: 3000 });
        });
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="mx-auto flex flex-col w-[50%] border-2 border-gray-300 p-5 m-5 items-center bg-gray-100 rounded-lg shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold">Edit Carsitter</h1>
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
          className="w-3/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Carsitter
        </button>
      </form>
    </div>
  );
}
