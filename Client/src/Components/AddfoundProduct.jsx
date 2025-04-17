import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const AddfoundProduct = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [ProductName, setProductName] = useState('');
  const [Contact, setContact] = useState('');
  const [Location, setLocation] = useState('');
  const [Address, setAddress] = useState('');
  const [Category, setCategory] = useState('');
  const [Description, setDescription] = useState('');
  const [Date, setDate] = useState('');
  const [Image, setImage] = useState(null);
  const [Condition, setCondition] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errormessage, seterrormessage] = useState('');


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
    if (!Condition.trim()) newErrors.Condition = "Condition is Required";

    return newErrors;
  }

  const handleSubmit = async (e) => {
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
    formData.append("Condition", Condition);
    formData.append("UserId", user.id);

    try {
      seterrormessage('');
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addproducts/found-products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { success, message } = response.data;
      if (success) {
        setLoading(false);
        setProductName("");
        setContact("");
        setLocation("");
        setAddress("");
        setCategory("");
        setDescription("");
        setDate("");
        setCondition("");
        setImage(null);
        setErrors({});

        setTimeout(() => {
          toast.success("Item successfully added!");
          navigate("/");
        }, 1500);
      }
      else{
        seterrormessage(message);
      }
    } catch (error) {
      setLoading(false);
      seterrormessage("something went wrong Server is not responding..");
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }
  const errorStyle = "text-red-500 text-sm mt-1";
  return (
    <>
      <Navbar />
      <div className="bg-[#f0e7e7] min-h-screen relative">
        <div className="max-w-screen-xl mx-auto px-4 py-15">
          <form className="bg-[rgb(240,231,231)] shadow-lg rounded-2xl p-4 sm:p-6 w-full overflow-hidden"
            onSubmit={handleSubmit}
          >

            {loading && (
              <div className="absolute inset-0 backdrop-blur-sm flex justify-center items-center rounded-2xl z-20">
                <div className="flex flex-row gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce" />
                  <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.3s]" />
                  <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce [animation-delay:-.5s]" />
                </div>
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6 text-center">
              Add the found-item details:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Product name</label>
                <input type="text" className="p-3 rounded-md bg-gray-300 focus:outline-none w-full"
                  value={ProductName}
                  onChange={(e) => setProductName(e.target.value)}
                />
                {errors.ProductName && <span className={errorStyle}>{errors.ProductName}</span>}
              </div>

              {/* Contact */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">finder’s contact details</label>
                <input type="number" className="p-3 rounded-md bg-gray-300 focus:outline-none w-full"
                  value={Contact}
                  onChange={(e) => setContact(e.target.value)}
                />
                
                {errors.Contact && <span className={errorStyle}>{errors.Contact}</span>}
              </div>

              {/* Location */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Location</label>
                <input type="text" className="p-3 rounded-md bg-gray-300 focus:outline-none w-full"
                  value={Location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {errors.Location && <span className={errorStyle}>{errors.Location}</span>}
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Current Item Location</label>
                <textarea className="p-3 rounded-md bg-gray-300 focus:outline-none h-24 w-full"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
                {errors.Address && <span className={errorStyle}>{errors.Address}</span>}
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Category</label>
                <select className="p-3 rounded-md bg-gray-300 focus:outline-none w-full"
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
                <label className="text-sm font-medium mb-1">Description</label>
                <textarea className="p-3 rounded-md bg-gray-300 focus:outline-none h-24 w-full"
                  value={Description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.Description && <span className={errorStyle}>{errors.Description}</span>}
              </div>

              {/* Date Found */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Date of Found Item</label>
                <input type="date" className="p-3 rounded-md bg-gray-300 focus:outline-none w-full"
                  value={Date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {errors.Date && <span className={errorStyle}>{errors.Date}</span>}
              </div>

              {/* Image Upload */}
              <div className="flex flex-col ">
                <label className="text-sm font-medium mb-1">Upload image</label>
                <input
                  className='p-3 rounded-md bg-gray-300 focus:outline-none w-full'
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                {errors.Image && <span className={errorStyle}>{errors.Image}</span>}
              </div>

              {/* Condition */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Condition</label>
                <select className="p-3 rounded-md bg-gray-300 focus:outline-none w-full"
                  value={Condition}
                  onChange={(e) => setCondition(e.target.value)}
                >
                  <option value="">Select Condition</option>
                  <option value="New">New</option>
                  <option value="Good">Good</option>
                  <option value="Used">Used</option>
                  <option value="Damaged">Damaged</option>
                </select>
                {errors.Condition && <span className={errorStyle}>{errors.Condition}</span>}
              </div>

              {/* Reported To Whom */}
            </div>
            <div>
              {errormessage && (
                <p className="text-red-600 text-center mt-4">{errormessage}</p>
              )}
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-gray-800 text-white px-8 py-2 rounded-md hover:bg-gray-700 transition hover:cursor-pointer"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AddfoundProduct
