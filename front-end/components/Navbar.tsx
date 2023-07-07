const navigation = [
  { name: "Dashboard", href: {}, current: true },
  { name: "Cars", href: {}, current: false },
  { name: "Carsitters", href: {}, current: false },
  { name: "Calendar", href: {}, current: false },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
        <nav
          className="hidden lg:flex lg:space-x-8 lg:py-2"
          aria-label="Global"
        >
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                item.current
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                "inline-flex items-center rounded-md py-2 px-3 text-sm font-medium"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
