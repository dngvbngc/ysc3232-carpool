import { lusitana } from "@/app/ui/fonts";
import React from "react";
import Image from "next/image";

export default function CarpoolLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src='/carpool-logo.png'
        alt='Carpool Logo'
        width={50}
        height={50}
      />
      <p className='text-[44px]' style={{ paddingLeft: "5px" }}>
        Carpool
      </p>
    </div>
  );
}
