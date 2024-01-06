import React, { useEffect, useState } from 'react';
import styles from './imagelist.module.css';
import SpinnerCom from '../Spinner.jsx';
import Carosuel from '../Carosuel/Carosuel.jsx';
import ImageFrom from '../ImageFrom/ImageForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onSnapshot, collection, deleteDoc, doc } from 'firebase/firestore';
import db from '../../firebaseInit.js';
import back from '../../images/back.png';
import search from '../../images/search.png';
import clear from '../../images/clear.png';
import edit from '../../images/edit.png';
import trash from '../../images/trash-bin.png';

function ImageList({ albumPage, setAlbumPage, albumId, albumName }) {
  const [inputShow, setInputShow] = useState(true);
  const [addImage, setAddImage] = useState(false);
  const [imagelist, setImageList] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [dataUpdate, setDataUpdate] = useState(false);
  const [imgId, setImgId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [onClose, setOnClose] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'albumsimages'), (snapShot) => {
      const albumslist = snapShot.docs
        .filter((doc) => doc.data().albumId === albumId)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setImageList(albumslist);
      setLoading(false);
    });


  }, [albumId]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setOnClose(false); // Open the carousel
  };

  const eeditButton = (e, id) => {
    e.preventDefault();
    setAddImage(true);
    setImgId(id);
    const imgNeedToEdit = imagelist.find((img) => id === img.id);
    setTitle(imgNeedToEdit.title);
    setUrl(imgNeedToEdit.imageurl);
    setDataUpdate(true);
    // toast.success(`Image added successfully`);
  };

  const deleteButton = async (e, id) => {
    e.preventDefault();
    const albumImage = doc(db, 'albumsimages', id);

    try {
      await deleteDoc(albumImage);
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className={styles.container}>
      <>
        <ToastContainer />
        {addImage ? (
          <ImageFrom
            albumName={albumName}
            setAlbumPage={setAlbumPage}
            albumId={albumId}
            setTitle={setTitle}
            setUrl={setUrl}
            url={url}
            title={title}
            dataUpdate={dataUpdate}
            setDataUpdate={setDataUpdate}
            imgId={imgId}
            setImgId={setImgId}
          />
        ) : null}

        <div className={styles.topImageBox}>
          <div className={styles.leftSide}>
            <img src={back} alt="back" onClick={() => setAlbumPage(!albumPage)} />
            {imagelist.length > 0 ? (
              <span>{`Images in ${albumName}`}</span>
            ) : (
              <span>No image found in {albumName}</span>
            )}
          </div>
          <div className={styles.rightSide}>
            <input
              type="text"
              placeholder="Search..."
              style={{ display: inputShow ? 'none' : 'block' }}
            />
            <img src={inputShow ? search : clear} alt="search" onClick={() => setInputShow(!inputShow)} />
            <button
              onClick={() => setAddImage(!addImage)}
              style={{
                border: `1px solid ${addImage ? 'red' : 'blue'}`,
                color: addImage ? 'red' : 'blue',
              }}
            >
              {addImage ? 'Cancel' : 'Add Image'}
            </button>
          </div>
        </div>
        {loading ? (
          <SpinnerCom />
        ) : (
          <div className={styles.imageBoxes}>
            {imagelist &&
              imagelist.map((img) => (
                <div
                  className={styles.list}
                  key={img.id}
                
                >
                  <div className={styles.buttons}>
                    <button>
                      <img src={edit} onClick={(e) => eeditButton(e, img.id)} alt="" />
                    </button>
                    <button>
                      <img src={trash} onClick={(e) => deleteButton(e, img.id)} alt="" />
                    </button>
                  </div>
                  <div className={styles.boxContent}   onClick={() => handleImageClick(img)}>
                    <div className={styles.folderImageBox}>
                      <img src={img.imageurl} alt="folderimage" />
                    </div>
                    <h2>{img.title}</h2>
                  </div>
                </div>
              ))}
          </div>
        )}
        {selectedImage && (
          <Carosuel
            imageList={imagelist} setOnClose={setOnClose}
            selectedImage={selectedImage} setSelectedImage={setSelectedImage}
            onClose={onClose}
          />
        )}
      </>
    </div>
  );
}

export default ImageList;
