import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useRef, useEffect } from 'react';
import styles from './albumform.module.css';
import { doc, setDoc, collection } from "firebase/firestore";
import db from '../../firebaseInit.js';

function AlbumFrom({ albumName, albumForm, setAlbumForm }) {
    const [name, setName] = useState('');
    const titleRef = useRef(null);

    useEffect(() => {
        titleRef.current.focus();
    }, []);

    async function addData(e) {
        e.preventDefault();
        const docRef = doc(collection(db, "albums"));

        await setDoc(docRef, {
            name: name
        });
        
        setName('');
        setAlbumForm(true);
        toast.success(`${name} created successfully`)
    }
    function clearData(e){
        e.preventDefault();
        titleRef.current.focus()
        setName("");
        setAlbumForm(true);
    }


    return (
        <div className={styles.formBox}>
            <h2>Create an album</h2>
            <form className={styles.forms}>
                <input
                    ref={titleRef}
                    type="text"
                    placeholder='Album name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={(e) => clearData(e)}>Clear</button>
                <button onClick={(e) => addData(e)}>Create</button>
            </form>
        </div>
    );
}

export default AlbumFrom;
