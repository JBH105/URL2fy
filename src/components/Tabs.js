import React, { useEffect, useState } from "react";
const tabs = [
  { name: "PDF To URL", href: "#", current: false, accept: "application/pdf" },
  {
    name: "XLSX To URL",
    href: "#",
    current: false,
    accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  },
  {
    name: "DOC To URL",
    href: "#",
    current: false,
    accept: "application/msword",
  },
  // {
  //   name: "DOCX To URL",
  //   href: "#",
  //   current: true,
  //   accept:
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  // },
  // {
  //   name: "PPT To URL",
  //   href: "#",
  //   current: false,
  //   accept: "application/vnd.ms-powerpoint",
  // },
  // {
  //   name: "PPTX To URL",
  //   href: "#",
  //   current: false,
  //   accept:
  //     "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  // },
  {
    name: "IMAGE To URL",
    href: "#",
    current: false,
    accept: "image/*",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Tabs = ({ setSelectTab, setCopyUrl, setUrl }) => {
  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    setSelectTab(tabs[0]);
  }, []);
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <div className="block w-full px-2 py-2 mb-3 rounded-md bg-gray-100 border-gray-300 ">
          <select
            id="tabs"
            name="tabs"
            className="block w-full bg-transparent focus:outline-none "
            defaultValue={tabs.find((tab) => tab.current)?.name}
            onClick={(e) => {
              const [name, accept, index] = e.target.value?.split(",");
              setSelectedTab(index + 1);
              setSelectTab({ name: name, accept: accept });
              setCopyUrl(false);
              setUrl("");
            }}
          >
            {tabs.map((tab, index) => {
              const newValue = `${tab.name},${tab.accept},${index}`;
              return <option value={newValue}>{tab.name}</option>;
            })}
          </select>
        </div>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              onClick={() => {
                setSelectedTab(index + 1);
                setSelectTab(tab);
                setCopyUrl(false);
                setUrl("");
              }}
              key={index}
              href={tab.href}
              className={classNames(
                selectedTab === index + 1
                  ? "bg-slate-500 text-white"
                  : "text-gray-500 hover:text-gray-700",
                "rounded-t-md px-3 py-2 text-sm font-medium"
              )}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
