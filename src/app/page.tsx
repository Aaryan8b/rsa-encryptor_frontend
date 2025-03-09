"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <div className="bg-[#1c1c1c] min-h-screen flex flex-col items-center justify-center text-white px-6">
      <h1 className="text-4xl font-bold mb-8 text-center animate-fadeIn">
        Welcome to RSA Encryptor
      </h1>

      <div className="flex flex-col space-y-6 w-full max-w-xs">
        <AnimatedButton label="Encrypt with RSA" bgColor="bg-blue-600" route="/encrypt" />
        <AnimatedButton label="Decrypt with RSA" bgColor="bg-green-600" route="/decrypt" />
        <AnimatedButton label="View RSA Keys" bgColor="bg-gray-700" route="/keys" />
      </div>
    </div>
  );
}

const AnimatedButton = ({
  label,
  bgColor,
  route,
}: {
  label: string;
  bgColor: string;
  route: string;
}) => {
  const router = useRouter();

  return (
    <button
      className={`px-6 py-3 ${bgColor} rounded-lg text-lg font-semibold w-full 
        transition-transform duration-300 ease-in-out transform hover:scale-105 
        hover:shadow-lg active:scale-95`}
      onClick={() => router.push(route)}
    >
      {label}
    </button>
  );
};
