import { useContext } from 'react';
import { UserMetricsContext } from './UserMetricsContext';

export const useUserMetrics = () => useContext(UserMetricsContext);
