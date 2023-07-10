import React, { useEffect, useState } from "react";
import carsitterService from "@/services/carsitterService";
import { ICarsitter } from "@/interfaces/carsitter";
import Link from "next/link";
import { FaTrash, FaEdit } from "react-icons/fa";

function Carsitters() {
  const [carsitters, setCarsitters] = useState<ICarsitter[]>([]);

  useEffect(() => {
    const fetchCarsitters = async () => {
      try {
        const response = await carsitterService.getAllCarsitters();
        setCarsitters(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCarsitters();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await carsitterService.deleteCarsitter(id);
      setCarsitters(carsitters.filter((carsitter) => carsitter._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-10 overflow-x-auto rounded-lg border border-gray-200">
      <h1 className="text-base font-semibold leading-6 text-gray-900">CARSITTERS</h1>
      <Link href="/carsitters/register">
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Carsitter
        </button>
      </Link>
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              First Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Last Name
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Contact Info
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {carsitters.map((carsitter, index) => (
            <tr key={index}>
              <td className="text-center whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {carsitter.firstname}
              </td>
              <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                {carsitter.lastname}
              </td>
              <td className="text-center whitespace-nowrap px-4 py-2 text-gray-700">
                {carsitter.contactInfo}
              </td>
              <td className="text-center whitespace-nowrap px-4 py-2">
                <Link href={`/carsitters/edit/${carsitter._id}`}>
                  <FaEdit className="inline-block text-blue-500 hover:text-blue-700" />
                </Link>
                <FaTrash
                  className="inline-block text-red-500 hover:text-red-700 ml-4 cursor-pointer"
                  onClick={() => handleDelete(carsitter._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Carsitters;
