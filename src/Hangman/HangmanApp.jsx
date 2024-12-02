import { useState } from "react";
import "./HangmanApp.css";
import { MainComp } from "./components/MainComp";
import { Loader } from "./components/Loader";
export const HangmanApp = () => {
  const [start, setStart] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setLoading(true);
    setTimeout(() => {
      setStart(false);
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <main className={start ? "" : "bg-game"}>
        <section>
          <div className="container">
            {start ? (
              <>
                <h1>The Hangman</h1>
                <button className="hvr-pulse-shrink" onClick={handleStart}>
                  Jugar
                </button>
              </>
            ) : (
              <MainComp />
            )}
            {loading ? <Loader /> : ""}
            <small>Creado por Álex M.G.</small>
          </div>
        </section>
      </main>
    </>
  );
};
