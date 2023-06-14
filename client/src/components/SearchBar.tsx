import {SlMagnifier} from "react-icons/sl"
function SearchBar() {
  return (
    <div className="wrap">
      <div className="search">
        <input
          type="text"
          className="search__term"
          placeholder="¿Qué estás buscando?"
        />
        <button type="submit" className="search__button">
          <SlMagnifier />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
