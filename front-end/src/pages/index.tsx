import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex flex-col items-center justify-center">
        <h1>
          <span className="text-4xl font-bold text-indigo-600">
            Welcome to Car Store
          </span>
        </h1>
      </div>
    </main>
  );
}
