import React, { useState } from "react";
import { storage } from "../firebase";
import { useHistory } from 'react-router-dom';

export default function App() {
  const history = useHistory();
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed", console.log, console.error, () => {
      storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          setFile(null);
          setURL(url);
        });
    });
  }

  return (
    <div>
      <button onClick={()=>history.push('/new')}>Nuevo Producto</button>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>
      <div>
        <h4>preview</h4>

        {file && <img src={URL.createObjectURL(file)} alt="" />}
      </div>
      <div>
        <h4>Uploaded</h4>
        <img src={url} alt="" />
      </div>
    </div>
  );
}