import AlbumList from "./components/AlbumList/AlbumList";
import Navbar from "./components/Navbar/Navbar";
import './app.css'
import ImageList from "./components/ImageList/ImageList";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import db from './firebaseInit.js';

function App() {
  const [albumPage, setAlbumPage] = useState(true); // currenlty showing album Page on dowlonad
  const [albumId, setAlbumId] = useState('');
  const [albumName, setAlbumName] = useState('');
  return (
    <div className="appPage">
      <Navbar />
      {albumPage ? <AlbumList albumName={albumName} albumPage={albumPage} setAlbumPage={setAlbumPage}  setAlbumId={setAlbumId} setAlbumName={setAlbumName} /> : <ImageList albumPage={albumPage} setAlbumPage={setAlbumPage} albumId={albumId} albumName={albumName} />}

    </div>
  );
}

export default App;
