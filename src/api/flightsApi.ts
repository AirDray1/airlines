import { api } from './axiosInstance';
import { Flight } from '../types/flights';

export const getFlights = async (): Promise<Flight[]> => {
  const response = await api.get<Flight[]>('/flights');
  return response.data;
};

export const getFlightById = async (id: string): Promise<Flight> => {
  const response = await api.get<Flight>(`/flights/${id}`);
  return response.data;
};