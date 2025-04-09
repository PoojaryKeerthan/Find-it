import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';

const Addlostproduct = () => {
  const [ProductName, setProductName] = useState('');
  const [Contact, setContact] = useState('');
  const [Location, setLocation] = useState('');
  const [Address, setAddress] = useState('');
  const [Category, setCategory] = useState('');
  const [Description, setDescription] = useState('');
  const [Date, setDate] = useState('');
  const [Image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!ProductName.trim()) newErrors.ProductName = "Product name is required.";
    if (!Contact.trim()) newErrors.Contact = "Contact is required.";
    if (!Location.trim()) newErrors.Location = "Location is required.";
    if (!Address.trim()) newErrors.Address = "Address is required.";
    if (!Category.trim()) newErrors.Category = "Category is required.";
    if (!Description.trim()) newErrors.Description = "Description is required.";
    if (!Date.trim()) newErrors.Date = "Date is required.";
    if (!Image) newErrors.Image = "Image is required.";

    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append("ProductName", ProductName);
    formData.append("Contact", Contact);
    formData.append("Location", Location);
    formData.append("Address", Address);
    formData.append("Category", Category);
    formData.append("Description", Description);
    formData.append("Date", Date);
    formData.append("Image", Image);

    try {
      const response = await axios.post("http://localhost:5000/api/lost-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    
      alert("Lost item added successfully!");
      console.log("Response:", response.data);
    
      // Optional: reset form
      setProductName("");
      setContact("");
      setLocation("");
      setAddress("");
      setCategory("");
      setDescription("");
      setDate("");
      setImage(null);
      setErrors({});
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
    

  };

  const inputStyle = "p-3 rounded-md bg-gray-300 focus:outline-none w-full";
  const errorStyle = "text-red-500 text-sm mt-1";

  return (
    <>
      <Navbar />
      <div className="bg-[#f0e7e7] min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <form onSubmit={handleSubmit} className="bg-[#f0e7e7] shadow-lg rounded-2xl p-4 sm:p-6 w-full overflow-hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
              Add the Lost-item details:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Product name<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className={inputStyle}
                  value={ProductName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                {errors.ProductName && <span className={errorStyle}>{errors.ProductName}</span>}
              </div>

              {/* Contact */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Contact<span className="text-red-500">*</span></label>
                <input
                  type="number"
                  className={inputStyle}
                  value={Contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                {errors.Contact && <span className={errorStyle}>{errors.Contact}</span>}
              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Location<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className={inputStyle}
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.Location && <span className={errorStyle}>{errors.Location}</span>}
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Address<span className="text-red-500">*</span></label>
                <textarea
                  className="p-3 rounded-md bg-gray-300 focus:outline-none h-24 w-full"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                {errors.Address && <span className={errorStyle}>{errors.Address}</span>}
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Category<span className="text-red-500">*</span></label>
                <select
                  className="block w-full appearance-none bg-gray-300 border border-gray-400 px-4 py-3 pr-8 rounded-md leading-tight focus:outline-none"
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Wallets & Purses">Wallets & Purses</option>
                  <option value="Keys">Keys</option>
                  <option value="Bags & Backpacks">Bags & Backpacks</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Documents">Documents (IDs, Licenses)</option>
                  <option value="Eyewear">Eyewear</option>
                  <option value="Others">Others</option>
                </select>
                {errors.Category && <span className={errorStyle}>{errors.Category}</span>}
              </div>

              {/* Description */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Description<span className="text-red-500">*</span></label>
                <textarea
                  className="p-3 rounded-md bg-gray-300 focus:outline-none h-24 w-full"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.Description && <span className={errorStyle}>{errors.Description}</span>}
              </div>

              {/* Date */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Date of Found Item<span className="text-red-500">*</span></label>
                <input
                  type="date"
                  className={inputStyle}
                  value={Date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.Date && <span className={errorStyle}>{errors.Date}</span>}
              </div>

              {/* Image Upload */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Upload image<span className="text-red-500">*</span></label>
                <input
                  type="file"
                  className={inputStyle}
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {errors.Image && <span className={errorStyle}>{errors.Image}</span>}
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-gray-800 text-white px-8 py-2 rounded-md hover:bg-gray-700 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Addlostproduct;