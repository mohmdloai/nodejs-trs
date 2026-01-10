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
/*Form of identity fn to the [K in keyof T]: T[K] */
// Most literal translation of [K in keyof T]: T[K]
/*function identity(obj) {
  const result = {};
  
  // [K in keyof T]
  for (const K in obj) {
    // : T[K]
    result[K] = obj[K];
  }
  
  return result;
}
//OR
function identity(obj) {
  return Object.keys(obj).reduce((result, K) => {
    // [K]: T[K]
    result[K] = obj[K];
    return result;
  }, {});
}
//or
function identity(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([K, value]) => [K, value])
  );
}
function identity(obj) {
  return { ...obj };
}
*/
interface UserForm {
  email?: string;
  password?: string;
  username?: string;
}
let oneUser : Required<UserForm> = {
  password: 'password',
  email: 'user@example.com',
  username: 'user'
};
// PROBLEM: Before saving to DB, all fields MUST be present:
  // db.save(data);// safe insertion;
function saveUser(data: Required<UserForm>){
   console.log('Saving user:', data);
}
// make your validation pipeline ::
function validateAndSave(draft: UserForm) {
  if (!draft.email || !draft.password || !draft.username) {
    throw new Error("Missing required fields");
    
  }
  saveUser(draft as Required<UserForm>);// assert after checking
  // or use this guards:
  /*
  // Version 1: With !!
  function isComplete1(form: UserForm): form is Required<UserForm> {
    return !!form.email && !!form.password && !!form.name;
  }
  
  // Version 2: Without !! (same result)
  function isComplete2(form: UserForm): form is Required<UserForm> {
    return form.email && form.password && form.name;
  } */
  
}
validateAndSave(oneUser);
saveUser(oneUser);

//Readonly<Type> — The "Immutability Contract":
function loadConfig(): AppConfig {
  return {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
  };
}
// // FOUNDATION: Shared configuration object
interface AppConfig {
  apiUrl: string;
  timeout: number;
  retries: number;
}
const config: Readonly<AppConfig> = loadConfig();
// ❌config.apiUrl = "https://evil.com"; // Cannot assign to 'apiUrl' because it is read-only
// CORRECT: Create new object for modifications
const devConfig: AppConfig = { ...config, apiUrl: "http://localhost" };

// console.log(user.id);
// Pick<Type, Keys> — The "Projection Operator":
/*Conceptual mapping:
Database Analogy: SELECT id, name FROM users (project specific columns)
Transformation: Extract subset of properties
Pattern: Vertical slicing of data structure */
// FOUNDATION: Full user entity
interface UserC {
  id: string;
  email: string;
  passwordHash: string;  // Sensitive to expose! 
  name: string;
  age: number;
  lastLogin: Date;
  createdAt: Date;
}
//PROBLEM: API should never expose password hash
type UserPublicProfile = Pick<UserC, 'id' | 'name' | 'age'>;
function getUserProfile(id: string): UserPublicProfile {
  const user = database.findUser(id);
  
  // ✓ Only safe fields exposed
  return {
    id: user.id,
    name: user.name,
    age: user.age,
    // passwordHash: user.passwordHash  ❌ Compile error!
  };
}
// Add this helper function before your getUser function
function pick<T extends object, K extends keyof T>(
  obj: T, 
  ...keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;//or Skip pick entirely, & use destructuring
}
// TIER 1: Public (anyone)
type PublicUser = Pick<UserC, 'id' | 'name'>;

// TIER 2: Authenticated (logged-in users)
type AuthenticatedUser = Pick<UserC, 'id' | 'name' | 'email' | 'lastLogin'>;

// TIER 3: Admin (full access)
type AdminUser = UserC;

// Access control enforced through types
function getUser(id: string, role: 'public' | 'auth' | 'admin') {
  const user = database.findUser(id);
  
  switch(role) {
    case 'public': return pick(user, 'id', 'name') as PublicUser; 
    case 'auth': return pick(user, 'id', 'name', 'email', 'lastLogin') as AuthenticatedUser;
    case 'admin': return user;
  }
}