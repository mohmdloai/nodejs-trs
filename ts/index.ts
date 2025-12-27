//Compatibility is based on shape:
type User = { id: number };
type Emp = { id: number };
const admin: User = { id: 4 };
const user: Emp = admin;  // -> allowed in ts as same shape
// Some to notice :
// T extends X ==> instanceof , at runtime
// ;
// keyof  ==> Object.keys , at runtime

/*
TypeScript:
- Describes shapes
- Constrains usage
- Prevents invalid states
- Exists only before execution
*/


// utility types :
// Makes all properties in an object optional.
//  Great for "update" functions where you only change a few fields.
interface Person {
  id: string;
  name: string;
  email: string;
  age: number;
} 
//PROBLEM: Update API should accept ANY subset of fields
function updatePerson(id: string , data: Partial<Person>){
  // data = { name: "Alice" } => Only changed fields needed.
}
// Edge case for partial, Nested partials require explicit handling

// For nest partials:Nested partials require explicit handling:
/*
What does it do :

it takes the computed key [] and apply ? 
*/
type ForceDeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? ForceDeepPartial<T[K]> : T[K];
};
// and if :
interface Config {
  database: { host: string; port: number };
  cache: { ttl: number };
}
//ForceDeepPartial<Config>;//makes nested fields optional too

function updateConfig(config: Config, partialConfig: ForceDeepPartial<Config>) {
  // Update the config object with the partialConfig
  // database?: { host?: string; port?: number };
}
/**
type ForceDeepPartial<T> = {  
  [K in keyof T]?:              // 1. Loop and make this key optional
    T[K] extends object         // 2. IF the value is an object...
    ? ForceDeepPartial<T[K]>    // 3. ...Run the whole process again ON THE VALUE
    : T[K];                     // 4. ELSE, just use the value as it is (string, number, etc.)
};
// Breaking it down agan:
// [K in keyof T]       - Loop through each key in T
// [K in keyof T]?      - Make each key optional (the ? after the key)
// : T[K]               - The value type is T[K] (type of that key)
// T[K] extends object  - Check if the value type is an object
// ? ForceDeepPartial<T[K]> - If yes, recursively apply ForceDeepPartial
// : T[K]               - If no, just use the original type
 */
// for the position of ? operator 
// AFTER the key name = optional property
type Optional<T> = {
  [K in keyof T]?: T[K]  // Makes the PROPERTY optional
}
// Result: { name?: string }  - property may or may not exist

// AFTER the type = optional type (nullable)
type Nullable<T> = {
  [K in keyof T]: T[K] | undefined  // Makes the VALUE optional
}
// Result: { name: string | undefined }  - property must exist, but can be undefined

// Both:
type Both<T> = {
  [K in keyof T]?: T[K] | undefined
}
// Result: { name?: string | undefined }
console.log(user.id);