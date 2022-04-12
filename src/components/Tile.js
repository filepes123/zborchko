import React, { useEffect, useState } from "react";
import "../styles.css";
import "../styles/tailwind-pre-build.css";

const Tile = ({ word, setFinish, setUpdateIndex, disabled }) => {
  const [parsedWord, setParsedWord] = useState([]);
  const [guess, setGuess] = useState({});
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    tiles();
  }, [word]);

  useEffect(() => {
    if (counter === word.length) {
      validateTiles();
    }
  }, [guess]);

  const tiles = () => {
    const final = [];
    const tmpObj = { letter: "", class: "bg-yellow-800" };
    for (let i = 0; i < word.length; i += 1) {
      final.push(tmpObj);
    }

    setParsedWord(final);
  };

  const updateGuess = (event, index) => {
    const letter = event.target.value;
    const { name } = event.target;
    const inputIndex = name;
    if (letter !== "") {
      const append = guess;
      append[index] = letter.toUpperCase();
      setGuess({ ...append });
      setCounter(counter + 1);
    } else {
      const append = guess;
      delete guess[index];
      setGuess({ ...append });
    }
    if (inputIndex < word.length) {  
      const nextfield = document.querySelector(
        `input[name="${(parseInt(inputIndex) + 1).toString()}"]`
      );
      if (nextfield !== null) {
        nextfield.focus();
      }
    }
  };

  const validateTiles = () => {
    const parsedGuess = Object.entries(guess).map(([k, v]) => v);
    const finishedRow = [];
    if (parsedGuess.join("") === word) {
      setFinish();
    } else {
      for (var i = 0; i < word.length; i += 1) {
        const tmpObj = {};
        if (parsedGuess[i] === word[i]) {
          tmpObj.letter = parsedGuess[i];
          tmpObj.class = "bg-green-500";
        } else {
          tmpObj.letter = parsedGuess[i];
          tmpObj.class = "bg-red-500";
        }
        finishedRow.push(tmpObj);
      }
    }
    setParsedWord(finishedRow);
    setUpdateIndex();
    return finishedRow;
  };
  return (
    <>
      {parsedWord.map((data, index) => (
          <input
            type="text"
            onChange={(e) => updateGuess(e, index)}
            maxLength="1"
            disabled={data.letter}
            key={index}
            disabled={disabled}
            name={index}
            className={`m-0.5 mr-5 text-white text-transfor: uppercase flex items-center justify-center w-12 h-12 text-xl rounded-sm border-2 border-gray-900 ${data.class} text-center`}
          />
      ))}
    </>
  );
};

export default Tile;
