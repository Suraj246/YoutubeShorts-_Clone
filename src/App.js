import { useEffect, useState } from "react";
import "./App.css";
import videos from "./components/shortsApi";
import Videos from "./components/Videos";

const localStorageData = () => {
  const get = localStorage.getItem("videoItems");
  if (get) {
    return JSON.parse(get);
  }
  return [];
}

function App() {

  const [videoData, setVideoData] = useState(localStorageData)

  useEffect(() => {
    localStorage.setItem('videoItems', JSON.stringify(videoData));
    setVideoData(videos)
  }, [videoData])

  const increaseLike = (id) => {
    const updatedLikes = videoData.map((item) => {
      if (item?.id === id) {
        item.likes = item.likes + 1
        return item
      }
      return item;
    });
    setVideoData(updatedLikes)
  }

  return (
    <div className="app">
      <div className="app__videos">
        {videoData.length === 0 ? <span style={{ fontSize: "20px", color: "white" }}>no videos </span> :
          videoData?.map((vid, idx) => {
            const elemId = idx
            return (
              <Videos
                id={vid.id}
                src={vid.url}
                like={vid.likes}
                title={vid.title}
                key={idx}
                elemId={elemId}
                increaseLike={increaseLike}
                videoData={videoData}
                setVideoData={setVideoData}
              />
            )
          })}
      </div>
    </div>
  );
}

export default App;