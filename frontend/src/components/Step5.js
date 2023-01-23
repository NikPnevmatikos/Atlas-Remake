import React from "react";

function Step5({ formData, setFormData }) {
  return (
    <div className="other-info-container">
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
      <select 
      placeholder="Σχολή"
      value={formData.university} 
      onChange={(e) => {
          setFormData({ ...formData, university: e.target.value });
      }}
      >
      <option value="Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης">Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης</option>
      <option value="Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών">Εθνικό και Καποδηστριακό Πανεπιστήμιο Αθηνών</option>
      <option value="Εθνικό Μετσόβιο Πολυτεχνείο">Εθνικό Μετσόβιο Πολυτεχνείο</option>
      <option value="Οικονομικό Πανεπιστήμιο Αθηνών">Οικονομικό Πανεπιστήμιο Αθηνών</option>
      <option value="Πανεπιστήμιο Θεσσαλίας">Πανεπιστήμιο Θεσσαλίας</option>
      <option value="Πανεπιστήμιο Πειραιώς">Πανεπιστήμιο Πειραιώς</option>
      </select>
    </div>
  );
}

export default Step5;