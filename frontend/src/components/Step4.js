import React from "react";

function Step4({ formData, setFormData }) {
  return (
    <div className="sign-up-container">
      <input
        required
        type="text"
        placeholder="Όνομα Χρήστη"
        value={formData.username}
        onChange={(event) =>
          setFormData({ ...formData, username: event.target.value })
        }
      />
      <input
        required
        type="text"
        placeholder="Email"
        value={formData.email}
        onChange={(event) =>
          setFormData({ ...formData, email: event.target.value })
        }
      />
      <input
        required
        type="password"
        placeholder="Κωδικός"
        value={formData.password}
        onChange={(event) =>
          setFormData({ ...formData, password: event.target.value })
        }
      />
      <input
        required
        type="password"
        placeholder="Επιβεβαίωση Κωδικού"
        value={formData.confirmPassword}
        onChange={(event) =>
          setFormData({ ...formData, confirmPassword: event.target.value })
        }
      />
    </div>
  );
}

export default Step4;