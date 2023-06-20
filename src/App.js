import React, { useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazyload-v18";
import Loader from "./components/Loader";

const App = () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [containerData, setContainerData] = useState([]);
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
    const getDataTimeOut = setTimeout(() => {
      function getData() {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.json())
          .then((data) => setContainerData(data));
      }

      getData();
    }, 500);
    return () => {
      clearTimeout(getDataTimeOut);
    };
  }, []);

  useEffect(() => {
    if (isTyping) {
      setWait(true);
      setResult(
        containerData.filter((cd) =>
          cd.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setWait(false);
      setResult([]);
    }
  }, [search, containerData, isTyping]);

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
              <LazyLoad
                key={r.id}
                once={true}
                overflow={true}
                placeholder={<Loader />}
              >
                <div key={r.id} className="search-result-item">
                  {/* <img src={r.thumbnailUrl} alt="thumbnailImage" /> */}
                  <div>{r.name}</div>
                </div>
              </LazyLoad>
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
