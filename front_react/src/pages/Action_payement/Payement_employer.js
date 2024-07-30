import React, { useState, useEffect } from "react";
import { Select, DatePicker, Button, Row, Col } from "antd";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function Payement_employer() {
  const [employerList, setEmployerList] = useState([]);
  const [selectedEmployer, setSelectedEmployer] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEmployerInfo, setSelectedEmployerInfo] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const storedDate = localStorage.getItem("selectedDate");
    return storedDate ? moment(storedDate) : moment();
  });
  const [payments, setPayments] = useState([]);
  const [selectedEmployerId, setSelectedEmployerId] = useState(null);
  const [deductions, setDeductions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployerData = async () => {
      setLoading(true);
      const year = selectedDate.year();
      const month = selectedDate.month() + 1;
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/Filtre_payement/${year}/${month}?employerId=${selectedEmployerId}`
        ); // Ajoutez l'ID de l'employeur à l'URL
        const data = response.data;
        const unpaidEmployers = data.unpaidEmployers;
        setEmployerList(unpaidEmployers);
        setDeductions(data.selectedEmployerDeductions);
        setLoading(false);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des employés impayés :",
          error
        );
        setLoading(false);
      }
    };
    fetchEmployerData();
  }, [selectedDate, selectedEmployerId]);

  useEffect(() => {
    localStorage.setItem("selectedDate", selectedDate.format("YYYY-MM-DD"));
  }, [selectedDate]);

  const handleSelectChange = (value) => {
    setSelectedEmployer(value);
    setSelectedEmployerId(value); // Mettre à jour l'ID de l'employeur sélectionné

    const selectedInfo = employerList.find(
      (employer) => employer.ID_employer === value
    );
    setSelectedEmployerInfo(selectedInfo);
  };

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handlePayment = () => {
    if (selectedEmployer && selectedDate) {
      const deductionsData = deductions.map((deduction) => ({
        type: deduction.deduction_types.split(","),
        amount: deduction.deduction_amount.split(","),
      }));

      const paymentData = {
        amount: selectedEmployerInfo.Salaire_base,
        payment_date: selectedDate.format("YYYY-MM-DD"),
        employer_id: selectedEmployer,
        deductions: deductionsData,
      };
      console.log(paymentData);

      axios
        .post("http://127.0.0.1:8000/api/Add_payements", paymentData)
        .then((response) => {
          console.log("Paiement effectué avec succès:", response.data);
          toast.success("Paiement effectué avec succès!", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: { backgroundColor: "green", color: "white" },
            bodyStyle: { fontSize: "16px" },
            progressStyle: { backgroundColor: "white" },
            onClose: () => navigate("/table_Payement"),
          });
        })
        .catch((error) => {
          console.error("Erreur lors du paiement:", error);
          toast.error("Erreur lors lors du paiement");
        });
    } else {
      console.error(
        "Veuillez sélectionner un employeur et une date de paiement."
      );
    }
  };

  let filteredEmployerList = [];
  if (
    employerList &&
    employerList.length > 0 &&
    payments &&
    payments.length > 0
  ) {
    const paidEmployersIds = payments.map((payment) => payment.employer_id);
    filteredEmployerList = employerList.filter(
      (employer) => !paidEmployersIds.includes(employer.ID_employer)
    );
    console.log(filteredEmployerList);
  } else {
    filteredEmployerList = employerList;
  }

  return (
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      maxWidth: "500px",
      height: "auto",
      backgroundColor: "#fff",
      padding: "50px",
      marginTop: "20px",
      borderRadius: "8px",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)" 
    }}
    >
      <div style={{ marginBottom: "20px" }}>
        <label>Date: </label>
        <DatePicker onChange={handleDateChange} defaultValue={selectedDate} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="employerSelect">Sélectionner un employer</label>
        <Select
          id="employerSelect"
          value={selectedEmployer}
          onChange={handleSelectChange}
          style={{ width: 200 }}
          placeholder="Sélectionnez un employeur"
          loading={loading}
        >
          {filteredEmployerList.map((employer) => (
            <Option key={employer.ID_employer} value={employer.ID_employer}>
              {employer.Nom} {employer.Prenom} - matriculé:{" "}
              {employer.ID_employer}
            </Option>
          ))}
        </Select>
      </div>
      {selectedEmployerInfo && (
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "15px",
          }}
        >
          <h2>Informations de l'employeur sélectionné :</h2>
          <p>
            matricule: {selectedEmployerInfo.ID_employer} Nom:{" "}
            {selectedEmployerInfo.Nom} et Prénom: {selectedEmployerInfo.Prenom}
          </p>
          <p>Adresse: {selectedEmployerInfo.Adresse}</p>
          <p>Telephone: {selectedEmployerInfo.Tel}</p>
          <p>Email: {selectedEmployerInfo.Email}</p>
          <p>Departement: {selectedEmployerInfo.Departement}</p>
          <p>Poste: {selectedEmployerInfo.Poste}</p>
          <p>salaire: {selectedEmployerInfo.Salaire_base}</p>
          <h3>Déductions associées :</h3>
          <ul>
            {deductions.map((deduction) => (
              <li key={deduction.deduction_id}>
                {/* <strong>Déduction ID :</strong> {deduction.deduction_id} */}
                <ul>
                  {deduction.deduction_types.split(",").map((type, index) => (
                    <li key={index}>
                      <strong>Description :</strong> {type} :{" "}
                      {deduction.deduction_amount.split(",")[index]}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <Button type="primary" onClick={handlePayment} loading={loading}>
            Payer
          </Button>
        </div>
      )}
    </div>
  );
}

export default Payement_employer;
