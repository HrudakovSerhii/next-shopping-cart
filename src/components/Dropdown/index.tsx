import React, { FC, useState } from 'react';

type DropdownItem = {
    label: string,
    value?: number,
    href: string,
};

type DropdownProps = {
    title: string,
    items: DropdownItem[],
    selected: number,
};

const Dropdown: FC<DropdownProps> = ({
  title, items, selected,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative bg-indigo-100 z-10">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
      >
        <span>{title}</span>
        <svg className="w-4 h-4 ml-3 fill-current" viewBox="0 0 20 20">
          <path
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
            fillRule="evenodd"
          >
          </path>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute flex flex-col py-2 mt-1 text-gray-700 bg-white border rounded-lg">
          {items.map(({ label, href = '#' }) => (
            <a
              href={href}
              key={label}
              style={selected ? { backgroundColor: 'aliceblue' } : {}}
              className="px-3 py-1 hover:text-gray-800 focus:bg-indigo-700 focus:text-white"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
