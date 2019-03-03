import firebase from 'firebase';
import { get } from 'https';

export function getBranch(callback) {
    const db = firebase.firestore();
        db.settings({
        timestampsInSnapshots: true
    });
    db.collection("branch").get()
    .then((snapshot) => {
        let branch_list = []
        snapshot.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data());
            branch_list.push({
                id: doc.id,
                data: doc.data()
            });
        });
        callback(branch_list);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
};