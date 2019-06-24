import firebase from 'firebase';

export class Branch {
    name = '';
    email = '';
    url = '';
    address = '';
    phones = [];

    constructor(branch)
    {
        if (branch)
        {
            this.name = branch.name;
            if (branch.email)
                this.email = branch.email;
            if (branch.url)
                this.url = branch.url;
            if (branch.address)
                this.address = branch.address;
            if (branch.phones)
                this.phones = branch.phones;
        }
    }

    toJson = () => {
        return {
            name: this.name,            
            email: this.email,
            url: this.url,            
            address: this.address,
            phones: this.phones,
        }
    }
}

export class Organization extends Branch {

    branches = [];

    constructor(organization)
    {
        super(organization);
        if (organization.branches)
            this.branches = organization.branches;
    }

}

export function getOrganization() {
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        db.collection("organization").get()
        .then((snapshot) => {
            let org_list = [];
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                org_list.push({
                    id: doc.id,
                    data: doc.data()
                });
            });
            resolve(org_list);
        })
        .catch((err) => {
            reject(err);
        });
    })
};

export function addOrganization(organization)
{
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        db.collection('organization').add(organization.toJson())
        .then((orgRef) => {
            resolve(orgRef);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

export function addBranch(organization_id, branch)
{
    return new Promise((resolve, reject) => {
        const db = firebase.firestore();
        db.collection('organization').doc(organization_id)
            .update({ branches: firebase.firestore.FieldValue.arrayUnion(branch.toJson())})
        .then((orgRef) => {
            resolve(orgRef);
        })
        .catch((err) => {
            reject(err);
        })
    })
}
