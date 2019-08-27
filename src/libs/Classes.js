import firebase from 'firebase';

// Example:
// getClasses('JpjAeIo5gg1iHvSbQ6oO', 'JNhQ3mCopmWazIuOkx4H').then((classes) => {
//     console.log(classes);
// });
export function getClasses(organization, academic){
    return new Promise((resolve, reject) => {
        const db = firebase.firestore()
        db.collection("classes")
        .where('organization', '==', db.collection('organization').doc(organization))
        .where('academic', '==', db.collection('academicYear').doc(academic))
        .get().then((snapshot) => {
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
                let class_data = {
                    id: classId, 
                    data: {
                        name: data.name,
                        academic: data.academic,
                        label: data.label,
                        students: []
                    }
                };
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

// Example:
// 		
// addClasses('JpjAeIo5gg1iHvSbQ6oO', 'JNhQ3mCopmWazIuOkx4H', 'P4-Mesir', ['t123cqwr', 'afrasfzdv']);

export function addClasses (organization, academic, name, students, classroom, label) {
    const db = firebase.firestore();
    let student_array = [];

    if (typeof organization != 'object')
    {
        organization = db.collection('organization').doc(organization);
    }
    if (typeof academic != 'object')
    {
        academic = db.collection('academicYear').doc(academic);
    }
    if (typeof classroom != 'object')
    {
        classroom = db.collection('classroom').doc(classroom);
    }
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
        organization,
        academic,
        name,
        students: student_array,
        classroom,
        label: label ? label : ''
    });
}
