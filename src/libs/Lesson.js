import firebase from 'firebase';

export function getLesson(callback){
    const db = firebase.firestore()
    db.settings({
        timestampsInSnapshots : true
    });
    db.collection("lesson").get()
    .then((snapshot) => {
        let les_list = []
        snapshot.forEach((doc) => {
            // console.log(doc.id, '=>', doc.data());
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

export function addLesson() {
    const db = firebase.firestore();
      db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection("lesson").add({
      course: this.state.course,
      lesson: this.state.lesson,
      schedule: this.state.schedule,
      teacher: this.state.teacher
    });
    this.setState({
      course: "",
      lesson: "",
      schedule: "",
      teacher: ""
    });
  };
