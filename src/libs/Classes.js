import firebase from 'firebase';

export function getClasses(){
    return new Promise((resolve, reject) => {
        const db = firebase.firestore()
        db.collection("classes").get()
        .then((snapshot) => {
            let class_list = []
            snapshot.forEach((doc) => {
                class_list.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            resolve(class_list);
        })
        .catch((err) => {
            reject(err);
        });    
    })
};

export function getClassStudents(classId){
    return new Promise((resolve, reject) => {
        const db = firebase.firestore()
        db.collection("classes").doc(classId).get()
        .then((snapshot) => {
            if (snapshot.exists)
            {                
                let data = snapshot.data();
                let class_data = {id: classId, data: {name: data.name, students: []}};
                if (data.students && data.students.length > 0)
                {
                    let promises = data.students.map((student) => {
                        return student.get();
                    })
                    Promise.all(promises).then((queries) => {
                        for (let i=0; i < queries.length; ++i)
                        {
                            class_data.data.students.push({
                                id: queries[i].id,
                                data: queries[i].data()
                            })
                        }
                        resolve(class_data);
                    })
                    .catch((err)=> {
                        resolve(class_data);
                    })
                }
                else
                {
                    resolve(class_data);
                }
            }
            else
            {
                resolve(null);
            }
        })
        .catch((err) => {
            reject(err);
        });    
    })
};

export function addClasses (name, students) {
    const db = firebase.firestore();
    let student_array = [];
    if (students)
    {
        student_array = students.map((student) => {
            if (typeof student != 'object')
            {
                return db.collection('user').doc(student);
            }
            return student;
        });
    }

    db.collection("classes").add({
      name: name,
      students: student_array
    });
}
