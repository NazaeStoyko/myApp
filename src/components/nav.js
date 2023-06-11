import "./nav.css";

export const Nav = ({ setInput, applyFilter }) => {
  const handleInput = (event) => {
    const value = event.target.value;
    setInput(value);
    applyFilter(value);
  };

  return (
    <nav>
      <input
        className="seach"
        type="text"
        placeholder=""
        onChange={handleInput}
      />
    </nav>
  );
};
