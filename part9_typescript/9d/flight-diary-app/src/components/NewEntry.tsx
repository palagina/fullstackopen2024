import { useState } from "react";
import { EntryType } from "../types/EntryTypes";

interface NewEntryProps {
  addNewEntry: (newEntry: EntryType) => void;
  errorMessage: string;
}

const NewEntry = (props: NewEntryProps) => {
  const [newEntry, setNewEntry] = useState<EntryType>({
    date: '',
    visibility: '',
    weather: '',
    comment: ''
  });

  const weatherOptions = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
  const visibilityOptions = ['great', 'good', 'ok', 'poor'];

  const handleChange = (field: keyof EntryType, value: string) => {
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

          <div>
            <div>Visibility:</div>
            {visibilityOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="visibility"
                  value={option}
                  checked={newEntry.visibility === option}
                  onChange={(e) => handleChange('visibility', e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>

          <div>
            <div>Weather:</div>
            {weatherOptions.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name="weather"
                  value={option}
                  checked={newEntry.weather === option}
                  onChange={(e) => handleChange('weather', e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>

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