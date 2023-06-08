// map 타입 만들기

interface Arr<T> {
  // Arr<T,S> 와 같이 작성할 수도 있지만 배열에 대해 어떤 작업을 하는지 모를수도 있음
  forEach(callback: (item: T) => void): void;
  map<S>(callback: (v: T, i: number) => S): S[]; //map<S> 이렇게 적어주기
}

const ma: Arr<number> = [1, 2, 3];
const mb = ma.map((v, i) => v + 1); // mb 가 정확히 number로 추측되도록 map 타입 만들어보기
// result : [2,3,4]; number[]
const mc = ma.map((v, i) => v.toString()); // ['2','3','4']; string[]
const md = ma.map((v, i) => v % 2 === 0); // [false, true, false];  boolean[]

const me: Arr<string> = ["1", "2", "3"];
const mf = me.map((v) => +v); //+v 문자열의 배열을 숫자로 바꾸는 것
