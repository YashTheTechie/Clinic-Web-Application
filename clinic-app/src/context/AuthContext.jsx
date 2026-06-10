import React, { createContext, useContext, useState, useEffect } from 'react';
import { savePatientToStorage, getPatientFromStorage, clearPatientStorage } from '../utils/helpers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [patient, setPatient] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { token, patient } = getPatientFromStorage();
    if (token && patient) {
      setToken(token);
      setPatient(patient);
    }
    setLoading(false);
  }, []);

  const login = (token, patientData) => {
    savePatientToStorage(token, patientData);
    setToken(token);
    setPatient(patientData);
  };

  const logout = () => {
    clearPatientStorage();
    setToken(null);
    setPatient(null);
  };

  return (
    <AuthContext.Provider value={{ patient, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);