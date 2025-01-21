import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock, faKey, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // For error or success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Dynamically update based on name attribute
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      setMessage("Thanks for registering!");
      setMessageType("success");
      console.log(response.data);
    } catch (error) {
      console.error("Error registering user:", error);
      setMessage("Failed to register user.");
      setMessageType("error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg m-5 p-6">
        <div className="flex flex-col lg:flex-row">
          {/* Left Column (Form) */}
          <div className="lg:w-1/2 flex flex-col items-center justify-center space-y-4 px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-5">
              Sign up
            </h1>

            <div className="flex items-center mb-4 w-full">
              <FontAwesomeIcon
                icon={faUser}
                className="text-lg text-gray-500 mr-3"
              />
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                name="name" // ensure correct name attribute for input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              />
            </div>

            <div className="flex items-center mb-4 w-full">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-lg text-gray-500 mr-3"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                name="email" // ensure correct name attribute for input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              />
            </div>

            <div className="flex items-center mb-4 w-full">
              <FontAwesomeIcon
                icon={faLock}
                className="text-lg text-gray-500 mr-3"
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.password} 
                onChange={handleChange}
                name="password" // ensure correct name attribute for input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              />
            </div>

            <div className="flex items-center mb-4 w-full">
              <FontAwesomeIcon
                icon={faKey}
                className="text-lg text-gray-500 mr-3"
              />
              <input
                type="password"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword" // ensure correct name attribute for input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              />
            </div>

            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                className="form-checkbox text-blue-500"
              />
              <label htmlFor="newsletter" className="ml-2 text-gray-700">
                Subscribe to our newsletter
              </label>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>

            {/* Display the message */}
            {message && (
              <div
                className={`mt-4 text-center ${
                  messageType === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className={`mr-2 ${messageType === "success" ? "text-green-500" : "text-red-500"}`}
                />
                {message}
              </div>
            )}
          </div>

          {/* Right Column (Image) */}
          <div className="lg:w-1/2 flex justify-center items-center p-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              alt="Sign up"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
