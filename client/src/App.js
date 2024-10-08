import { Route, Routes } from "react-router-dom";
import Main from "./screens/Main/Main";
import FirstChat from "./screens/FirstChat/FirstChat";
import SeasonPass from "./screens/SeasonPass/SeasonPass";
import Cam from "./screens/cam/Cam";
import UploadScreen from "./screens/uploadScreen/UploadScreen";
import GameStart from "./screens/game_start/GameStart";
import UploadImage from "./screens/upload_image/UploadImage";
import Camera from "./screens/camera/Camera";
import NeyroImageGenerate from "./screens/neyro_image_generate/NeyroImageGenerate";

function App() {
  return (
    <div className="App">
      <div className="page">
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/sister-chat" element={<FirstChat />} />
            <Route path="/season-pass" element={<SeasonPass />} />
            <Route path="/game-start" element={<GameStart />} />
            <Route path="/upload-image" element={<UploadImage />} />
            <Route path="/upload-image/camera" element={<Camera />} />
            <Route
              path="/neyro-image-generate"
              element={<NeyroImageGenerate />}
            />
            <Route path="/cam" element={<Cam />} />
            <Route path="/upload" element={<UploadScreen />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
