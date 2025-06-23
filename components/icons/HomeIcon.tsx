import React from "react";
import Image from "next/image";

interface HomeIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  className?: string;
}

export const HomeIcon = ({
  color = "#8A949E",
  className,
  ...props
}: HomeIconProps) => {
  return (
    <Image
      src="/home.svg"
      alt=""
      className="home"
      style={{ color: "#8A949E" }}
    />
  );
};

export default HomeIcon;
