import firebase from 'firebase';

export function getPayment(callback){
    const db = firebase.firestore()
    db.collection("payment").get()
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