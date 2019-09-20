import firebase from 'firebase';

/*
    Example: 
    getCourseMarkByLesson(SessionData.academic, [Specific Lesson Id], [specific student id]).then((mark_list) => {
        console.log(mark_list);
    });
*/
export function getCourseMarkByLesson(academic, lesson, student){

    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        let query = db.collection("mark");

        if (academic)
            query = query.where('academic', '==', db.collection('academic').doc(academic))

        if (lesson)
            query = query.where('lesson', '==', db.collection('lesson').doc(lesson))
        
        if (student)
            query = query.where('student', '==', db.collection('user').doc(student));

        query.get()
        .then((snapshot) => {
            let mark_list = [];
            let data_promise = [];
            
            snapshot.forEach((doc) => {
                data_promise.push(new Promise((main_resolve, main_reject) => {

                    let mark = { id: doc.id, data: { mark: doc.data().mark } };
                    let promise_query = [];
    
                    if (doc.data().student)
                        promise_query.push(doc.data().student.get())
    
                    if (doc.data().lesson)
                        promise_query.push(doc.data().lesson.get())
    
                    if (promise_query.length > 0)
                    {
                        Promise.all(promise_query).then((result) => {
                            for(let i=0; i < result.length; ++i)
                            {
                                if (result[i].ref.path.substr(0, 5) == 'user/')
                                {
                                    mark.data.student = {
                                        id: result[i].id,
                                        data: result[i].data()
                                    };
                                }
                                else if (result[i].ref.path.substr(0, 7) == 'lesson/')
                                {
                                    mark.data.lesson = {
                                        id: result[i].id,
                                        data: result[i].data()
                                    };
                                }
                            }
                            main_resolve(mark);
                        })
                        .catch((err) => {
                            main_reject(err);
                        })                    
                    }
                    else
                    {
                        main_resolve(mark);
                    }
                }));
            });
            
            Promise.all(data_promise).then((mark_data) => {
                for(let i = 0; i < mark_data.length; ++i)
                {
                    mark_list.push(mark_data[i]);
                }
                resolve(mark_list);
            })
        })
        .catch((err) => {
            console.log('Error getting documents', err);
            reject(err);
        });
    })
};
