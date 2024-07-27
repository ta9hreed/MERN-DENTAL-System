    import { useEffect, useState } from "react";
    import axios from "axios";
    import { toast } from "react-toastify";
    import { useNavigate } from "react-router-dom";
     // Import the CSS file

    const Patients = () => {
    const [patients, setPatients] = useState([]);

    // Function to fetch patients
    const fetchPatients = async () => {
        try {
        const { data } = await axios.get("http://localhost:3000/api/v1/user/patients", {
            withCredentials: true,
        });
        setPatients(data.patients || []);
        } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching patients");
        }
    };
    const handleDelete = async (patientId) => {
            try {
            await axios.delete(
                `http://localhost:3000/api/v1/user/delete/${patientId}`,
                {
                withCredentials: true,
                }
            );
            setPatients(patients.filter((patient) => patient._id !== patientId));
            toast.success("Patients deleted successfully");
            } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting  patient");

            }
        };
    useEffect(() => {
        fetchPatients(); // Fetch patients when component mounts
    }, []);

    return (
        <section className="page patients">
        <h1>PATIENTS</h1>
        <div className="patients-list">
            {patients && patients.length > 0 ? (
            patients.map((patient) => (
                <div className="card" key={patient._id}>
                <h4>{`${patient.firstName} ${patient.lastName}`}</h4>
                <p>Email: {patient.email}</p>
                <p>Phone: {patient.phone}</p>
                <p>DOB: {patient.dob ? patient.dob.split("T")[0] : ""}</p>
                <button onClick={() => handleDelete(patient._id) } type="delete" className="custom-button">Delete</button>
                
                </div>
            ))
            ) : (
            <p>No patients found.</p>
            )}
        </div>
        </section>
    );
    };

    export default Patients;
