// Pick, Omit, Exclude, Extract

interface Profile {
  name: string;
  age: number;
  married: boolean;
}

// Pick type 직접 만들기
type MyPick<T, S extends keyof T> = {
  // S는 T의 속성이어야 함
  [key in S]: T[key];
};

// Omit type 직접 만들기
type MyOmit<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>;
// 제한 조건
// S extends key of any -> 인터페이스 형식에 맞춰 S는 string, number, symbol 만 오게 하려면 keyof any 조건이 있어야 함
// keyof any : 객체의 인덱스로 사용할 수 있는 string, number, symbol을 나타냄

const person: Profile = {
  name: "nuri",
  age: 27,
  married: true,
};
const person2: Pick<Profile, "name" | "age"> = {
  // Pick: 입력한 일부 key값만 가져올 수 있는 것
  name: "som",
  age: 10,
};
const person3: Omit<Profile, "name"> = {
  // Omit: 입력한 key값을 제외한 나머지를 가져오는 것
  age: 11,
  married: true,
};

// Pick type 만들기
const person4: MyPick<Profile, "name" | "age"> = {
  // T: Profile, S: 'name' | 'age'
  name: "kkk",
  age: 20,
};

// Exclude : key 들에서 빼고 싶은 것을 입력해서 사용
// Extract
type MyExclude = Exclude<keyof Profile, "married">;

type Animal = "Cat" | "Dog" | "Human";
type Mammal = Exclude<Animal, "Human">; // 'Cat' | 'Dog'
type Human2 = Extract<Animal, "Cat" | "Dog">; // 'Cat' | 'Dog'

// Omit Type 만들기
const person5: MyOmit<Profile, "name"> = {
  // Omit: 입력한 key값을 제외한 나머지를 가져오는 것
  age: 11,
  married: true,
};
