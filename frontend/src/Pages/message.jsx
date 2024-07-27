import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate, useParams } from "react-router-dom";
import "../profile.css"; // Import the CSS file
import "../App.css";

const UpdateMessage = () => {
  const { isAuthenticated } = useContext(Context);
  const { id } = useParams(); // Get the message ID from the route parameters
  const [message, setMessage] = useState(null); // Initially no message
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // State to control edit mode

  useEffect(() => {
    // Fetch the message details when the component mounts
    const fetchMessage = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/v1/message/${id}`,
          { withCredentials: true }
        );
        setMessage(data);
      } catch (error) {
        toast.error(error.response?.data?.msg || "Error fetching message details");
      } finally {
        setLoading(false);
      }
    };
    fetchMessage();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessage((prevMessage) => ({ ...prevMessage, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/message/${id}`,
        message,
        { withCredentials: true }
      );
      toast.success(data.message);
      setEditMode(false); // Exit edit mode after successful update
    } catch (error) {
      toast.error(error.response?.data?.msg || "Error updating message");
    }
  };

  const handleEdit = () => {
    setEditMode(true); // Enter edit mode
  };

  const handleCancel = () => {
    setEditMode(false); // Exit edit mode without saving
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!message) {
    return <div>No messages sent yet</div>;
  }

  return (
    <section className="page">
      <div className="container">
        <div className="banner">
          {editMode ? (
            <form onSubmit={handleUpdate}>
              <h2>Update Message</h2>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={message.firstName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={message.lastName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={message.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={message.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={message.message}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="button-group">
                <button type="submit">Save</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="message-details">
              <h2>Message Details</h2>
              <p>
                <strong>First Name:</strong> {message.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {message.lastName}
              </p>
              <p>
                <strong>Email:</strong> {message.email}
              </p>
              <p>
                <strong>Phone:</strong> {message.phone}
              </p>
              <p>
                <strong>Message:</strong> {message.message}
              </p>
              <button onClick={handleEdit}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpdateMessage;
