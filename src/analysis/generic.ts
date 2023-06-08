// Generic 타입분석

// 1. forEach
interface Array<T> {
  forEach(
    callbackfn: (value: T, index: number, array: T[]) => void,
    thisArg?: any
  ): void;
}

const dataSet: Array<number> = [1, 2, 3];
// generic <> 내에 타입이 number로 작성되면 위의 인터페이스에서 T 부분이 전부 number 로 바뀐다.
// typescript engine은 이렇게 value의 type이 number라고 판단하게 되는 것이다.
dataSet.forEach((value) => {
  console.log(value);
});

//
// 2. map
interface Array<T> {
  map<U>(
    callbackfn: (value: T, index: number, array: T[]) => U, // 콜백함수의 리턴값의 타입이 U
    thisArg?: any
  ): U[]; // map 함수 전체의 리턴값
}

const strings = [1, 2, 3].map((item) => item.toString()); // ['1', '2', '3']
// - [1,2,3]을 보고 T는 number 라는 걸 알 수 있음
// - 콜백함수 내에서 item.toString() // toString을 보고 리턴값이 string이라는 걸 알 수 있음

//
// 3. filter
interface Array<T> {
  // filter 1
  filter<S extends T>( // T가 number인 경우 S도 number이어야 한다는 뜻
    predicate: (value: T, index: number, array: T[]) => value is S,
    thisArg?: any
  ): S[]; // filter 함수 전체의 리턴값

  // filter 2
  filter(
    predicate: (value: T, index: number, array: T[]) => unknown,
    thisArg?: any
  ): T[];
}

const filtered = [1, 2, 3, 4, 5, 6].filter((value) => value % 2);
// - [] 배열부분을 보면 T는 number 라는 걸 알 수 있음
// S가 number 이니까 filtered 변수도 number로 추론 가능

// 기존 코드
const filtered2 = ["1", 2, "3", 4, "5", 6].filter(
  (value) => typeof value === "string"
); // ['1', '3', '5'] // 그런데 filtered2 변수의 타입이 string | number 로 나옴

// 이렇게 타입 추론을 못하는 경우
// filter 함수 내에 predicate 을 S를 string으로 해서 그대로 구현해줌
const predicate = (value: string | number): value is string =>
  typeof value === "string";
const filtered3 = ["1", 2, "3", 4, "5", 6].filter(predicate); // filtered3 은 string으로 잘 추론 가능

// ['1', 2, '3', 4, '5', 6] : T는 string | number
// filter1 에서 S extends T : S도 string | number
// return이 S[]니까 아직 string이 될 가능성이 남아있음
// filter2는 return이 T[]니까 string | number로 이미 고정 -> 제대로 추론 불가
// 여기서는 filter1을 사용
