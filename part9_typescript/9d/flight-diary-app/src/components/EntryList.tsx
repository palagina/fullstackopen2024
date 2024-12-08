import Entry from './Entry'
import { EntryType } from '../types/EntryTypes'

interface EntriesProps {
    entries: EntryType[];
  }
  
  const EntryList = (props: EntriesProps) => {
    return (
      <div>
        <h3>Diary entries</h3>
        {props.entries.map((part, index) => (
            <Entry key={index} {...part} />
        ))}
      </div>
    );
  };
  
export default EntryList