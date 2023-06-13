// import { useState } from "react";

// export const Footer = (props) => {
//   const [number, setNumber] = useState(0);
//   let price = 32;

//   return (
//     <div>
//       <input
//         type="number"
//         value={price}
//         onChange={(e) => {
//           price = e.target.value;
//           console.log({ price });
//           // setNumber(e.target.value);
//         }}
//       />
//       <p>Sum: {price * 2}</p>
//     </div>
//   );
// };

// const test = (value) => {
//   let internalValue = {
//     value,
//   };

//   const change = (newValue) => {
//     internalValue.value = newValue;
//     rerender();
//   };

//   return [internalValue, change];
// };

// const [value, onChange] = test(10);

// console.log(1, value);

// onChange(25);
// console.log(2, value);
