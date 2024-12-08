import { EntryType } from '../types/EntryTypes'

const Entry = (entry: EntryType) => {

    return (
        <div>
            <h4>{entry.date}</h4>
            <div>Visibility: {entry.visibility}</div>
            <div>Weather: {entry.weather}</div>
            <div>Comment: {entry.comment}</div>
        </div>
      );
    };
    
  export default Entry