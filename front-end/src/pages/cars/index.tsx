import React, { useEffect, useState } from "react";
import carService from "@/services/carService";
import { ICar } from "@/interfaces/car";
import Link from "next/link";
import { FaTrash, FaEdit } from "react-icons/fa";

function Cars() {
  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await carService.getAllCars();
        setCars(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCars();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await carService.deleteCar(id);
      setCars(cars.filter((car) => car._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="m-10 overflow-x-auto rounded-lg border border-gray-200">
      <h1 className="text-base font-semibold leading-6 text-gray-900">CARS</h1>
      <Link href="/cars/register">
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Car
        </button>
      </Link>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Brand
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Model
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Immatriculation
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {cars.map((car, index) => (
            <tr key={index}>
              <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {car.brand}
              </td>
              <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                {car.model}
              </td>
              <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                {car.immat}
              </td>
              <td className="text-center whitespace-nowrap px-4 py-2">
                <Link href={`/cars/edit/${car._id}`}>
                  <FaEdit className="inline-block text-blue-500 hover:text-blue-700" />
                </Link>
                <FaTrash
                  className="inline-block text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                  onClick={() => handleDelete(car._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cars;
