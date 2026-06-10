export const savePatientToStorage = (token, patient) => {
  localStorage.setItem('patientToken', token);
  localStorage.setItem('patientData', JSON.stringify(patient));
};

export const getPatientFromStorage = () => {
  const token = localStorage.getItem('patientToken');
  const patient = localStorage.getItem('patientData');
  return {
    token,
    patient: patient ? JSON.parse(patient) : null,
  };
};

export const clearPatientStorage = () => {
  localStorage.removeItem('patientToken');
  localStorage.removeItem('patientData');
};

export const saveAdminToStorage = (token) => {
  localStorage.setItem('adminToken', token);
};

export const getAdminFromStorage = () => {
  return localStorage.getItem('adminToken');
};

export const clearAdminStorage = () => {
  localStorage.removeItem('adminToken');
};