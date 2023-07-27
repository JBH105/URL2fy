import { useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import GlobalContext from "@/contexts/GlobalContext";
import { useRouter } from "next/router";

const navigation = [
  {
    name: "PDF To URL",
    href: "/pdf-to-url",
    current: false,
    accept: "application/pdf",
  },
  {
    name: "XLSX To URL",
    href: "/xlsx-to-url",
    current: false,
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    name: "DOC To URL",
    href: "/doc-to-url",
    current: false,
    accept: "application/msword",
  },
  {
    name: "DOCX To URL",
    href: "/docs-to-url",
    current: true,
    accept:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
  {
    name: "PPT To URL",
    href: "/ppt-to-url",
    current: false,
    accept: "application/vnd.ms-powerpoint",
  },
  {
    name: "PPTX To URL",
    href: "/pptx-to-url",
    current: false,
    accept:
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  },
  {
    name: "IMAGE To URL",
    href: "/image-to-url",
    current: false,
    accept: "image/*",
  },
];

export default function Header({ HandelSelectTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectTab, setSelectTab } = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    setSelectTab(navigation?.find((item) => item.href === router?.pathname));
  }, [router.pathname]);

  return (
    <header className="bg-white top-0 sticky z-[999] shadow-dark">
      <nav
        className="mx-auto flex container items-center justify-between px-6 h-[80px] lg:px-8 "
        aria-label="Global"
      >
        <a href="/" className="-m-1.5 p-1.5">
          {/* <span className="sr-only">Your Company</span> */}
          <img className="h-8 w-auto" src="/assets/Group1.svg" alt="" />
        </a>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden h-full items-center lg:flex lg:gap-x-12">
          {navigation.map((item) => {
            return (
              <div className="h-full relative items-center lg:flex">
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSelectTab(item)}
                  className={`text-sm group font-semibold leading-6 text-gray-900`}
                >
                  {item.name}
                </Link>
                <div
                  className={`${
                    item.name === selectTab?.name ? "w-full" : "w-0"
                  } absolute bottom-0 h-[2px] bg-gray-700`}
                >
                  {" "}
                </div>
              </div>
            );
          })}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              {/* <span className="sr-only">Your Company</span> */}
              <img className="h-8 w-auto" src="/assets/Group1.svg" alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setSelectTab(item);
                      setMobileMenuOpen(false);
                    }}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
