    import  { useContext, useEffect, useState } from "react";
    import axios from "axios";
    import { toast } from "react-toastify";
    import { Context } from "../main";
    import { Navigate } from "react-router-dom";


    const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const { isAuthenticated } = useContext(Context);
    const [editableDoctorId, setEditableDoctorId] = useState(null);
    const [updatedDoctorData, setUpdatedDoctorData] = useState({});

    // Function to fetch doctors
    const fetchDoctors = async () => {
        try {
        const { data } = await axios.get(
            "http://localhost:3000/api/v1/user/doctors",
            { withCredentials: true }
        );
        setDoctors(data.doctors || []);
        } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching doctors");
        }
    };

    useEffect(() => {
        fetchDoctors(); // Fetch doctors when component mounts
    }, []);

    const handleDelete = async (doctorId) => {
        try {
        await axios.delete(
            `http://localhost:3000/api/v1/user/delete/${doctorId}`,
            {
            withCredentials: true,
            }
        );
        setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
        toast.success("Doctor deleted successfully");
        } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting doctor");
        }
    };

    const handleUpdate = async (doctorId, updatedData) => {
        try {
        const { data } = await axios.put(
            `http://localhost:3000/api/v1/user/update/${doctorId}`,
            updatedData,
            { withCredentials: true }
        );
        setDoctors(doctors.map((doctor) =>
            doctor._id === doctorId ? data.doctor : doctor
        ));
        toast.success("Doctor updated successfully");
        } catch (error) {
        toast.error(error.response?.data?.message || "Error updating doctor");
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedDoctorData({ ...updatedDoctorData, [name]: value });
    };

    const handleEdit = (doctorId) => {
        setEditableDoctorId(doctorId);
        const doctorToUpdate = doctors.find((doctor) => doctor._id === doctorId);
        if (doctorToUpdate) {
        setUpdatedDoctorData({
            firstName: doctorToUpdate.firstName || "",
            lastName: doctorToUpdate.lastName || "",
            email: doctorToUpdate.email || "",
            phone: doctorToUpdate.phone || "",
            dob: doctorToUpdate.dob ? doctorToUpdate.dob.split("T")[0] : "",
            doctorDepartment: doctorToUpdate.doctorDepartment || "",
            nic: doctorToUpdate.nic || "",
            gender: doctorToUpdate.gender || "",
            docAvatar: doctorToUpdate.docAvatar || "",
        });
        }
    };

    const handleSave = async (doctorId) => {
        await handleUpdate(doctorId, updatedDoctorData);
        setEditableDoctorId(null);
        setUpdatedDoctorData({});
        fetchDoctors(); // Fetch doctors again after saving the update
    };

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
    }

    
    return (
        <section className="page doctors">
        <h1>DOCTORS</h1>
        <div className="banner">
            {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
                doctor && doctor._id ? (
                <div className="card" key={doctor._id}>
                    {doctor.docAvatar && (
                    <img src={doctor.docAvatar.url} alt="doctor avatar" />
                    )}
                    <h4>
                    {doctor.firstName ? `${doctor.firstName} ${doctor.lastName || ''}` : ''}
                    </h4>
                    {editableDoctorId === doctor._id ? (
                    <div className="details">
                        <p>
                        First Name:{" "}
                        <input
                            type="text"
                            name="firstName"
                            value={updatedDoctorData.firstName}
                            onChange={handleInputChange}
                        />
                        </p>
                        <p>
                        Last Name:{" "}
                        <input
                            type="text"
                            name="lastName"
                            value={updatedDoctorData.lastName}
                            onChange={handleInputChange}
                        />
                        </p>
                        <p>
                        Email:{" "}
                        <input
                            type="text"
                            name="email"
                            value={updatedDoctorData.email}
                            onChange={handleInputChange}
                        />
                        </p>
                        <p>
                        Phone:{" "}
                        <input
                            type="text"
                            name="phone"
                            value={updatedDoctorData.phone}
                            onChange={handleInputChange}
                        />
                        </p>
                        <p>
                        DOB:{" "}
                        <input
                            type="date"
                            name="dob"
                            value={updatedDoctorData.dob}
                            onChange={handleInputChange}
                        />
                        </p>
                        <p>
                        Department:{" "}
                        <input
                            type="text"
                            name="doctorDepartment"
                            value={updatedDoctorData.doctorDepartment}
                            onChange={handleInputChange}
                        />
                        </p>
                        <p>
                        NIC:{" "}
                        <input
                            type="text"
                            name="nic"
                            value={updatedDoctorData.nic}
                            onChange={handleInputChange}
                        />
                        </p>
                        <p>
                        Gender:{" "}
                        <input
                            type="text"
                            name="gender"
                            value={updatedDoctorData.gender}
                            onChange={handleInputChange}
                        />
                        </p>
                        <button onClick={() => handleSave(doctor._id)}>Save</button>
                    </div>
                    ) : (
                    <div className="details">
                        <p>First Name: <span>{doctor.firstName}</span></p>
                        <p>Last Name: <span>{doctor.lastName || 'No Last Name Available'}</span></p>
                        <p>Email: <span>{doctor.email}</span></p>
                        <p>Phone: <span>{doctor.phone}</span></p>
                        <p>DOB: <span>{doctor.dob.split("T")[0]}</span></p>
                        <p>Department: <span>{doctor.doctorDepartment}</span></p>
                        <p>NIC: <span>{doctor.nic}</span></p>
                        <p>Gender: <span>{doctor.gender}</span></p>
                        <button onClick={() => handleEdit(doctor._id)} type="button" className="custom-button">Edit</button>
                        <button onClick={() => handleDelete(doctor._id) } type="delete" className="custom-button">Delete</button>
                    </div>
                    )}
                </div>
                ) : null
            ))
            ) : (
            <h1>No Registered Doctors Found!</h1>
            )}
        </div>
        </section>
    );
    };

    export default Doctors;