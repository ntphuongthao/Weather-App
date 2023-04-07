import { AmericanStates, VietnamBigCities } from '../data/location';

const LocationSearch = ({ selection, setSelection, handleSubmit }) => {
  const suggestions = AmericanStates.concat(VietnamBigCities);

  const handleChange = (e) => {
    setSelection(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={selection} onChange={handleChange}>
        <option value="">Select a location</option>
        {suggestions.map((suggestion) => (
          <option key={suggestion} value={suggestion}>{suggestion}</option>
        ))}
      </select>
      <button type='submit'>Submit</button>
    </form>
  );
}

export default LocationSearch;