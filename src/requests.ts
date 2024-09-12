import axios, { AxiosResponse } from 'axios';

export const requestPage = async (url: string): Promise<AxiosResponse> => axios.get(url);
