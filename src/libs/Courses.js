import firebase from 'firebase';
import { initFirebase } from './firebase';

export function getCourses(callback){
    const db = firebase.firestore()
    db.settings({
        timestampsInSnapshots : true
    });
    db.collection("program").get()
    .then((snapshot) => {
        let cou_list = []
        snapshot.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data());
            cou_list.push({
                id: doc.id,
                data: doc.data()
            });
        });
        callback(cou_list);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
};

export function getCoursesDetails(id_num) {
    console.log(id_num);
    return new Promise((resolve, reject) => {
        initFirebase();
        const db = firebase.firestore();
        let query = db.collection("program").doc(id_num);
        query.get().then((doc) => {
            if (!doc.exists)
                resolve(null);
            else
                resolve(doc.data());
        })
        .catch((error) => {
            reject(error);
        })
    })

}

export function setCoursesDetails(id_num, subject, curriculum, level) {
    console.log(id_num);
    initFirebase();
    const db = firebase.firestore();
    let query = db.collection("program").doc(id_num);
    query.set({
        subject,curriculum, level
    });

}