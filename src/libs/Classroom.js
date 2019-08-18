import firebase from 'firebase';

export function getClassroom(callback){
    const db = firebase.firestore()
    db.collection("classroom").get()
    .then((snapshot) => {
        let class_list = []
        snapshot.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data());
            class_list.push({
                id: doc.id,
                data: doc.data()
            });
        });
        callback(class_list);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
};

export function getClassDetails(id_num) {
    console.log(id_num);
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        let query = db.collection("classroom").doc(id_num);
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

export function setClassDetails(id_num, name, capacity) {
    console.log(id_num);
    const db = firebase.firestore();
    let query = db.collection("classroom").doc(id_num);
    query.set({
        name, capacity
    });

}

export function addClassroom (organization, name, capacity) {
    const db = firebase.firestore();

    if (typeof organization != 'object')
        organization = db.collection('organization').doc(organization);
    db.collection("classroom").add({
      name,
      capacity,
      organization
    });

}
