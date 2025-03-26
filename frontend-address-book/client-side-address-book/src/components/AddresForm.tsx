
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Loader from "./Loader";

// interface Address {
//   name: string;
//   phone: string;
//   street: string;
//   city: string;
//   state: string;
//   pincode: string;
//   country: string;
//   email: string;
// }

// const AddressForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState<Address>({
//     name: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//     email: "",
//   });

//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const [phoneError, setPhoneError] = useState<string>("");
//   const [emailError, setEmailError] = useState<string>("");
//   const [hasTriedSubmitting, setHasTriedSubmitting] = useState<boolean>(false);

//   useEffect(() => {
//     const fetchAddress = async () => {
//       if (!id) return;
//       setIsLoading(true);
//       try {
//         const { data } = await axios.get(`http://localhost:5001/api/addresses/${id}`);
//         setFormData(data);
//       } catch (error) {
//         console.error("Error fetching address:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAddress();
//   }, [id]);

//   useEffect(() => {
//     validateForm();
//   }, [formData]);

//   const validateForm = () => {
//     const { phone, email } = formData;

//     const phoneRegex = /^[0-9]{10}$/;
//     setPhoneError(phone && !phoneRegex.test(phone) ? "Phone number must be exactly 10 digits" : "");

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setEmailError(email && !emailRegex.test(email) ? "Email address should be valid" : "");
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setHasTriedSubmitting(true);

//     if (phoneError || emailError) {
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       if (id) {
//         await axios.put(`http://localhost:5001/api/addresses/${id}`, formData);
//         toast.success("Address updated successfully!");
//       } else {
//         await axios.post("http://localhost:5001/api/addresses", formData);
//         toast.success("Address added successfully!");
//       }
//       navigate("/");
//     } catch (error) {
//       console.error("Error saving address:", error);
//       toast.error("Failed to save address. Please try again."); 
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     navigate("/");
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
//       <h2 className="text-2xl font-semibold mb-4">{id ? "Edit Address" : "Add Address"}</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />

//         <input type="text" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
//         {hasTriedSubmitting && phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}

//         <input type="text" name="street" placeholder="Enter street" value={formData.street} onChange={handleChange} className="w-full p-2 border rounded" required />
//         <input type="text" name="city" placeholder="Enter city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required />
//         <input type="text" name="state" placeholder="Enter state" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded" required />
//         <input type="text" name="pincode" placeholder="Enter pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 border rounded" required />
//         <input type="text" name="country" placeholder="Enter country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded" required />

//         <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
//         {hasTriedSubmitting && emailError && <p className="text-red-500 text-sm">{emailError}</p>}

//         <div className="flex justify-between">
//           <button
//             type="submit"
//             className="px-4 py-2 rounded text-white bg-cyan-500 hover:bg-cyan-600"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Saving..." : id ? "Update" : "Save"}
//           </button>

//           <button
//             type="button"
//             onClick={handleCancel}
//             className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
//             disabled={!id && isSubmitting} // Disable only when adding a new address
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddressForm;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";

interface Address {
  id?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  email: string;
}

const AddressForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Address>({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    email: "",
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [hasTriedSubmitting, setHasTriedSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const fetchAddress = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5001/api/addresses/${id}`);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching address:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, [id]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const { phone, email } = formData;
    const phoneRegex = /^[0-9]{10}$/;
    setPhoneError(phone && !phoneRegex.test(phone) ? "Phone number must be exactly 10 digits" : "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(email && !emailRegex.test(email) ? "Email address should be valid" : "");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasTriedSubmitting(true);
    if (phoneError || emailError) return;
    
    setIsSubmitting(true);
    setIsLoading(true);
    try {
      if (id) {
        await axios.put(`http://localhost:5001/api/addresses/${id}`, formData);
        toast.success("Address updated successfully!");
      } else {
        await axios.post("http://localhost:5001/api/addresses", formData);
        toast.success("Address added successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving address:", error);
      toast.error("Failed to save address. Please try again."); 
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">{id ? "Edit Address" : "Add Address"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
        {hasTriedSubmitting && phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
        <input type="text" name="street" placeholder="Enter street" value={formData.street} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="city" placeholder="Enter city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="state" placeholder="Enter state" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="pincode" placeholder="Enter pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="text" name="country" placeholder="Enter country" value={formData.country} onChange={handleChange} className="w-full p-2 border rounded" required />
        <input type="email" name="email" placeholder="Enter email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" required />
        {hasTriedSubmitting && emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        <div className="flex justify-between">
          <button type="submit" className="px-4 py-2 rounded text-white bg-cyan-500 hover:bg-cyan-600" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : id ? "Update" : "Save"}
          </button>
          <button type="button" onClick={handleCancel} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400" disabled={!id && isSubmitting}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;
