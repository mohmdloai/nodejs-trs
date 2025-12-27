const makePartial= (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  for (const k of Object.keys(obj)) {
    obj[k] = obj[k] ?? {}; // Make each key optional
    console.log(obj[k]); // Log the value of each key
    if (typeof obj[k] === 'object') {
      makePartial(obj[k]);
      // console.log(obj[k]); // Log the value of each key after recursion
    }
  }
  return obj;
}
const user = {
  name: "Amr",
  age: 30,
  address: {
    street: "123 El3sloggey St",
    city: "El3sloggey"
  },
  Locations: {
    club: "Zag club ",
    membership: "member of Zag club"
  }
};
const partialUser = makePartial(user);
console.log(partialUser);