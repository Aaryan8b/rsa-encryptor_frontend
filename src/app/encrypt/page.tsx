"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EncryptPage() {
  const [text, setText] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const encryptText = async () => {
    if (!text.trim()) return;
    setLoading(true);

    try {
      const response = await fetch("/api/encrypt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setCiphertext(data.ciphertext);
    } catch (error) {
      console.error("Encryption failed:", error);
      alert(`Failed to encrypt: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1c1c1c] text-white px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Encrypt Text with RSA
      </h1>

      <textarea
        className="w-full max-w-lg p-3 bg-[#2b2b2b] text-white border border-[#3a3a3a] rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none transition-opacity duration-500"
        rows={4}
        placeholder="Enter text to encrypt..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    <div className="flex gap-4 mt-6">
  {/* Back to Home Button */}
  <button
    className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg 
      bg-gray-800 bg-opacity-30 backdrop-blur-md border border-gray-600 
      hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-300 
      ease-in-out transform hover:scale-[1.07] active:scale-95"
    onClick={() => router.push("/")}
  >
    Back to Home
  </button>

  {/* Encrypt Button */}
  <button
    className="px-6 py-3 rounded-lg font-semibold text-white shadow-lg 
      bg-blue-600 bg-opacity-30 backdrop-blur-md border border-blue-500 
      hover:bg-blue-700 hover:bg-opacity-50 transition-all duration-300 
      ease-in-out transform hover:scale-[1.07] active:scale-95 disabled:opacity-50"
    onClick={encryptText}
    disabled={loading}
  >
    {loading ? "Encrypting..." : "Encrypt"}
  </button>
</div>

      {/* Ensure ciphertext is displayed when available */}
      {ciphertext && (
        <div
          className="mt-6 p-4 bg-[#2b2b2b] rounded-lg max-w-lg w-full text-sm break-all border 
          border-[#3a3a3a] shadow-inner transition-opacity duration-500 opacity-100"
        >
          <h2 className="font-semibold mb-2 text-gray-400">Encrypted Text:</h2>
          <p className="text-gray-300">{ciphertext}</p>
        </div>
      )}
    </div>
  );
}
