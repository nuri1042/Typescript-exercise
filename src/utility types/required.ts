// Required, Record, NonNullable

interface Profile3 {
  name?: string;
  age?: number;
  married?: boolean;
}

// Required type 직접 만들기
type MyRequired<T> = {
  [key in keyof T]-?: T[key]; // 다른 key를 가져올 때, '-?' : optional 을 전부 제거하라는 뜻, '-readonly' : readonly 가 붙어있는 건 전부 제거
};

// Readonly type
type MyReadonly<T> = {
  readonly [key in keyof T]: T[key];
};

// Required : 속성들을 전부 필수로 사용해야 할 때
const name2: MyRequired<Profile3> = {
  name: "nuri",
  age: 3,
  married: false,
};

const name3: MyReadonly<Profile3> = {
  // Readonly : 읽기 전용, 수정 불가
  name: "nuri",
  age: 3,
  married: false,
};
name3.name = "kim"; // error

// Record : 객체를 표현하는 한가지 방법
interface Obj {
  [key: string]: number;
}
// 기존
const recA: Obj = { a: 3, b: 5 };
// Record 사용해서 위의 인터페이스를 간단하게 표현하는 방법
const recB: Record<string, number> = { a: 7, b: 10 };

// Record 직접 만들기
type Rec<T extends keyof any, S> = {
  [key in T]: S;
};
const recC: Rec<string, number> = { a: 7, b: 10 };

// NonNullable : null, undefined 빼고 가져오고 싶을 떄
type nonA = string | number | boolean | undefined | null;
type nonB = NonNullable<nonA>;

// NonNullable type 직접 만들기
type Non<T> = T extends null | undefined ? never : T; // string | boolean | number
