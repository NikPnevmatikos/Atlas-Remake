import React from "react";

function Step3({ formData, setFormData }) {
  return (
    <div className="other-info-container">

    <select 
      placeholder="Είδος φορέα"
      value={formData.providerType} 
      onChange={(e) => {
        setFormData({ ...formData, providerType: e.target.value });
      }}
    >
      <option value="Ιδιωτικός Φορέας">Ιδιωτικός Φορέας</option>
      <option value="Δημόσιος Φορέας">Δημόσιος Φορέας</option>
    </select>

    <select 
      placeholder="Πεδίο δραστηριότητας"
      value={formData.category} 
      onChange={(e) => {
        setFormData({ ...formData, category: e.target.value });
      }}
    >
      <option value="ΑΘλητισμός">ΑΘλητισμός</option>
      <option value="Ενέργεια">Ενέργεια</option>
      <option value="Ιατρική">Ιατρική</option>
      <option value="Νομικά">Νομικά</option>
      <option value="Πληροφορική">Πληροφορική</option>
      <option value="Τηλεπικοινωνίες">Τηλεπικοινωνίες</option>
    </select>

      <input
        type="text"
        placeholder="Επωνυμία"
        value={formData.name}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="ΑΦΜ"
        value={formData.afm}
        onChange={(e) => {
          setFormData({ ...formData, afm: e.target.value });
        }}
      />
      <input
        type="number"
        placeholder="Αριθμός απασχολούμενων"
        value={formData.workers}
        onChange={(e) => {
          setFormData({ ...formData, workers: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Χώρα"
        value={formData.country}
        onChange={(e) => {
          setFormData({ ...formData, country: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Οδός-Αριθμός"
        value={formData.street}
        onChange={(e) => {
          setFormData({ ...formData, street: e.target.value });
        }}
        />
      <input
        type="text"
        placeholder="TK"
        value={formData.postal}
        onChange={(e) => {
          setFormData({ ...formData, postal: e.target.value });
        }}
      />
    </div>
  );
}

export default Step3;