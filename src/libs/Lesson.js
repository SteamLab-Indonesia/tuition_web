import firebase from 'firebase';

export function getLessons(programId) {
	return new Promise((resolve, reject) => {
		if (programId)
		{
			const db = firebase.firestore();
			db.collection("lesson")
			.where('program', '==', db.collection('program').doc(programId)).get()
			.then((snapshot) => {
				let lesson_list = [];
				let list_query = [];
				for(let i=0; i < snapshot.docs.length; ++i)
				{
					let doc = snapshot.docs[i];
					let lesson_details = [];
					let lesson = doc.data();
					if (lesson)
					{
						lesson_list.push({
							id: doc.id,
							data: {
								name: lesson.name,
								schedule: lesson.schedule
							}
						});												
						if (lesson.program)
							lesson_details.push(lesson.program.get());
						if (lesson.teacher)
							lesson_details.push(lesson.teacher.get());
						if (lesson.classroom)
							lesson_details.push(lesson.classroom.get());
						list_query.push(Promise.all(lesson_details));
					}					
				}
				Promise.all(list_query).then((result) => {
					for(let i=0; i < result.length; ++i)
					{
						for (let j=0; j < result[i].length; ++j)
						{
							console.log(result[i][j].ref.path);
							if (result[i][j].ref.path.substr(0, 8) === 'program/')
								lesson_list[i].data.program = result[i][j].data();
							else if (result[i][j].ref.path.substr(0, 5) === 'user/')
								lesson_list[i].data.teacher = result[i][j].data();
							else if (result[i][j].ref.path.substr(0, 10) === 'classroom/')
								lesson_list[i].data.classroom = result[i][j].data();
						}
					}
					resolve(lesson_list);
				})
				.catch((err) => {
					reject(err);
				})
			})
			.catch((err) => {
				console.log('Error getting documents', err);
			});
		}
		else
		{
			reject('Incorrect programId:' + programId);
		}
	});
}

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

export function getLessonDetails(lessonId) {
    return new Promise((resolve, reject) => {
		if (lessonId)
		{
			const db = firebase.firestore();
			db.collection("lesson").doc(lessonId).get()
			.then((snapshot) => {
				console.log(snapshot);
				// let list_query = [];
					let lesson_details = [];
					let lesson = snapshot.data();
					let ret_lesson = {};
					if (lesson)
					{
						ret_lesson.id = snapshot.id;
						ret_lesson.data = {};
						ret_lesson.data.name = lesson.name;	
						ret_lesson.data.schedule = lesson.schedule;									
						if (lesson.program)
							lesson_details.push(lesson.program.get());
						if (lesson.teacher)
							lesson_details.push(lesson.teacher.get());
						if (lesson.classroom)
							lesson_details.push(lesson.classroom.get());
						Promise.all(lesson_details).then((details) => {
							console.log(details);
							for(let i=0; i < details.length; ++i)
							{
								if (details[i].ref.path.substr(0, 8) === 'program/')
								{
									ret_lesson.data.program = {};
									ret_lesson.data.program.id = details[i].ref.path.substr(8);
									ret_lesson.data.program.data = details[i].data();
								}									
								if (details[i].ref.path.substr(0, 5) === 'user/')
								{
									ret_lesson.data.teacher = {};
									ret_lesson.data.teacher.id = details[i].ref.path.substr(5);
									ret_lesson.data.teacher.data = details[i].data();
								}
								if (details[i].ref.path.substr(0, 10) === 'classroom/')
								{
									ret_lesson.data.classroom = {};
									ret_lesson.data.classroom.id = details[i].ref.path.substr(10);
									ret_lesson.data.classroom.data = details[i].data();
								}
							}	
							resolve(ret_lesson);				
						})
					}					
			})
			.catch((err) => {
				console.log('Error getting documents', err);
			});
		}
		else
		{
			reject('Incorrect lessonId:' + lessonId);
		}
	});
}

export function setLessonDetails(id_num, lesson_name, program_id, teacher_id, classroom_id, scheduleList) {
    console.log(id_num);
	const db = firebase.firestore();
	return new Promise((resolve, reject) => {
		let query = db.collection("lesson").doc(id_num);
		query.set({
			program: db.collection("program").doc(program_id),
			name: lesson_name,
			classroom: db.collection("classroom").doc(classroom_id),
			teacher: db.collection("user").doc(teacher_id),
			schedule: scheduleList
		})
		.then((result) => {
			console.log(result);
			resolve(result);
		})
		.catch((err) => {
			console.log(err);
			reject(err);
		})
	
	})

}