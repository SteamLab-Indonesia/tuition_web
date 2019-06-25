class SessionData {
    userId = null;
    username = '';
    email = '';
    userData = {};
    organizationId = null;
    organizationName = 'STEAMLAB';
    branch = [];
    activeBranch = '';

    constructor(data)
    {
        if (data.userId)
            this.userId = data.userId;
        if (data.userData)
            this.userData = data.userData;
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
    }

    isPermissionLevel = (permission_level) => {
        if (this.userData)
        {
            return (this.userData.permission === permission_level)
        }
        return false;
    }
}

let _sessionData = new SessionData({});

export function setData(organizationId, organizationName, branch, userId, userData)
{
    _sessionData = new SessionData({
        organizationId, organizationName, userId, userData, branch
    });
}

export function setOrganization(organizationId, organizationName)
{
    _sessionData.organizationId = organizationId;
    _sessionData.organizationName = organizationName;
}

export function setActiveBranch(branch)
{
    _sessionData.activeBranch = branch;
}

export {_sessionData as default};

