import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import { menuList } from "@/constants";
import { ChevronDown } from "lucide-react";

function Menu() {
  return (
    <div className=" px-1">
      {menuList.map((menuGroup, index: number) => (
        <div key={index}>
          <MenuHeading heading={menuGroup.group} />
          {menuGroup.items.map((menuItem, index: number) => (
            <MenuItem key={index} item={menuItem} />
          ))}
        </div>
      ))}
    </div>
  );
}

interface SubItemProps {
  link: string;
  icon: React.ReactNode; // Use React.ReactNode for any valid JSX content
  text: string;
}


function MenuSubItem({ link, icon, text }: SubItemProps) {
  return (
    <NavLink
      to={link}
      // className="flex row items-center gap-2 px-2 text-sm p-1.5 rounded hover:bg-slate-100 hover:cursor-pointer"
      className={( { isActive }) => 
        isActive 
          ? "flex row items-center gap-2 px-2 text-sm p-1.5 rounded bg-slate-200 hover:cursor-default" 
          : "flex row items-center gap-2 px-2 text-sm p-1.5 rounded hover:bg-slate-100 hover:cursor-pointer"
      }
    >
      {icon}
      {text}
    </NavLink>
  );
}

interface Item {
  link: string;
  icon: React.ReactNode; // Use React.ReactNode for any valid JSX content
  text: string;
  subItems?: SubItem[]; // Optional array of subItems
}

interface SubItem {
  link: string;
  icon: React.ReactNode; // Use React.ReactNode for any valid JSX content
  text: string;
}

function MenuItem({ item }: { item: Item }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {item.link ? ( // Wrap with NavLink only if link exists
        <NavLink
          to={item.link}
          className={({ isActive }) =>
            isActive
              ? "flex row items-center gap-2 px-2 text-sm p-1.5 rounded bg-slate-200 hover:cursor-default "
              : "flex row items-center gap-2 px-2 text-sm p-1.5 rounded hover:bg-slate-100 hover:cursor-pointer"
          }
        >
          {item.icon}
          {item.text}
        </NavLink>
      ) : (
        <div className="flex flex-row items-baseline justify-between rounded hover:bg-slate-100 hover:cursor-pointer"
        onClick={toggleSubMenu} // Click handler for items without links
        >
        <div className="flex row items-center gap-2 px-2 text-sm p-1.5" >
          {item.icon}
          {item.text}
        </div>
        
        <div>
        {isOpen ? <ChevronDown className="self-end transform rotate-180"/> : <ChevronDown className="self-end"/>}
        </div>
        </div>
        
      )}

      {/* This Opens the Submenu/Dropdown */}
      {isOpen && item.subItems && (
        <div className="ml-8">
          {item.subItems.map((subItem, index: number) => (
            <div key={index}>
              <MenuSubItem
                link={subItem.link}
                icon={subItem.icon}
                text={subItem.text}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuHeading({ heading }: { heading: string }) {
  return (
    <div className="p-1 text-xs font-medium text-color text-slate-500">
      {heading}
    </div>
  );
}

export default Menu;
