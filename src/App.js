import React, { useEffect, useState } from "react";
import Tile from "./components/Tile";
import "./styles.css";
import "./styles/tailwind-pre-build.css";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import swal from "sweetalert";
import axios from "axios";

export default function App() {
  const [done, setDone] = useState(false);
  const { width, height } = useWindowSize();
  const [data, setData] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get('/.netlify/functions/node-fetch');
      if (data.data.data) {
        parseData(data.data.data);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (currentIndex > 4) {
      setFinish();
    }
  }, [currentIndex]);

  const parseData = (data) => {
    const regValidation = /[!@#$%^&*()_+\-=[\]{};~':"\\|,.<>/?]/g;
    const randomTweetIndex = Math.floor(
      Math.random() * parseInt(data.data.length)
    );
    const randomTweet = data.data[randomTweetIndex].text
      .replace(regValidation, "")
      .split(" ")
      .filter(
        (word) => word.length > 4 && word.length < 10 && word !== "VladaMK"
      );
    const randomWordIndex = Math.floor(
      Math.random() * parseInt(randomTweet.length)
    );
    const randomWord = randomTweet[randomWordIndex].toUpperCase();
    console.log(
      "ne kur gledaj tuka go stavam ova za da znam barem koj e zborot ",
      randomWord
    );
    setData(randomWord);
  };
  const setUpdateIndex = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const setFinish = () => {
    setDone(true);
    swal({
      title: `Сакаш да се обидеш повторно? Зборот беше ${data}`,
      text: "Овој пат ќе биде уште потешко!",
      icon:
        "https://media.istockphoto.com/vectors/creative-thinking-vector-id1032869448?k=20&m=1032869448&s=612x612&w=0&h=SujDT-s9sKPNm1B7LkycKAJC97s89b4aolsVToGa3Q8=",
      buttons: true,
      dangerMode: false
    }).then((willDelete) => {
      if (willDelete) {
        swal("Одиме!", {
          icon: "success"
        });
      } else {
        swal("strashno");
      }
    });
  };

  const renderTiles = () => {
    const final = [];
    for (var i = 0; i < 5; i += 1) {
      final.push(
        <div className="flex items-center mt-4" key={i}>
          <Tile
            word={data && data !== "" ? data : "LJUBOMIR"}
            index={i}
            setFinish={setFinish}
            disabled={currentIndex !== i}
            setUpdateIndex={setUpdateIndex}
            row={i}
          />
        </div>
      );
    }
    return final;
  };
  return (
    <div className="bg-gray-600 min-h-screen text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl uppercase text-lg font-semibold font-mono">
        Зборчко
      </h1>
      <div className="my-3">
        {done ? <Confetti width={width} height={height} /> : renderTiles()}
      </div>
    </div>
  );
}
