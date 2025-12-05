"use client";
import { useState, useEffect } from "react";

export default function PdfPage() {
  const pdfFile = "/misbah book pdf (1)-compressed.pdf";
//   const pdfFile = "/misbah book pdf (1).zip";

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const [startCountdown, setStartCountdown] = useState(false);

  const correctPassword = "13919218";

  // Reset everything (Both popups close)
  const closeAllPopups = () => {
    setShowPasswordModal(false);
    setPasswordCorrect(false);
    setStartCountdown(false);
    setPasswordInput("");
    setCountdown(7);
  };

  // Countdown logic
  useEffect(() => {
    let timer;
    if (startCountdown && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }

    if (countdown === 0) {
      triggerDownload();
    }

    return () => clearTimeout(timer);
  }, [startCountdown, countdown]);

  const triggerDownload = () => {
    const link = document.createElement("a");
    link.href = pdfFile;
    link.download = "download.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === correctPassword) {
      setPasswordCorrect(true);
      setStartCountdown(true);
    } else {
      alert("❌ Wrong Password!");
    }
  };

  const handleBackgroundClick = () => {
    if (countdown === 0) {
      closeAllPopups();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">

      <h1 className="text-3xl font-bold mb-6 text-gray-800">PDF Viewer Panel</h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">

        <button
          onClick={() => window.open(pdfFile, "_blank")}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4"
        >
          View PDF
        </button>

        <button
          onClick={() => setShowPasswordModal(true)}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      {/* Password Modal */}
      {showPasswordModal && !passwordCorrect && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">

            <h2 className="text-xl font-semibold mb-4">Enter Password</h2>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border p-2 rounded mb-4"
              onChange={(e) => setPasswordInput(e.target.value)}
            />

            <button
              onClick={handlePasswordSubmit}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>

            <button
              onClick={closeAllPopups}
              className="w-full mt-3 bg-gray-400 text-white py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* Success + Countdown Modal */}
      {passwordCorrect && (
        <div
          onClick={handleBackgroundClick}
          className="fixed inset-0 bg-black/50 flex items-center justify-center"
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-80 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeAllPopups}
              className="absolute right-3 top-2 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold mb-3 text-green-700">
              Your download is ready!
            </h2>

            <p className="text-lg font-semibold mb-4">
              Download starting in{" "}
              <span className="text-red-600">{countdown}</span> seconds...
            </p>

            <button
              onClick={triggerDownload}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Re-launch Download
            </button>
          </div>
        </div>
      )}

      {/* ⭐⭐⭐ ADVERTISEMENT SECTION (Stowave) ⭐⭐⭐ */}
      <div className="mt-12 w-full max-w-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-xl p-6 text-center">

        <h2 className="text-2xl font-bold mb-2">🔥 Stowave — Premium Fashion Store</h2>

        <p className="text-sm mb-4 opacity-90">
          Upgrade your style with our latest streetwear, oversized tees, and premium drops.
        </p>

        <button
          onClick={() => window.location.href = "/"}  // <-- Yaha apna home page link laga sakte ho
          className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Shop Now →
        </button>

      </div>
      {/* END ADVERTISEMENT */}
    </div>
  );
}



