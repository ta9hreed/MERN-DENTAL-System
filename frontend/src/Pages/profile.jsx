import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import "../profile.css"; // Import the CSS file
import "../App.css";

const Profile = () => {
    const [profileUser, setProfileUser] = useState(null); // Separate state for profile user details
    const [editableUserId, setEditableUserId] = useState(null);
    const [avatar, setAvatar] = useState(null); // State for user avatar
    const [defaultAvatar, setDefaultAvatar] = useState("/default-avatar.jpg"); // Default avatar
    const { isAuthenticated } = useContext(Context);
    const [updatedUserData, setUpdatedUserData] = useState({});
    
    // Function to fetch user details
    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/v1/user/patient/me",
                { withCredentials: true }
            );
            setProfileUser(response.data.user); // Update profile user details state
            if (!response.data.user.avatar) {
                setDefaultAvatar("/default-avatar.jpg"); // Set default avatar if user doesn't have one
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching user details");
        }
    };

    useEffect(() => {
        fetchUserDetails(); // Fetch user details when component mounts
    }, []);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(
                `http://localhost:3000/api/v1/user/patient/delete/${userId}`,
                { withCredentials: true }
            );
            setProfileUser(profileUser.filter((user) => user._id !== userId));
            toast.success("Doctor deleted successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting doctor");
        }
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("avatar", avatar); // Append avatar file to FormData

            for (const key in profileUser) {
                formData.append(key, profileUser[key]);
            }

            await axios.put(
                `http://localhost:3000/api/v1/user/patient/update/${profileUser._id}`,
                formData, // Send FormData instead of JSON
                { withCredentials: true }
            );
            toast.success("User updated successfully");
            setEditableUserId(null);
            fetchUserDetails(); // Fetch users again after saving the update
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating user");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedUserData({ ...updatedUserData, [name]: value });
    };

    const handleEdit = () => {
        setEditableUserId(profileUser._id);
        setUpdatedUserData({
            firstName: profileUser.firstName || "",
            lastName: profileUser.lastName || "",
            email: profileUser.email || "",
            phone: profileUser.phone || "",
            dob: profileUser.dob ? profileUser.dob.split("T")[0] : "",
            Department: profileUser.Department || "",
            nic: profileUser.nic || "",
            gender: profileUser.gender || "",
            docAvatar: profileUser.docAvatar || "",
        });
    };
    

    const handleCancel = () => {
        setEditableUserId(null);
    };

    const handleSave = async () => {
        await handleUpdate();
        setEditableUserId(null);
        fetchUserDetails(); // Fetch user details again after saving the update
    };

    const handleAvatarChange = (event) => {
        setAvatar(event.target.files[0]); 
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    return (
        <section className="page">
            <div className="container">
                <div className="banner">
                    {profileUser ? (
                        <div className="user-details" style={{ maxWidth: "400px", margin: "auto", marginTop: "100px", padding: "20px", background: "#f9f9f9", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
                            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Profile</h2>
                            <div style={{ textAlign: "center" }}>
                                {editableUserId === profileUser._id ? (
                                    <input type="file" accept="image/*" onChange={handleAvatarChange} />
                                ) : null}
                                <img src={profileUser.avatar || defaultAvatar} alt="Avatar" style={{ borderRadius: "50%", width: "150px", height: "150px", objectFit: "cover", marginBottom: "20px" }} />
                            </div>
                            <p>Name: {editableUserId === profileUser._id ? (
                                <input type="text" name="firstName" value={updatedUserData.firstName || profileUser.firstName} onChange={handleInputChange} />
                            ) : (
                                <span style={{ fontWeight: "medium" }}>{profileUser.firstName}</span>
                            )}</p>
                            <p>Email: {editableUserId === profileUser._id ? (
                                <input type="text" name="email" value={updatedUserData.email || profileUser.email} onChange={handleInputChange} />
                            ) : (
                                <span style={{ fontWeight: "medium" }}>{profileUser.email}</span>
                            )}</p>
                            <p>Phone: {editableUserId === profileUser._id ? (
                                <input type="text" name="phone" value={updatedUserData.phone || profileUser.phone} onChange={handleInputChange} />
                            ) : (
                                <span style={{ fontWeight: "medium" }}>{profileUser.phone}</span>
                            )}</p>
                            <p>BirthDay: {editableUserId === profileUser._id ? (
                                <input
                                type="date" 
                                name="dob" 
                                value={updatedUserData.dob || (profileUser.dob ? profileUser.dob.split("T")[0] : "")} 
                                onChange={handleInputChange} 
                            /> 
                            ) : (
                                <span style={{ fontWeight: "medium" }}>{profileUser.dob ? profileUser.dob.split("T")[0] : ""}</span>
                            )}</p>
                        <p>NIC: {editableUserId === profileUser._id ? (
                            <input type="text" name="nic" value={updatedUserData.nic || profileUser.nic} onChange={handleInputChange} />
                                    ) : (
                                        <span style={{ fontWeight: "medium" }}>{profileUser.nic}</span>
                                    )}</p>
                                    <p>Gender: {editableUserId === profileUser._id ? (
                                        <input type="text" name="gender" value={updatedUserData.gender || profileUser.gender} onChange={handleInputChange} />
                                    ) : (
                                        <span style={{ fontWeight: "medium" }}>{profileUser.gender}</span>
                                    )}</p>
                                    {editableUserId === profileUser._id ? (
                                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                                            <button onClick={handleSave} style={{ background: "#007bff", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>Save</button>
                                            <button onClick={handleCancel} style={{ background: "#dc3545", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                            <button onClick={() => handleEdit(profileUser._id)} style={{ background: "#28a745", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>Edit</button>
                                            <button onClick={() => handleDelete(profileUser._id)} style={{ background: "#dc3545", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Delete</button>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                <p>Loading user details...</p>
                            )}
                        </div>
                    </div>
                </section>
            );
        };

        export default Profile;