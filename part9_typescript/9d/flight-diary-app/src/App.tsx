import NewEntry from './components/NewEntry'
import EntryList from './components/EntryList'
import { useState, useEffect } from "react";
import { EntryType } from "./types/EntryTypes";
import { getAllEntries, createEntry } from './services/entryService';
import { AxiosError } from 'axios';


const App = () => {
  const [entryList, setEntrylist] = useState<EntryType[]>([]);
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    getAllEntries().then((entries: EntryType[]) => {
      const entriesDesc = entries.sort((a, b) => b.id - a.id);
      setEntrylist(entriesDesc)
    })
  }, [])

  const addNewEntry = async (entry: EntryType) => {
    try {
      const data: EntryType = await createEntry(entry);
      const newEntryList: EntryType[] = [data, ...entryList];
      setEntrylist(newEntryList);
      setErrorMessage('');
    } catch (error) {
      if(error instanceof AxiosError) {
        setErrorMessage(error.response?.data.error.message);
      }
    }
  };

  return (
    <div>
      <h1>Flight diaries</h1>
      <NewEntry addNewEntry={addNewEntry} errorMessage={errorMessage}/>
      <EntryList entries={entryList}/>
    </div>
  );
};

export default App;