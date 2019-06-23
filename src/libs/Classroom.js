import firebase from 'firebase';

export function getClass(callback){
    const db = firebase.firestore()
    db.collection("classes").get()
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
        let query = db.collection("classes").doc(id_num);
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
    let query = db.collection("classes").doc(id_num);
    query.set({
        name, capacity
    });

}

export function addClassroom () {
    const db = firebase.firestore();
    db.collection("classes").add({
      name: this.state.name,
      capacity: this.state.capacity,
    });
    this.setState({
      name: "",
      capacity: "",
    });
}
