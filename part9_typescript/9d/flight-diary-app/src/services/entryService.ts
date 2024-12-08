import axios from 'axios';
import { EntryType, NewEntry } from '../types/EntryTypes'

const baseUrl = 'http://localhost:3001/api/diaries'

export const getAllEntries = async () => {
    const response = await axios
        .get<EntryType[]>(baseUrl);
    return response.data;
}


export const createEntry = async (object: NewEntry) => {
  const response = await axios
        .post<NewEntry>(baseUrl, object);
    return response.data;
}