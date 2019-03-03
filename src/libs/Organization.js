import firebase from 'firebase';


export function getOrganization(callback) {
    const db = firebase.firestore();
        db.settings({
        timestampsInSnapshots: true
    });
    db.collection("organization").get()
    .then((snapshot) => {
        let org_list = []
        snapshot.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data());
            org_list.push({
                id: doc.id,
                data: doc.data()
            });
        });
        callback(org_list);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
};

// module.exports = {
//     getOrganization
// };
