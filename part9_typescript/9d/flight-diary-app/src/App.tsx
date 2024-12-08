import NewEntry from './components/NewEntry'
import EntryList from './components/EntryList'
import { useState, useEffect } from "react";
import { EntryType, NewEntryType } from "./types/EntryTypes";
import { getAllEntries, createEntry } from './services/entryService';

const App = () => {
  const [entryList, setEntrylist] = useState<EntryType[]>([]);

  useEffect(() => {
    getAllEntries().then(entries => {
      const entriesDesc = entries.sort((a, b) => b.id - a.id);
      setEntrylist(entriesDesc)
    })
  }, [])

  const addNewEntry = (entry: NewEntryType) => {
    createEntry(entry).then((data: EntryType) => {
      const newEntryList:EntryType[] = [data, ...entryList];
      setEntrylist(newEntryList);
    })
  };

  return (
    <div>
      <h1>Flight diaries</h1>
      <NewEntry addNewEntry={addNewEntry}/>
      <EntryList entries={entryList}/>
    </div>
  );
};

export default App;