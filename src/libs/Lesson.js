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

export function addLesson(lesson_name, program_id, teacher_id, classroom_id, scheduleList)
{
	return new Promise((resolve, reject) => {
		const db = firebase.firestore();
		db.collection("lesson").add({
			program: db.collection("program").doc(program_id),
			name: lesson_name,
			classroom: db.collection("classroom").doc(classroom_id),
			teacher: db.collection("user").doc(teacher_id),
			schedule: scheduleList
		})
		.then((docRef) => {
			resolve(docRef);
		})
		.catch((err) => {
			reject(err);
		})
	}) 
}
