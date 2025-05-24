import { ReactNode } from "react";

const Test = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <button>{children}</button>
    </>
  );
};
export default Test;
