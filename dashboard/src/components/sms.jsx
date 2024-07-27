    import axios from "axios";
    import { useContext, useEffect, useState } from "react";
    import { toast } from "react-toastify";
    import { Context } from "../main";
    import { Navigate } from "react-router-dom";
    import "../profile.css"; // Import the CSS file for styling
    import "../App.css"; // Import the CSS file for styling

    const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { isAuthenticated } = useContext(Context);

    useEffect(() => {
        const fetchMessages = async () => {
        try {
            const { data } = await axios.get(
            "http://localhost:3000/api/v1/message/getall",
            { withCredentials: true }
            );
            setMessages(data.messages);
        } catch (error) {
            toast.error(error.response?.data?.message || "Error fetching messages");
        }
        };
        fetchMessages();
    }, []);

    const handleDelete = async (messageId) => {
        try {
        await axios.delete(
            `http://localhost:3000/api/v1/message/${messageId}`,
            { withCredentials: true }
        );
        setMessages(messages.filter((message) => message._id !== messageId));
        toast.success("Message deleted successfully");
        } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting message");
        }
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <section className="page messages">
        <h1 className="page-title">Messages</h1>
        <div className="messages-container">
            {messages && messages.length > 0 ? (
            messages.map((element) => (
                <div className="card" key={element._id}>
                <div className="details">
                    <p>
                    First Name: <span>{element.firstName}</span>
                    </p>
                    <p>
                    Last Name: <span>{element.lastName}</span>
                    </p>
                    <p>
                    Email: <span>{element.email}</span>
                    </p>
                    <p>
                    Phone: <span>{element.phone}</span>
                    </p>
                    <p>
                    Message: <span>{element.message}</span>
                    </p>
                    <button
                    className="delete-button"
                    onClick={() => handleDelete(element._id)}
                    >
                    Delete
                    </button>
                </div>
                </div>
            ))
            ) : (
            <h1 className="no-messages">No Messages!</h1>
            )}
        </div>
        </section>
    );
    };

    export default Messages;
