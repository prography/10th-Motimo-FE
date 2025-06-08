import { ReactNode } from "react";

const Test = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <button className="bg-gray-300">{children}</button>
    </>
  );
};
export default Test;
