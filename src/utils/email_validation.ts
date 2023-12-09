export function validateEmail(email: string) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
}

export function isGmailFormat(email: string) {
    const regex = /^.+@gmail\.com$/i;
    return regex.test(email);
}