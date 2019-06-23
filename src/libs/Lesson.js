import firebase from 'firebase';

export function getLesson(callback){
    const db = firebase.firestore()
    db.collection("lesson").get()
    .then((snapshot) => {
        let les_list = []
        snapshot.forEach((doc) => {
            les_list.push({
                id: doc.id,
                data: doc.data()
            });
        });
        callback(les_list);
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });
};

export function addLesson(name, program, schedule, teacher) {
  return new Promise((resolve, reject) => {
    const db = firebase.firestore();
    db.collection("lesson").add({
      program,
      name,
      schedule,
      teacher
    }).then((res) => {
      resolve("ok");
    }).catch((err) => {
      reject(err);
    })
  })
};
