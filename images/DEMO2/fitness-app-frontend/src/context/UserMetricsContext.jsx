import { createContext, useState } from 'react';

export const UserMetricsContext = createContext();

export const UserMetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    gender: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    activityLevel: ''
  });

  const updateMetric = (key, value) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
  };

  return (
    <UserMetricsContext.Provider value={{ metrics, updateMetric }}>
      {children}
    </UserMetricsContext.Provider>
  );
};
