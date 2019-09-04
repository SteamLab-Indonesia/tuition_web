import firebase from 'firebase';

export function getAnnouncement(organization){
    return new Promise((resolve, reject) => {
        const db = firebase.firestore()
        db.collection("announcement")
        .where('organization', '==', db.collection('organization').doc(organization))
        .get().then((snapshot) => {
            let announcement_list = [];
            snapshot.forEach((doc) => {
                announcement_list.push({
                    id: doc.id,
                    data: doc.data()
                });
            });

            resolve(announcement_list);
        })
        .catch((err) => {
            reject(err);
        });    
    })
};

export function addAnnouncement (organization, title, content, publisher, targetGroup, targetArray, timestamp) {
    const db = firebase.firestore();

    if (typeof organization != 'object')
    {
        organization = db.collection('organization').doc(organization);
    }
    if (typeof publisher != 'object')
    {
        publisher = db.collection('user').doc(publisher);
    }

    db.collection("announcement").add({
        organization,
        title,
        content,
        targetGroup: targetGroup ? targetGroup : 'all',
        targetArray: targetArray ? targetArray : [],
        publisher,
        timestamp: timestamp ? timestamp : firebase.firestore.Timestamp.now()
    });
}
