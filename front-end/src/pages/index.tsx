import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-col items-center justify-center">
        <h1>
          <span className="text-4xl font-bold text-indigo-600">
            Welcome to Car
          </span>
        </h1>
        <Link href="/cars/cars">Cars</Link>
        <Link href="/carsitters/carsitters">Carsitters</Link>
        <Link href="/calendars">Calendars</Link>
      </div>
    </main>
  );
}
