export function createPersonName(person) {
    const {firstName, lastName, patronymic} = person;
    let name = "";
    if(lastName) {
        name+=lastName;
        if(firstName) name+= " " + firstName[0] + ".";
        if(patronymic) name+=patronymic[0] + ".";
    } else if (firstName) {
        name+=firstName;
        if(patronymic) name+= " " + patronymic;
    }
    return name;
}

export function createFullPersonName(personData) {
    const {firstName, lastName, patronymic} = personData || {};
    return ((lastName ?? "") + ' ' + (firstName ?? "") + ' ' + (patronymic ?? "")).trim();
}
 
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
