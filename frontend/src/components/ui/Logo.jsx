import { RiFlashlightFill } from "@remixicon/react";
import React from "react";

const Logo = () => {
  return (
    <>
      <h1 className="flex items-center font-bold text-4xl italic">
        Med
        <span className="text-teal-500">
          <RiFlashlightFill size={30} />
        </span>
        o
      </h1>
    </>
  );
};

export default Logo;
