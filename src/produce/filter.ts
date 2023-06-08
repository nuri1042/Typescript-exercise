// filter 타입 만들기

interface Arr<T> {
  forEach(callback: (item: T) => void): void;
  map<S>(callback: (v: T, i: number) => S): S[];
  filter<S extends T>(callback: (v: T) => v is S): S[]; //custon type guard 'is' 사용
  // S 는 T의 부분집합
}

const ta: Arr<number> = [1, 2, 3];

const tb = ta.filter((v): v is number => v % 2 === 0); // [2];  number[]
const tc: Arr<number | string> = [1, "2", 3, "4", 5];
const td = tc.filter((v): v is string => typeof v === "string"); // ['2', '4'];  string[]

const filterPredicate = (v: string | number): v is number =>
  typeof v === "number";
const te = tc.filter(filterPredicate);
