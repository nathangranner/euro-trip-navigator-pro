
// Travel insurance data for Europe trip 2025
export const travelInsurance = {
  provider: "Heymondo Premium (Starr Indemnity & Liability Company)",
  effectiveDate: "2025-05-23",
  travelDates: {
    departure: "2025-06-05", 
    return: "2025-06-26"
  },
  
  // TRAVELERS
  travelers: [
    {
      name: "Nathan Granner",
      policyNumber: "80107853",
      premium: "$151.15"
    },
    {
      name: "Jamie Chamberlin", 
      policyNumber: "80107855",
      premium: "$151.15"
    }
  ],
  
  // EMERGENCY CONTACTS
  emergencyContacts: {
    withinUSA: "866-466-7891",
    international: "+1-786-838-0757",
    email: "heymondo@insureresponse.com",
    website: "www.heymondo.com/usa/clements"
  },
  
  // COVERAGE SUMMARY (Maximum Benefits)
  coverage: {
    tripCancellation: "$10,000",
    tripInterruption: "$10,000", 
    travelMedicalExpense: "$200,000",
    emergencyMedicalEvacuation: "$500,000",
    naturalDisasterEvacuation: "$50,000",
    searchAndRescue: "$10,000",
    accidentalDeathAndDismemberment: "$10,000",
    baggageAndPersonalEffects: "$3,000",
    baggageDelay: "$500",
    tripDelay: "$3,000 (max $200/day)",
    missedConnection: "$750"
  },
  
  // PAYMENT INFO
  payment: {
    transactionNumber: "BAT517176",
    confirmationNumber: "202476",
    totalPaid: "$302.30",
    paymentDate: "2025-05-22"
  },
  
  // IMPORTANT NOTES
  notes: [
    "Coverage is PRIMARY for medical expenses",
    "No deductible for medical coverage", 
    "Adventure activities covered (skiing, hiking, cycling, etc.)",
    "Pre-existing conditions excluded (180-day lookback)",
    "24/7 assistance available",
    "Keep policy cards with travel documents"
  ],
  
  // CLAIMS CONTACT
  claims: {
    phone: "800-567-3512",
    address: "ADMINISTRATIVE CONCEPTS, PO BOX 4000, COLLEGEVILLE, PA, 19426",
    timeLimit: "20 days for initial notice, 90 days for proof of loss"
  }
};

// QUICK REFERENCE FOR EMERGENCIES
export const emergencyCard = {
  name: "Nathan Granner / Jamie Chamberlin",
  policyNumbers: "80107853 / 80107855", 
  planName: "Heymondo Premium",
  travelDates: "06/05/2025 to 06/26/2025",
  emergencyUSA: "866-466-7891",
  emergencyIntl: "+1-786-838-0757"
};
