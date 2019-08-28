import firebase from 'firebase';

export function getAcademicYear(organization){
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        db.collection("academicYear")
        .where('organization', '==', db.collection('organization').doc(organization))
        .get().then((snapshot) => {
            let academic_list = []
            snapshot.forEach((doc) => {
                academic_list.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            resolve(academic_list);
        })
        .catch((err) => {
            reject(err);
        });    
    })
};

export function addAcademicYear (organization, name, start,  end) {
    const db = firebase.firestore();
    if (typeof organization != 'object')
    {
        organization = db.collection('organization').doc(organization);
    }

    db.collection("classes").add({
        organization,
        name,
        start,
        end
    });
}