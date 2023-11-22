export const generateUserErrorInfo = (user) => {
    return `One or more properties were imcomplete or not valid:
    List of required propertires:
    email: needs to be a string, received ${user.email}`
}