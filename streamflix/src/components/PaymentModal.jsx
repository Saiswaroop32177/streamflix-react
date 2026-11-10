import { useState } from "react";

export default function PaymentModal({ plan, onClose }) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState("UPI");
  const [paymentId, setPaymentId] = useState("");

  const label = `${plan.name} Plan — ₹${plan.price}/month`;

  const pay = () => {
    if (!name.trim() || !paymentId.trim()) {
      alert("Please enter your name and payment details.");
      return;
    }
    localStorage.setItem("subscription", label);
    alert("✅ Payment Successful!\nYour subscription is now active.\nEnjoy StreamFlix!");
    onClose();
  };

  return (
    <div className="popup" style={{ display: "flex" }}>
      <div className="payment-box">
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <h2><i className="fas fa-lock"></i> Subscribe Securely</h2>
        <h3>{label}</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="UPI">UPI</option>
          <option value="Paytm">Paytm</option>
          <option value="Card">Credit / Debit Card</option>
        </select>
        <input
          type="text"
          placeholder="UPI ID / Number / Card details"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
        />
        <button className="btn-primary full" onClick={pay}>Pay Now</button>
        <p className="secure-note">
          <i className="fas fa-shield-alt"></i> Encrypted & secure payment
        </p>
      </div>
    </div>
  );
}