import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './albumlist.module.css'
import folder from '../../images/folder.png'
import AlbumFrom from '../AlbumForm/AlbumForm';
import {  useEffect, useState } from 'react';
import { doc, onSnapshot, collection } from "firebase/firestore";
import db from '../../firebaseInit.js'
import Spinner from 'react-spinner-material';

function AlbumList({albumName, albumPage, setAlbumPage, setAlbumId, setAlbumName }) {
    const [albumForm, setAlbumForm] = useState(false);
    const [albumList, setAlbumList] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const syncData = onSnapshot(collection(db, "albums"), (snapShot) => {
            const albumslist = snapShot.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })
            console.log("album list", albumslist);
            setAlbumList(albumslist);
            console.log("Setalbun list", albumList);
            setLoading(false);
        })
    }, [])
    const hanldeSubmitAlbum = (e) => {
        e.preventDefault();
        console.log('Submit Album button clicked');
        setAlbumForm(!albumForm);
        
    };

    return (


        <div className={styles.albumContainer}>
            <ToastContainer />
            {albumForm ? <AlbumFrom albumName={albumName} albumForm={albumForm} setAlbumForm={setAlbumForm} /> : null}
            <div className={styles.topPage}>
                <h1>Your Album</h1>
                <button
                    onClick={(e) => {
                        console.log('Add Album button clicked');
                        hanldeSubmitAlbum(e);
                    }}
                    style={{
                        border: `1px solid ${albumForm ? "red" : "blue"}`,
                        color: albumForm ? "red" : "blue"
                    }}
                >
                    {albumForm ? "Cancel" : "Add Album"}
                </button>

            </div>
            {loading ? <Spinner /> : (

                <div className={styles.albums} >
                    {albumList && albumList.map((album) => (
                        <div className={styles.list} onClick={() => {
                            setAlbumPage(!albumPage);
                            setAlbumId(album.id);
                            setAlbumName(album.name);
                        }}>
                            <div className={styles.boxContent}>
                                <div className={styles.folderImageBox}>
                                    <img src={folder} alt="folderimage" />
                                </div>
                                <h2>{album.name}</h2>
                            </div>
                        </div>
                    ))}
         
                </div>
            )
            }



        </div>
    )
}

export default AlbumList;