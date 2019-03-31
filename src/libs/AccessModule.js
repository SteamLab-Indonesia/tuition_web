export default class AccessModule{
    getModules=(callback)=>{
        const db = firebase.firestore();
        db.settings({
      timestampsInSnapshots: true
    });
        db.collection("accessmodules").get()
        .then((snapshot) => {
        snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        callback(snapshot)
    });
  })
        .catch((err) => {
        console.log('Error getting documents', err);
  });
    
    }
}