import React from "react";
import { useSelector } from "react-redux";
import "./user.css";

const User = () => {
  const {
    name,
    email,
    phone,
    emailVerification,
    phoneVerification,
    registration,
    status,
  } = useSelector(({ auth }) => auth.userData);

  // Format the date
  const formattedRegistrationDate = new Date(registration).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="user-profile">
      <h1 className="user-profile-title">User Profile</h1>
      <div className="user-profile-details">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email} {emailVerification ? "✅" : "❌"}
        </p>
        <p>
          <strong>Phone:</strong> {phone || "Not provided"}{" "}
          {phoneVerification ? "✅" : "❌"}
        </p>
        <p>
          <strong>Registration Date:</strong> {formattedRegistrationDate}
        </p>
        <p>
          <strong>Status:</strong> {status ? "Active" : "Inactive"}
        </p>
      </div>
    </div>
  );
};

export default User;
