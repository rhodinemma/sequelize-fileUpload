import { useState } from "react";
import axios from "axios";
import "./App.css";
import FileBase from "react-file-base64";

function App() {
  const [file, setFile] = useState("");
  console.log(file);

  const uploadFile = async () => {
    await axios.post("http://localhost:7000/upload/", file);
  };

  if (file) {
    uploadFile();
  }

  return (
    <div className="App">
      <center>
        <h6 className="mt-5 display-6">
          Testing Image Upload with NodeJs Sequelize
        </h6>

        <div className="mt-5">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setFile({ ...file, imageFile: base64 })}
          />
        </div>

        <div className="mt-5">
          <img src={file.imageFile} alt="" />
        </div>
      </center>
    </div>
  );
}

export default App;
