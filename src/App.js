import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState(false);

  const searchRef = useRef();

  const isTyping = search.replace(/\s+/, "").length > 0;

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

  useEffect(() => {
    const filtered = data.filter((d) =>
      d.title.toLowerCase().includes(search.toLowerCase())
    );
    if (isTyping) {
      setResult(filtered.length > 0 ? filtered : false);
    } else {
      setResult(false);
    }
  }, [search]);

  const data = [
    {
      id: 1,
      title: "test 1",
    },
    {
      id: 2,
      title: "Test 2",
    },
    {
      id: 3,
      title: "deneme 1",
    },
    {
      id: 4,
      title: "Deneme 2",
    },
  ];

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
            {result &&
              result.map((r) => (
                <div key={r.id} className="search-result-item">
                  {r.title}
                </div>
              ))}
            {!result && (
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
