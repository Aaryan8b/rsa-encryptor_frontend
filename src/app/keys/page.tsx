"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function KeysPage() {
  const [keys, setKeys] = useState<{ private_key: string; public_key: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchKeys = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/get_keys");
      if (!response.ok) throw new Error("Failed to fetch keys");
      const data = await response.json();
      setKeys(data);
    } catch (error) {
      console.error("Failed to fetch keys:", error);
      alert(`Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1c1c] text-white px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">RSA Key</h1>
      <div className="flex gap-4 mt-6">
        <button
            className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg 
            bg-gray-800 bg-opacity-30 backdrop-blur-md border border-gray-600 
            hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-300 
            ease-in-out transform hover:scale-[1.07] active:scale-95"
            onClick={() => router.push("/")}
        >
            Back to Home
        </button>
        <button
            className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg 
            bg-blue-600 bg-opacity-30 backdrop-blur-md border border-blue-500 
            hover:bg-blue-700 hover:bg-opacity-50 transition-all duration-300 
            ease-in-out transform hover:scale-[1.07] active:scale-95 disabled:opacity-50"
            onClick={fetchKeys}
            disabled={loading}
        >
            {loading ? "Fetching Keys..." : "View Keys"}
        </button>
        </div>

      {keys && (
        <div className="mt-6 p-4 bg-[#2b2b2b] rounded-lg max-w-5xl w-full text-xs break-all border border-[#3a3a3a] shadow-inner">
          <h2 className="font-semibold mb-2 text-gray-400">🔑 Public Key:</h2>
          <p className="text-gray-300">{keys.public_key}</p>

          <h2 className="font-semibold mt-4 mb-2 text-gray-400">🔒 Private Key:</h2>
          <p className="text-gray-300">{keys.private_key}</p>
        </div>
      )}
</div>
  );
}
