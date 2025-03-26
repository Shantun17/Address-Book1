/*
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Modal from "./Modal";

interface Address {
  _id?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  email: string;
}

const Home = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/addresses");
        setAddresses(data);
        setBackendError(false);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setBackendError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    setDeletingId(selectedId);
    setModalOpen(false);

    try {
      await axios.delete(`http://localhost:5001/api/addresses/${selectedId}`);
      setAddresses((prev) => prev.filter((address) => address._id !== selectedId));
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto p-6">
      {modalOpen && <div className="absolute inset-0 bg-white opacity-50 z-10"></div>}

      <div className={`relative z-0 ${modalOpen ? "brightness-75" : "brightness-100"}`}>
        <h2 className="text-2xl font-semibold mb-4">Address Book</h2>
        <Link to="/address/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
          Add New Address
        </Link>

        {isLoading ? (
          <Loader />
        ) : backendError ? (
          <p className="text-red-500 mt-4">Sorry, we are unable to fetch the addresses at the moment.</p>
        ) : addresses.length === 0 ? (
          <p className="text-gray-500 mt-4">No addresses found.</p>
        ) : (
          <ul className="space-y-4">
            {addresses.map((address) => (
              <li key={address._id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <p><strong>{address.name}</strong> ({address.phone})</p>
                  <p>{address.street}, {address.city}, {address.state} - {address.pincode}, {address.country}</p>
                  <p>{address.email}</p>
                </div>
                <div className="flex space-x-2">
                  <Link to={`/address/edit/${address._id}`} className="bg-green-500 text-white px-3 py-1 rounded">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(address._id!)}
                    disabled={deletingId === address._id}
                    className={`px-3 py-1 rounded text-white ${
                      deletingId === address._id ? "bg-red-300 cursor-not-allowed" : "bg-red-500"
                    }`}
                  >
                    {deletingId === address._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {modalOpen && (
        <Modal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          onConfirm={handleConfirmDelete} 
          title="Confirm Deletion"
          message="Are you sure you want to delete this address?"
        />
      )}
    </div>
  );
};

export default Home;
*/

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import Modal from "./Modal";

interface Address {
  _id?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  email: string;
}

const Home = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<boolean>(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5001/api/addresses");
        setAddresses(data);
        setBackendError(false);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setBackendError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    setIsDeleting(true);
    setModalOpen(false);

    try {
      await axios.delete(`http://localhost:5001/api/addresses/${selectedId}`);
      setAddresses((prev) => prev.filter((address) => address._id !== selectedId));
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto p-6">
      {(isDeleting || modalOpen) && <div className="absolute inset-0 bg-white opacity-50 z-10"></div>}
      {isDeleting && <Loader />}

      <div className={`relative z-0 ${isDeleting || modalOpen ? "brightness-75" : "brightness-100"}`}>
        <h2 className="text-2xl font-semibold mb-4">Address Book</h2>
        <Link to="/address/new" className={`bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}>
          Add New Address
        </Link>

        {isLoading ? (
          <Loader />
        ) : backendError ? (
          <p className="text-red-500 mt-4">Sorry, we are unable to fetch the addresses at the moment.</p>
        ) : addresses.length === 0 ? (
          <p className="text-gray-500 mt-4">No addresses found.</p>
        ) : (
          <ul className="space-y-4">
            {addresses.map((address) => (
              <li key={address._id} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <p><strong>{address.name}</strong> ({address.phone})</p>
                  <p>{address.street}, {address.city}, {address.state} - {address.pincode}, {address.country}</p>
                  <p>{address.email}</p>
                </div>
                <div className="flex space-x-2">
                  <Link to={`/address/edit/${address._id}`} className={`bg-green-500 text-white px-3 py-1 rounded ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(address._id!)}
                    disabled={isDeleting}
                    className={`px-3 py-1 rounded text-white bg-red-500 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {modalOpen && (
        <Modal 
          isOpen={modalOpen} 
          onClose={() => setModalOpen(false)} 
          onConfirm={handleConfirmDelete} 
          title="Confirm Deletion"
          message="Are you sure you want to delete this address?"
        />
      )}
    </div>
  );
};

export default Home;