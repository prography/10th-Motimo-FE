import { InputHTMLAttributes } from "react";
// import CheckSvg from "../public/check.svg";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;
const Checkbox = ({ ...props }: CheckboxProps) => {
  return (
    <>
      <input
        className={`
         ${`appearance-none w-4 h-4 relative bg-background-alternative rounded outline-[1.50px] outline-offset-[-1.50px]  outline-Color-gray-20 overflow-hidden 
            checked:bg-center
         checked:bg-background-primary 
         checked:outline-0
         checked:bg-[url("data:image/svg+xml,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M3.58325%207.27735L6.08343%209.77734L11.0833%204.77734%22%20stroke%3D%22white%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E")]
            ${props.className ?? ""}`}
            `}
        type="checkbox"
        {...props}
      />
    </>
  );
};
export default Checkbox;
