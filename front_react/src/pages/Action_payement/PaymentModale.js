import React from 'react'
import { Modal, Button } from 'antd';
import jsPDF from 'jspdf';

function PaymentModale({ isVisible, onCancel, paymentDetails }) {

  const generatePDF = (details) => {
    const doc = new jsPDF();
    // Définir la taille de la police et le style pour "Fiche de payement"
    const fontSize = 30; // Augmenter la taille de la police
    const x = 70;
    const y = 10;
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'bold'); // Définir la police en gras

    // Ajouter le texte "Fiche de payement"
    const text = 'Fiche de payement';
    doc.text(text, x, y);

    // Ajouter une ligne pour simuler le soulignement
    const textWidth = doc.getTextWidth(text);
    const underlineY = y + 1; // Position de la ligne sous le texte
    doc.line(x, underlineY, x + textWidth, underlineY);

    // Restaurer la taille de la police précédente si nécessaire
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');

    // Ajouter les autres textes

    doc.text(`Reference: ${paymentDetails.id}`, 10, 30);
    doc.text(`Employer: ${paymentDetails.employer_id}`, 10, 40);
    doc.text(`Salaire: ${paymentDetails.amount}`, 10, 50);
    doc.text(`Date de payment: ${paymentDetails.payment_date}`, 10, 60);
    doc.text(`Deduction: ${paymentDetails.deduction}`, 10, 70);
    doc.text(`salaire Net: ${paymentDetails.amount}`, 10, 80);

    doc.text(`Signature caisse`, 20, 150);
    doc.text(`Signature employer`, 150, 150);

    doc.save('fiche de paye.pdf');
    onCancel(); 
  };

  return (
    <div> 
      <Modal
      title="Informations de paiement"
      visible={isVisible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Fermer
        </Button>,
        <Button key="print" type="primary" onClick={generatePDF}>
          Imprimer
        </Button>,
      ]}
    >
      {paymentDetails && (
        <>
          <p>Reference: {paymentDetails.id}</p>
          <p>Employer: {paymentDetails.employer_id}</p>
          <p>Salaire: {paymentDetails.salaire}</p>
          <p>Date de payment: {paymentDetails.payment_date}</p>
          <p>Deduction: {paymentDetails.deduction}</p>
          <p>salaire Net: {paymentDetails.amount}</p>
        </>
      )}
    </Modal>
    </div>
  )
}

export default PaymentModale
