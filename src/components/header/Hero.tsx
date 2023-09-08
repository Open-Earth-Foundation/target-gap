import { ReactNode } from "react";
import Image from "next/image";

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <Image
        src="/images/earth.png"
        alt="Picture of the earth taken from space"
        fill
        className="absolute inset-0 object-cover"
      />
      <div className="relative z-10 p-16 pb-36 max-w-[1440px] mx-auto">
        <h1 className="text-3xl font-bold pb-3">
          <span className="text-[#008600]">DIGS</span>{" "}
          <span className="text-white">Analytics</span>
        </h1>
        <p className="mb-12 text-white">
          Using data available at OpenClimate, we&apos;ve conducted a Digitally
          Enabled Independent Global Stocktake exercise to spotlight the
          alignment and gaps between climate targets and actions of nations,
          regions, and cities.
          <br />
          <br />
          Join us at OpenClimate for collaborative efforts towards an informed
          global climate response.
        </p>
        {children}
      </div>
    </div>
  );
}
