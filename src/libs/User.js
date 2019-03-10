import firebase from 'firebase';

export function getUser(callback) {
    const db = firebase.firestore();
    db.collection("user").get()
    .then((snapshot) => {
        let user_list = []
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
            user_list.push({
                id: doc.id,
                data: doc.data()
            });
        });
        callback(user_list);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
};