"use client";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { FaLocationDot, FaPaperPlane } from "react-icons/fa6";

export default function Footer() {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const formData = new FormData(e.target);

    try {
      const res = await fetch("https://formsubmit.co/stowave.store@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        e.target.reset(); 
        setSuccess(true);
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(true);
        setTimeout(() => setError(false), 5000);
      }
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <footer className="bg-[#383838] text-white">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        
        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <div className="flex items-start gap-3">
            <FaLocationDot className="text-2xl mt-1" />
            <div>
              <p className="mb-1">(+92)-329-0010-909</p>
              <p className="text-gray-300">stowave.store@gmail.com</p>
             
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Customer Support</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Policies</h2>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Refund & Exchange Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms And Service</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Stay Connected</h2>
          
          {/* Email Input with FormSubmit */}
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              className="w-full p-3 bg-[#eaeaea] text-black placeholder-gray-500 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-black px-5 flex items-center justify-center"
            >
              <FaPaperPlane className="text-white" />
            </button>
          </form>

          {/* Success & Error Messages */}
          {success && (
            <p className="text-green-400 mt-3">
              ✅ Thank you! Your email has been received.
            </p>
          )}
          {error && (
            <p className="text-red-400 mt-3">
              ❌ Failed to send email. Please try again.
            </p>
          )}

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6 text-xl">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaTiktok /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        ©2025. All Rights Reserved by Stowave. Developed by{" "}
        <span className="text-white">Stowave</span>
      </div>
    </footer>
  );
}




















// "use client";
// import { useState } from "react";
// import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
// import { FaLocationDot, FaPaperPlane } from "react-icons/fa6";

// export default function Footer() {
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(false);
//     const formData = new FormData(e.target);

//     try {
//       const res = await fetch("https://formsubmit.co/stowave.store@gmail.com", {
//         method: "POST",
//         body: formData,
//       });

//       if (res.ok) {
//         e.target.reset();
//         setSuccess(true);
//         setTimeout(() => setSuccess(false), 5000);
//       } else {
//         setError(true);
//         setTimeout(() => setError(false), 5000);
//       }
//     } catch (err) {
//       setError(true);
//       setTimeout(() => setError(false), 5000);
//     }
//   };

//   return (
//     <footer className="bg-[#383838] text-white">
//       <div className="container mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        
//         {/* Contact Us */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
//           <div className="flex items-start gap-3">
//             <FaLocationDot className="text-2xl mt-1" />
//             <div>
//               <p className="mb-1">(+92)-329-001-909</p>
//               <p className="text-gray-300">stowave.store@gmail.com</p>
//               <p className="text-gray-300">
//                 Shanghai Road, Al Maraj Market, Lahore
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
//           <ul className="space-y-2 text-gray-300">
//             <li><a href="#">About Us</a></li>
//             <li><a href="#">Contact Us</a></li>
//             <li><a href="#">Careers</a></li>
//             <li><a href="#">Customer Support</a></li>
//           </ul>
//         </div>

//         {/* Policies */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Policies</h2>
//           <ul className="space-y-2 text-gray-300">
//             <li><a href="#">Shipping Policy</a></li>
//             <li><a href="#">Refund & Exchange Policy</a></li>
//             <li><a href="#">Privacy Policy</a></li>
//             <li><a href="#">Terms And Service</a></li>
//           </ul>
//         </div>

//         {/* Stay Connected */}
//         <div>
//           <h2 className="text-lg font-semibold mb-4">Stay Connected</h2>
          
//           {/* Email + Message Form */}
//           <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//             <input
//               type="text"
//               name="name"
//               placeholder="Your name"
//               className="w-full p-3 bg-[#eaeaea] text-black placeholder-gray-500 outline-none"
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Your email address"
//               className="w-full p-3 bg-[#eaeaea] text-black placeholder-gray-500 outline-none"
//               required
//             />
//             <textarea
//               name="message"
//               placeholder="Write your message..."
//               className="w-full p-3 bg-[#eaeaea] text-black placeholder-gray-500 outline-none h-24 resize-none"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-black px-5 py-3 flex items-center justify-center gap-2"
//             >
//               <FaPaperPlane className="text-white" /> Send
//             </button>
//           </form>

//           {/* Success & Error Messages */}
//           {success && (
//             <p className="text-green-400 mt-3">
//               ✅ Thank you! Your message has been sent.
//             </p>
//           )}
//           {error && (
//             <p className="text-red-400 mt-3">
//               ❌ Failed to send message. Please try again.
//             </p>
//           )}

//           {/* Social Icons */}
//           <div className="flex space-x-4 mt-6 text-xl">
//             <a href="#"><FaFacebookF /></a>
//             <a href="#"><FaInstagram /></a>
//             <a href="#"><FaYoutube /></a>
//             <a href="#"><FaTiktok /></a>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
//         ©2025. All Rights Reserved by Stowave. Developed by{" "}
//         <span className="text-white">Stowave.Store</span>
//       </div>
//     </footer>
//   );
// }
