import { ReactNode } from "react";

interface TestProps {
  /**discription입니다*/
  children: ReactNode;
}

const Test = ({ children }: TestProps) => {
  return (
    <>
      <button className="bg-gray-300">{children}</button>
    </>
  );
};
export default Test;
