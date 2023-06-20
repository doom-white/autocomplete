import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [wait, setWait] = useState(false);

  const searchRef = useRef();

  const isTyping = search.replace(/\s+/, "").length > 0;

  //#region Click OutSide and reset Search Input
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  const handleClickOutSide = (e) => {
    if (searchRef && !searchRef.current.contains(e.target)) {
      setSearch("");
    }
  };
  //#endregion

  useEffect(() => {
    if (isTyping) {
      async function getData() {
        await fetch("https://jsonplaceholder.typicode.com/photos")
          .then((res) => res.json())
          .then((data) => {
            setWait(true);
            setResult(
              data.filter((d) =>
                d.title.toLowerCase().includes(search.toLowerCase())
              )
            );
          });
      }

      getData();
    } else {
      setWait(false);
      setResult([]);
    }
  }, [search, isTyping]);

  return (
    <>
      <div className="search" ref={searchRef}>
        <input
          type="text"
          className={isTyping ? "typing" : null}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Bir şeyler ara..."
        />
        {isTyping && (
          <div className="search-result">
            {result.map((r) => (
              <div key={r.id} className="search-result-item">
                <img src={r.thumbnailUrl} alt="thumbnailImage" />
                <div>{r.title}</div>
              </div>
            ))}
            {wait && result.length === 0 && (
              <div className="result-not-found">
                <span style={{ textDecoration: "line-through" }}>{search}</span>
                &nbsp;&nbsp; ile ilgili bir şey bulamadık!
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
