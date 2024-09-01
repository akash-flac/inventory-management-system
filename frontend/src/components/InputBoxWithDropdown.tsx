// import { useState, useEffect, useRef } from "react";

// interface InputBoxWithDropdownProps {
//   dropdownValues: string[],
//   onInputValueChange: (value: string) => void,
//   placeholder: string,
//   [key: string]: any;
// }

// export default function InputBoxWithDropdown({
//   dropdownValues,
//   onInputValueChange,
//   placeholder,
//   ...props
// }: InputBoxWithDropdownProps) {
    
//   const [dropdownOptions, setDropdownOptions] = useState<string[]>(dropdownValues);
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [matchingDropdownOptions, setMatchingDropdownOptions] = useState<
//     string[]
//   >([]);

//   const [showSearchItemDropdown, setShowSearchItemDropdown] =
//     useState<boolean>(false);

//   // Based on searched item, update the itemName
//   useEffect(() => {
//     console.log("------------------------------");
//     console.log("Item Name:", searchValue);
//     setMatchingDropdownOptions([]);

//     const matchingItems: string[] = [];

//     console.log("starting loop");
//     dropdownOptions.map((dropdownOption) => {
//       if (dropdownOption.toLowerCase().includes(searchValue.toLowerCase())) {
//         if (!matchingItems.includes(dropdownOption)) {
//           console.log(dropdownOption);
//           matchingItems.push(dropdownOption);
//         }
//       }
//     });
//     console.log("ending loop");

//     // Update state with all matching items at once
//     setMatchingDropdownOptions(matchingItems);

//     console.log(`Matching Items : ${matchingItems}`);
//     console.log("+++++++++++++++++++++++++++++++");
//   }, [searchValue]);

//   const searchBarRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         searchBarRef.current &&
//         !searchBarRef.current.contains(event.target)
//       ) {
//         setShowSearchItemDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleKeyDown = (event, dropdownOption) => {
//     if (event.key === "Enter") {
//       setSearchValue(dropdownOption);
//       setShowSearchItemDropdown(false);
//     }
//   };

//   return (
//     <div className="bg-slate-600 h-screen w-screen flex justify-center items-center">
//       <div ref={searchBarRef}>
//         <Input
//           className="p-2 rounded-md"
//           type="text"
//           value={searchValue}
//           onChange={(e) => {
//             setShowSearchItemDropdown(true);
//             setSearchValue(e.target.value);
//             onInputValueChange(e.target.value)
//           }}
//           placeholder={placeholder}
//           {...props}
//         />
//         {showSearchItemDropdown && matchingDropdownOptions.length > 0 ? (
//           <div className="bg-slate-300">
//             <ul>
//               {matchingDropdownOptions.map((item, id) => {
//                 return (
//                   <li
//                     tabIndex={0}
//                     onKeyDown={(event) => handleKeyDown(event, item)}
//                     onClick={() => {
//                       console.log("onClick action happening!");
//                       setSearchValue(item);
//                       setShowSearchItemDropdown(false);
//                         onInputValueChange(item)

//                     }}
//                     key={id}
//                   >
//                     {item}
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         ) : (
//           <></>
//         )}
//       </div>
//     </div>
//   );
// }
