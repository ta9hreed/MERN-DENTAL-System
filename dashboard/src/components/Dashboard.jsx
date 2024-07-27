import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import "../App.css"
const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [count, setCount] = useState(null);
  const [countDoc, setCountDoc] = useState(null);
  const [error, setError] = useState(null); // Set error state

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setError(error.message); // Handle error by setting the error state
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Function to fetch appointment count
    const fetchAppCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/appointment/count",
          { withCredentials: true }
        );
        setCount(response.data);
      } catch (error) {
        setError(error.message); // Handle error by setting the error state
      }
    };
  
    // Function to fetch user count
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/count",
          { withCredentials: true }
        );
        setCountDoc(response.data.doctors);
      } catch (error) {
        setError(error.message); // Handle error by setting the error state
      }
    };
  
    // Fetch initial counts when the component mounts
    fetchAppCount();
    fetchUserCount();
  
    // Set up intervals to update counts periodically
    const appIntervalId = setInterval(fetchAppCount, 60000); // Fetch appointment count every minute
    const userIntervalId = setInterval(fetchUserCount, 60000); // Fetch user count every minute
  
    // Clean up intervals on component unmount
    return () => {
      clearInterval(appIntervalId);
      clearInterval(userIntervalId);
    };
  }, []);
  
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      setError(error.response.data.message); // Handle error by setting the error state
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        {error && <p>Error: {error}</p>} {/* Display error if exists */}
        <div className="banner">
          <div className="firstBox">
            <img src="/Doctor-cuate.svg" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{count }</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{countDoc}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No Appointments Found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
