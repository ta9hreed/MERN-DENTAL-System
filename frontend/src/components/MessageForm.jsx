import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import "../profile.css"; // Import the CSS file

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/v1/message/send",
        { firstName, lastName, email, phone, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        toast.success(res.data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
      });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="message-page">
      <section className="message-form">
        <h2>Send Us A Message</h2>
        <form onSubmit={handleMessage}>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <textarea
              rows={7}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <button type="submit">Send</button>
          </div>
        </form>
        <img src="/Vector.png" alt="vector" />
      </section>
    </section>
  );
};

export default MessageForm;
