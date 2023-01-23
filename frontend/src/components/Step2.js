import React from "react";

function Step2({ formData, setFormData }) {
  return (
    <div className="personal-info-container">
      <input
        required
        type="text"
        placeholder="Όνομα"
        value={formData.first_name}
        onChange={(e) => {
          setFormData({ ...formData, first_name: e.target.value });
        }}
      />
      <input
        required
        type="text"
        placeholder="Επώνυμο"
        value={formData.last_name}
        onChange={(e) => {
          setFormData({ ...formData, last_name: e.target.value });
        }}
      />
      <input
        required
        type="text"
        placeholder="Τηλέφωνο"
        value={formData.phone}
        onChange={(e) => {
          setFormData({ ...formData, phone: e.target.value });
        }}
      />
      <input
        required
        type="text"
        placeholder="Αριθμός Ταυτότητας"
        value={formData.identification}
        onChange={(e) => {
          setFormData({ ...formData, identification: e.target.value });
        }}
      />
    </div>
  );
}

export default Step2;