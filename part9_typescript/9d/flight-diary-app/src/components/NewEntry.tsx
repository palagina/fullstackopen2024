import { useState } from "react";
import { NewEntryType } from "../types/EntryTypes";

interface NewEntryProps {
  addNewEntry: (newEntry: NewEntryType) => void;
  errorMessage: string;
}

const NewEntry = (props: NewEntryProps) => {
  const [newEntry, setNewEntry] = useState<NewEntryType>({
    date: '2024-12-20',
    visibility: 'ok',
    weather: 'sunny',
    comment: ''
  });

  const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
  //const visibilityOptions = ['great', 'good', 'ok', 'poor'];

  const handleChange = (field: keyof NewEntryType, value: string) => {
      setNewEntry({ ...newEntry, [field]: value });
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.addNewEntry(newEntry);
  };
  
  return (
    <div>
      <h3>Add new entry</h3>

      {props.errorMessage && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
              {props.errorMessage}
          </div>
      )}

      <form onSubmit={handleSubmit}>
          <input
              type="date"
              placeholder="Date"
              value={newEntry.date}
              onChange={(e) => handleChange('date', e.target.value)}
          />

          <input
              placeholder="Visibility"
              value={newEntry.visibility}
              onChange={(e) => handleChange('visibility', e.target.value)}
          />

          {/* <select id="visibility" value={newEntry.visibility} onChange={(e) => handleChange('visibility', e.target.value)}>
              <option value="">-- Select visibility --</option>
              {visibilityOptions.map((option) => (
              <option key={option} value={option}>
                  {option}
              </option>
              ))}
          </select> */}

          <select id="weather" value={newEntry.weather} onChange={(e) => handleChange('weather', e.target.value)}>
              <option value="">-- Select visibility --</option>
              {weatherOptions.map((option) => (
              <option key={option} value={option}>
                  {option}
              </option>
              ))}
          </select>

          <textarea
              placeholder="Comment"
              value={newEntry.comment}
              onChange={(e) => handleChange('comment', e.target.value)}
          />

          <button type='submit'>Add</button>
      </form>
    </div>
  )
}
  
export default NewEntry