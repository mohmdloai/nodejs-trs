const makePartial= (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  for (const k of Object.keys(obj)) {
    obj[k] = obj[k] ?? {}; // Make each key optional
    if (typeof obj[k] === 'object') {
      makePartial(obj[k]);
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
  }
};
const partialUser = makePartial(user);
console.log(partialUser);