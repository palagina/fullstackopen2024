import axios from 'axios';
import { EntryType } from '../types/EntryTypes'

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllEntries = async () => {
    const response = await axios.get<EntryType[]>(baseUrl);
    return response.data;
}

export const createEntry = async (object: EntryType) => {
    const response = await axios.post<EntryType>(baseUrl, object);
    return response.data;
}