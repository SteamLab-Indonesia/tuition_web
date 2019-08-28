import ls from 'local-storage';

class SessionData {
    userId = null;
    username = '';
    email = '';
    userData = {};
    organizationId = null;
    organizationName = 'STEAMLAB';
    branch = [];
    academic = 'JNhQ3mCopmWazIuOkx4H';
    activeBranch = '';

    constructor(data)
    {
        if (data.userId)
            this.userId = data.userId;
        if (data.username)
            this.username = data.username;
        if (data.email)
            this.email = data.email;
        if (data.organizationId)
            this.organizationId = data.organizationId;
        if (data.organizationName)
            this.organizationName = data.organizationName;
        if (data.branch)
            this.branch = data.branch;
        if (data.academic)
            this.academic = data.academic;
    }

    isPermissionLevel = (permission_level) => {
        if (this.userData)
        {
            return (this.userData.permission === permission_level)
        }
        return false;
    }

    saveSession = () => {
        ls.set('userId', this.userId);
        ls.set('username', this.username);
        ls.set('email', this.email);
        ls.set('organizationId', this.organizationId);
        ls.set('organizationName', this.organizationName);
        ls.set('branch', this.branch);
        ls.set('academic', this.academic);
    }

    getSession = () => {
        this.userId = ls.get('userId');
        this.username = ls.get('username');
        this.email = ls.get('email');
        this.organizationId = ls.get('organizationId');
        this.organizationName = ls.get('organizationName');
        this.branch = ls.get('branch');
        this.academic = ls.get('academic');
    }
}

let _sessionData = new SessionData({});
_sessionData.getSession();

export function setData(organizationId, organizationName, branch, userId, username)
{
    _sessionData = new SessionData({
        organizationId, organizationName, userId, username, branch
    });
    _sessionData.saveSession();
}

export function setOrganization(organizationId, organizationName)
{
    _sessionData.organizationId = organizationId;
    _sessionData.organizationName = organizationName;
    _sessionData.saveSession();
}

export function setActiveBranch(branch)
{
    _sessionData.activeBranch = branch;
    _sessionData.saveSession();
}

export function setAcademicYear(academic)
{
    _sessionData.academic = academic;
    _sessionData.saveSession();
}
export {_sessionData as default};

