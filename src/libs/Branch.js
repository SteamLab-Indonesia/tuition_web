import firebase from 'firebase';
import { get } from 'https';

export default class Branch {
    getBranch = (callback) => {
        const db = firebase.firestore();
            db.settings ({
                timestampsInSnapshots : true
            });
        db.collection('users').get()
            .then((snapshot) => {
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
            });
        })
        .catch((err) => {
            console.log('Error getting documents', err);
        });
    }
}