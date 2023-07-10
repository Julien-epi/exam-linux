import Link from "next/link";

export default function Navbar() {
  return (
    <div className="sticky top-0 z-10 pb-12">
    <div className="mx-auto px-2 bg-primary sm:px-4 lg:px-8 shadow-lg py-2">
      <div className="relative flex items-center justify-between h-16">
        <div className="md:flex items-center lg:px-0 flex-1">
          <Link href="/">
            <h1>Home</h1>
          </Link>
        </div>
        <div className="hidden md:flex items-center flex-1 justify-evenly mx-6 ">
            <Link href="/cars">
              <h1 className="mx-6">Cars</h1>
            </Link>
          
            <Link href="/carsitters">
              <h1 className="mx-6">Carsitters</h1>
            </Link>
          
            <Link href="/planning">
              <h1 className="mx-6">Planning</h1>
            </Link>
        </div>
      </div>
    </div>
  </div>
  );
}
