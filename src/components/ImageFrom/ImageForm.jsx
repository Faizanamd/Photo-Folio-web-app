import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './imagefrom.module.css';
import { doc, setDoc, collection } from "firebase/firestore";
import db from '../../firebaseInit.js';
import { useEffect, useRef, useState } from 'react';
import { onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";


function ImageFrom({ albumName, setAlbumPage, albumId, title, setTitle, url, setUrl, dataUpdate, setDataUpdate, imgId, setImgId }) {
    console.log("title", title, "seruRl", url);
    const titleRef = useRef(null);
    useEffect(() => {
        titleRef.current.focus();
    }, []);

    async function addData(e) {
        e.preventDefault();
        titleRef.current.focus();
        const docRef = doc(collection(db, "albumsimages"));

        try {
            await setDoc(docRef, {
                albumId: albumId,
                imageurl: url,
                title: title
            });
            setUrl('');
            setTitle('');
            setAlbumPage(false);
            toast.success('Image added successfully!');
        } catch (error) {
            console.error("Error adding document:", error);
            toast.error('Failed to add image. Please try again.');
        }
    }

    function clearData(e) {
        e.preventDefault();
        titleRef.current.focus();
        setUrl('');
        setTitle('');
        setAlbumPage(false);
    }

    async function updateDataMethod(e, id) {
        e.preventDefault();
        const albumImageRef = doc(db, "albumsimages", id);

        try {
            await updateDoc(albumImageRef, { title: title, imageurl: url });
            console.log("Document updated successfully");
            setDataUpdate(false);
            setUrl('');
            setTitle('');
            setAlbumPage(false);
            toast.success('Image updated successfully!');
        } catch (error) {
            console.error("Error updating document:", error);
            toast.error('Failed to update image. Please try again.');
        }
    }

    return (
        <div className={styles.container}>
            <h2>{dataUpdate ? "Update image to folder " : "Add image to folder"}{albumName}</h2>
            <form className={styles.imageFrom}>
                <input ref={titleRef} value={title} type="text" placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
                <input value={url} type="text" placeholder='Image URL' onChange={(e) => setUrl(e.target.value)} />
                <div className={styles.buttons}>
                    <button onClick={(e) => clearData(e)}>Clear</button>
                    {dataUpdate ? <button onClick={(e) => updateDataMethod(e, imgId)}>Update</button> : <button onClick={(e) => addData(e)}>Add</button>}
                </div>
            </form>
        </div>
    );
}

export default ImageFrom;
