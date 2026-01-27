// "use client";

// import React, { useState, useEffect } from "react";
// import { FiPlus, FiX } from "react-icons/fi";

// const API_BASE =
//   process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

// export default function AddProductsPage() {
//   const [category, setCategory] = useState("all");
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     originalPrice: "",
//     discount: "",
//     stock: true,
//     image: null,
//     category: "regular-tshirts",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const categories = ["all", "regular-tshirts", "oversize-tshirts", "swage-shirts"];

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async (cat = category) => {
//     try {
//       let url = `${API_BASE}/api/products`;
//       if (cat && cat !== "all") url += `?category=${cat}`;

//       const res = await fetch(url);
//       const data = await res.json();

//       let list = Array.isArray(data)
//         ? data
//         : Array.isArray(data.products)
//         ? data.products
//         : [];

//       // --- SwagShirts-style normalization ---
//       const normalized = list.map((item) => ({
//         _id: item._id || item.id,
//         title: item.title || item.name,
//         price: item.price,
//         originalPrice: item.originalPrice || item.oldPrice || item.original_price,
//         discount: item.discount || "0",
//         stock: item.stock ?? true,
//         image: item.image?.startsWith("http")
//           ? item.image
//           : `${API_BASE}/uploads/${item.image}`,
//         category: item.category,
//         description: item.description || "No description available",
//       }));

//       setProducts(normalized);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setProducts([]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "file") setFormData({ ...formData, [name]: files[0] });
//     else if (type === "checkbox") setFormData({ ...formData, [name]: checked });
//     else setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value !== null) payload.append(key, value);
//     });

//     try {
//       let url = `${API_BASE}/api/products`;
//       const method = editingId ? "PUT" : "POST";
//       if (editingId) url += `/${editingId}`;

//       const res = await fetch(url, { method, body: payload });
//       if (!res.ok) throw new Error("Failed to save product");

//       await fetchProducts();
//       setFormData({
//         title: "",
//         price: "",
//         originalPrice: "",
//         discount: "",
//         stock: true,
//         image: null,
//         category: "regular-tshirts",
//       });
//       setEditingId(null);
//       setShowForm(false);
//     } catch (err) {
//       console.error(err);
//       alert("Error saving product");
//     }
//   };

//   const handleEdit = (product) => {
//     setFormData({
//       title: product.title,
//       price: product.price,
//       originalPrice: product.originalPrice,
//       discount: product.discount,
//       stock: product.stock,
//       image: null,
//       category: product.category,
//     });
//     setEditingId(product._id);
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;
//     try {
//       const res = await fetch(`${API_BASE}/api/products/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Failed to delete product");
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting product");
//     }
//   };

//   return (
//     <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-indigo-700 text-center">
//         Products Management
//       </h1>

//       {/* Category Tabs + Add Button */}
//       <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 items-center">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition ${
//               category === cat
//                 ? "bg-indigo-600 text-white shadow-lg"
//                 : "bg-white border border-gray-300 text-gray-600 hover:bg-indigo-50"
//             }`}
//             onClick={() => {
//               setCategory(cat);
//               fetchProducts(cat);
//             }}
//           >
//             {cat === "all" ? "All" : cat.replace("-", " ").toUpperCase()}
//           </button>
//         ))}

//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
//         >
//           {showForm ? <FiX size={22} /> : <FiPlus size={22} />}
//         </button>
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg max-w-xl mx-auto mb-12">
//           <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-700 text-center">
//             {editingId ? "Edit Product" : "Add New Product"}
//           </h2>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Product Title"
//               className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
//               required
//             />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="Discounted Price"
//                 className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
                
//               />
//               <input
//                 type="number"
//                 name="originalPrice"
//                 value={formData.originalPrice}
//                 onChange={handleChange}
//                 placeholder="Original Price"
//                 className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
              
//               />
//             </div>
//             {/* alkf */}
//             <input 
//               type="number"
//               name="discount"
//               value={formData.discount}
//               onChange={handleChange}
//               placeholder="Discount %"
//               className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
//             />
//             <label className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 name="stock"
//                 checked={formData.stock}
//                 onChange={handleChange}
//                 className="w-5 h-5 accent-indigo-600"
//               />
//               <span className="text-gray-700 font-medium">In Stock</span>
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
//             >
//               <option value="regular-tshirts">Regular T-Shirts</option>
//               <option value="oversize-tshirts">Oversize T-Shirts</option>
//               <option value="swage-shirts">Swage Shirts</option>
//             </select>
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
//             />
//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
//             >
//               {editingId ? "Update Product" : "Add Product"}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Products List */}
//       <div className="max-w-6xl mx-auto px-2 sm:px-0">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {Array.isArray(products) && products.length > 0 ? (
//             products.map((p) => (
//               <div
//                 key={p._id}
//                 className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center"
//               >
//                 <img
//                   src={
//                     p.image?.startsWith("http")
//                       ? p.image
//                       : `${API_BASE}/uploads/${p.image}`
//                   }
//                   alt={p.title}
//                   className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl mb-3"
//                 />
//                 <h3 className="font-semibold text-lg mb-1 text-gray-800 text-center">
//                   {p.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm">
//                   Price: <span className="font-semibold">${p.price}</span>
//                 </p>
//                 {p.price !== p.originalPrice && (
//                   <p className="text-gray-400 text-sm mb-2 line-through">
//                     ${p.originalPrice}
//                   </p>
//                 )}
//                 {p.discount && p.discount !== "0" && (
//                   <p className="text-red-600 font-semibold text-xs sm:text-sm">
//                     {p.discount}% OFF
//                   </p>
//                 )}
//                 <p
//                   className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
//                     p.stock
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {p.stock ? "In Stock" : "Sold Out"}
//                 </p>
//                 <div className="flex gap-2 sm:gap-3 mt-3">
//                   <button
//                     onClick={() => handleEdit(p)}
//                     className="bg-blue-600 text-white px-3 sm:px-4 py-1 rounded-xl hover:bg-blue-700 transition text-sm sm:text-base"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(p._id)}
//                     className="bg-red-600 text-white px-3 sm:px-4 py-1 rounded-xl hover:bg-red-700 transition text-sm sm:text-base"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 w-full col-span-full">
//               No products found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );}


























// "use client";

// import React, { useState, useEffect } from "react";
// import { FiPlus, FiX } from "react-icons/fi";

// const API_BASE =
//   process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

// export default function AddProductsPage() {
//   const [category, setCategory] = useState("all");
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     price: "",
//     originalPrice: "",
//     discount: "",
//     stock: true,
//     image: null,       // main image
//     galleryImages: [], // dynamic gallery images
//     category: "regular-tshirts",
//     description: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const categories = ["all", "regular-tshirts", "oversize-tshirts", "swage-shirts"];

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async (cat = category) => {
//     try {
//       let url = `${API_BASE}/api/products`;
//       if (cat && cat !== "all") url += `/category/${cat}`;

//       const res = await fetch(url);
//       const data = await res.json();

//       const list = Array.isArray(data) ? data : Array.isArray(data.products) ? data.products : [];
//       const normalized = list.map((item) => ({
//         _id: item._id || item.id,
//         title: item.title || item.name,
//         price: item.price,
//         originalPrice: item.originalPrice || item.oldPrice || item.original_price,
//         discount: item.discount || "0",
//         stock: item.stock ?? true,
//         image: item.image?.startsWith("http") ? item.image : `${API_BASE}/uploads/${item.image}`,
//         images: item.images || [],
//         category: item.category,
//         description: item.description || "No description available",
//       }));

//       setProducts(normalized);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//       setProducts([]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     if (type === "file") {
//       // differentiate main image vs gallery images
//       if (name === "image") setFormData({ ...formData, image: files[0] });
//       else if (name.startsWith("gallery-")) {
//         const index = parseInt(name.split("-")[1]);
//         const newGallery = [...formData.galleryImages];
//         newGallery[index] = files[0];
//         setFormData({ ...formData, galleryImages: newGallery });
//       }
//     } else if (type === "checkbox") setFormData({ ...formData, [name]: checked });
//     else setFormData({ ...formData, [name]: value });
//   };

//   const addGalleryImage = () => {
//     setFormData({ ...formData, galleryImages: [...formData.galleryImages, null] });
//   };

//   const removeGalleryImage = (index) => {
//     const newGallery = [...formData.galleryImages];
//     newGallery.splice(index, 1);
//     setFormData({ ...formData, galleryImages: newGallery });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       if (key === "galleryImages") {
//         value.forEach((file) => {
//           if (file) payload.append("images", file);
//         });
//       } else if (key === "image") {
//         if (value) payload.append("image", value);
//       } else {
//         payload.append(key, value !== null ? value : "");
//       }
//     });

//     try {
//       let url = `${API_BASE}/api/products`;
//       const method = editingId ? "PUT" : "POST";
//       if (editingId) url += `/${editingId}`;

//       const res = await fetch(url, { method, body: payload });
//       if (!res.ok) throw new Error("Failed to save product");

//       await fetchProducts();
//       setFormData({
//         title: "",
//         price: "",
//         originalPrice: "",
//         discount: "",
//         stock: true,
//         image: null,
//         galleryImages: [],
//         category: "regular-tshirts",
//         description: "",
//       });
//       setEditingId(null);
//       setShowForm(false);
//     } catch (err) {
//       console.error(err);
//       alert("Error saving product");
//     }
//   };

//   const handleEdit = (product) => {
//     setFormData({
//       title: product.title,
//       price: product.price,
//       originalPrice: product.originalPrice,
//       discount: product.discount,
//       stock: product.stock,
//       image: null,
//       galleryImages: product.images || [],
//       category: product.category,
//       description: product.description || "",
//     });
//     setEditingId(product._id);
//     setShowForm(true);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;
//     try {
//       const res = await fetch(`${API_BASE}/api/products/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Failed to delete product");
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Error deleting product");
//     }
//   };

//   return (
//     <div className="p-4 sm:p-8 bg-gray-100 min-h-screen">
//       <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-indigo-700 text-center">
//         Products Management
//       </h1>

//       {/* Category Tabs + Add Button */}
//       <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 items-center">
//         {categories.map((cat) => (
//           <button
//             key={cat}
//             className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition ${
//               category === cat
//                 ? "bg-indigo-600 text-white shadow-lg"
//                 : "bg-white border border-gray-300 text-gray-600 hover:bg-indigo-50"
//             }`}
//             onClick={() => {
//               setCategory(cat);
//               fetchProducts(cat);
//             }}
//           >
//             {cat === "all" ? "All" : cat.replace("-", " ").toUpperCase()}
//           </button>
//         ))}

//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
//         >
//           {showForm ? <FiX size={22} /> : <FiPlus size={22} />}
//         </button>
//       </div>

//       {/* Add/Edit Form */}
//       {showForm && (
//         <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg max-w-xl mx-auto mb-12">
//           <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-gray-700 text-center">
//             {editingId ? "Edit Product" : "Add New Product"}
//           </h2>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Product Title"
//               className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
//               required
//             />
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Product Description"
//               className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
//               rows={4}
//             />
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 placeholder="Discounted Price"
//                 className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
//               />
//               <input
//                 type="number"
//                 name="originalPrice"
//                 value={formData.originalPrice}
//                 onChange={handleChange}
//                 placeholder="Original Price"
//                 className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
//                 required
//               />
//             </div>
//             <input
//               type="number"
//               name="discount"
//               value={formData.discount}
//               onChange={handleChange}
//               placeholder="Discount %"
//               className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
//             />
//             <label className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 name="stock"
//                 checked={formData.stock}
//                 onChange={handleChange}
//                 className="w-5 h-5 accent-indigo-600"
//               />
//               <span className="text-gray-700 font-medium">In Stock</span>
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
//             >
//               <option value="regular-tshirts">Regular T-Shirts</option>
//               <option value="oversize-tshirts">Oversize T-Shirts</option>
//               <option value="swage-shirts">Swage Shirts</option>
//             </select>

//             {/* Main Image */}
//             <input
//               type="file"
//               name="image"
//               onChange={handleChange}
//               className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
//             />

//             {/* 🔹 Gallery Images Dynamic */}
//             <div className="space-y-2">
//               <label className="font-medium text-gray-700">Gallery Images</label>
//               {formData.galleryImages.map((img, idx) => (
//                 <div key={idx} className="flex items-center gap-2">
//                   <input
//                     type="file"
//                     name={`gallery-${idx}`}
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
//                   />
//                   {img && (
//                     <img
//                       src={typeof img === "string" ? img : URL.createObjectURL(img)}
//                       alt="preview"
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   )}
//                   <button
//                     type="button"
//                     onClick={() => removeGalleryImage(idx)}
//                     className="bg-red-500 text-white p-1 rounded"
//                   >
//                     X
//                   </button>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addGalleryImage}
//                 className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
//               >
//                 <FiPlus /> Add More Images
//               </button>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
//             >
//               {editingId ? "Update Product" : "Add Product"}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Products List */}
//       <div className="max-w-6xl mx-auto px-2 sm:px-0">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//           {Array.isArray(products) && products.length > 0 ? (
//             products.map((p) => (
//               <div
//                 key={p._id}
//                 className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center"
//               >
//                 <img
//                   src={p.image?.startsWith("http") ? p.image : `${API_BASE}/uploads/${p.image}`}
//                   alt={p.title}
//                   className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-xl mb-3"
//                 />
//                 <h3 className="font-semibold text-lg mb-1 text-gray-800 text-center">
//                   {p.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm text-center mb-1">{p.description}</p>
//                 <p className="text-gray-600 text-sm">
//                   Price: <span className="font-semibold">${p.price || p.originalPrice}</span>
//                 </p>
//                 {p.price && p.price !== p.originalPrice && (
//                   <p className="text-gray-400 text-sm mb-2 line-through">${p.originalPrice}</p>
//                 )}
//                 {p.discount && p.discount !== "0" && (
//                   <p className="text-red-600 font-semibold text-xs sm:text-sm">{p.discount}% OFF</p>
//                 )}
//                 <p
//                   className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
//                     p.stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {p.stock ? "In Stock" : "Sold Out"}
//                 </p>

//                 {/* 🔹 Gallery Thumbnails */}
//                 <div className="flex gap-2 mt-2 flex-wrap">
//                   {p.images && p.images.map((img, i) => (
//                     <img
//                       key={i}
//                       src={img.startsWith("http") ? img : `${API_BASE}/uploads/${img}`}
//                       alt="gallery"
//                       className="w-16 h-16 object-cover rounded"
//                     />
//                   ))}
//                 </div>

//                 <div className="flex gap-2 sm:gap-3 mt-3">
//                   <button
//                     onClick={() => handleEdit(p)}
//                     className="bg-blue-600 text-white px-3 sm:px-4 py-1 rounded-xl hover:bg-blue-700 transition text-sm sm:text-base"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(p._id)}
//                     className="bg-red-600 text-white px-3 sm:px-4 py-1 rounded-xl hover:bg-red-700 transition text-sm sm:text-base"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-500 w-full col-span-full">No products found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }








"use client";

import React, { useState, useEffect } from "react";
import { FiPlus, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://stowave-backend-1.onrender.com";

const USD_TO_PKR = 280;

export default function AddProductsPage() {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    originalPrice: "",
    discount: "",
    stock: true,
    image: null,
    galleryImages: [],
    category: "regular-tshirts",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const categories = ["all", "regular-tshirts", "oversize-tshirts", "swage-shirts"];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (cat = category) => {
    try {
      let url = `${API_BASE}/api/products`;
      if (cat !== "all") url += `/category/${cat}`;
      const res = await fetch(url);
      const data = await res.json();

      const list = Array.isArray(data) ? data : data.products || [];
      setProducts(
        list.map((item) => ({
          _id: item._id,
          title: item.title,
          price: item.price,
          originalPrice: item.originalPrice,
          discount: item.discount || "0",
          stock: item.stock ?? true,
          image: item.image?.startsWith("http")
            ? item.image
            : `${API_BASE}/uploads/${item.image}`,
          images: item.images || [],
          category: item.category,
          description: item.description || "",
        }))
      );
    } catch {
      setProducts([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      if (name === "image") {
        setFormData({ ...formData, image: files[0] });
      } else {
        const index = Number(name.split("gallery")[1]);
        const imgs = [...formData.galleryImages];
        imgs[index] = files[0];
        setFormData({ ...formData, galleryImages: imgs });
      }
    } else if (type === "checkbox") {
      setFormData({ ...formData, stock: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "galleryImages") {
        value.forEach((img) => img && payload.append("images", img));
      } else if (value !== null) {
        payload.append(key, value);
      }
    });

    let url = `${API_BASE}/api/products`;
    let method = "POST";

    if (editingId) {
      url += `/${editingId}`;
      method = "PUT";
    }

    await fetch(url, { method, body: payload });
    fetchProducts();
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: "",
      price: "",
      originalPrice: "",
      discount: "",
      stock: true,
      image: null,
      galleryImages: [],
      category: "regular-tshirts",
      description: "",
    });
  };

  const handleEdit = (p) => {
    setFormData({
      title: p.title,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      stock: p.stock,
      image: null,
      galleryImages: p.images || [],
      category: p.category,
      description: p.description,
    });
    setEditingId(p._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${API_BASE}/api/products/${id}`, { method: "DELETE" });
    setProducts(products.filter((p) => p._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow p-6 mb-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Product Manager
          </h1>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCategory(c);
                  fetchProducts(c);
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold ${
                  category === c
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {c === "all" ? "All" : c.replace("-", " ")}
              </button>
            ))}

            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-emerald-500 text-white p-3 rounded-full"
            >
              {showForm ? <FiX /> : <FiPlus />}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-3xl shadow p-8 max-w-2xl mx-auto mb-12">
            <h2 className="text-xl font-semibold text-center mb-6">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Product title"
                className="input"
                required
              />

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows={3}
                className="input"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price USD"
                  className="input"
                />
                <input
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  placeholder="Original price USD"
                  className="input"
                  required
                />
              </div>

              <input
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                placeholder="Discount percent"
                className="input"
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
              >
                <option value="regular-tshirts">Regular Tshirts</option>
                <option value="oversize-tshirts">Oversize Tshirts</option>
                <option value="swage-shirts">Swage Shirts</option>
              </select>

              <label className="flex gap-2 items-center text-sm">
                <input
                  type="checkbox"
                  checked={formData.stock}
                  onChange={handleChange}
                />
                In stock
              </label>

              <input type="file" name="image" onChange={handleChange} />

              <button className="w-full bg-indigo-600 text-white py-3 rounded-xl">
                {editingId ? "Update" : "Save"}
              </button>
            </form>
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow p-4"
            >
              <img
                src={p.image}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />

              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.description}</p>

              <div className="mt-3">
                <p className="font-bold">
                  Rs. {((p.price || p.originalPrice) * USD_TO_PKR).toLocaleString()}
                </p>

                {p.price && (
                  <p className="text-sm text-gray-400 line-through">
                    Rs. {(p.originalPrice * USD_TO_PKR).toLocaleString()}
                  </p>
                )}
              </div>

              <span
                className={`inline-block mt-2 text-xs px-3 py-1 rounded-full ${
                  p.stock
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {p.stock ? "In stock" : "Sold out"}
              </span>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex items-center gap-1 text-sm bg-blue-500 text-white px-3 py-1 rounded-lg"
                >
                  <FiEdit2 /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex items-center gap-1 text-sm bg-red-500 text-white px-3 py-1 rounded-lg"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
        }
      `}</style>
    </div>
  );
}
