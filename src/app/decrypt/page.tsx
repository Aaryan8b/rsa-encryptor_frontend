"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DecryptPage() {
  const [ciphertext, setCiphertext] = useState("");
  const [plaintext, setPlaintext] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const decryptText = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/decrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ciphertext }),
      });

      if (!response.ok) throw new Error("Failed to decrypt");

      const data = await response.json();
      setPlaintext(data.plaintext);
    } catch (error) {
      console.error("Decryption failed:", error);
      setPlaintext("Decryption failed. Invalid ciphertext.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1c1c] text-white px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">RSA Decryption</h1>

      <textarea
        className="w-full max-w-md p-3 bg-[#2b2b2b] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
        placeholder="Enter ciphertext"
        value={ciphertext}
        onChange={(e) => setCiphertext(e.target.value)}
      />
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
            onClick={decryptText}
            disabled={loading}
          >
            {loading ? "Decrypting..." : "Decrypt"}
        </button>
        </div>
      {plaintext && (
        <p className="mt-6 p-4 bg-[#2b2b2b] rounded-lg max-w-lg w-full text-sm break-all border border-[#3a3a3a] shadow-inner text-gray-300">
          {plaintext}
        </p>
      )}
    </div>
  );
}
