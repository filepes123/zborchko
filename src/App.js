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
  useEffect(() => {
    async function fetchData() {
      let config = {
        headers: {
          Authorization: "Bearer " + process.env.REACT_TWITTER_KEY
        }
      };
      // const data = await axios.get('https://api.twitter.com/2/users/1648317175/tweets', config);
      if (data) {
        parseData(data);
      }
    }
    fetchData();
  }, []);

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
    console.log(randomWord);
    setData(randomWord);
  };
  const setFinish = () => {
    setDone(true);
    swal({
      title: "Sakash pak?",
      text: "Btw poteshko kje e ovoj put",
      icon:
        "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg",
      buttons: true,
      dangerMode: false
    }).then((willDelete) => {
      if (willDelete) {
        swal("Hajmo", {
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
          {console.log(data)}
          <Tile
            word={data && data !== "" ? data : "LJUBOMIR"}
            index={i}
            setFinish={setFinish}
          />
        </div>
      );
    }
    return final;
  };
  return (
    <div className="bg-gray-800 min-h-screen text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl uppercase text-lg font-semibold">Zborchko</h1>
      <div className="my-3">
        {done ? <Confetti width={width} height={height} /> : renderTiles()}
      </div>
    </div>
  );
}
