// void

// 1. function의 리턴값을 void로 선언한 경우 : return 값을 넣으면 안됨, 대신 undefined 는 리턴 가능, null은 리턴 불가
// [ 리턴값이 없다는 의미 ]
function fa(): void {
  return;
  // return 'ggg';  // error
}

// [ 아래 두 경우는 리턴값을 사용하지 않겠다는 의미]

// 2. 메서드의 리턴값을 void로 선언한 경우 : void지만 리턴값 있어도 됨
interface Human {
  talk: () => void;
}
const human: Human = {
  talk() {
    return "abc"; // return값은 무시됨
  },
};

// 3. 매개변수로 선언한 void : void지만 리턴값 있어도 됨
function fb(callback: () => void): void {}
fb(() => {
  return "3"; // return값은 무시됨
});

// Example
// void 와 undefined는 다르다.
declare function forEach(
  arr: number[],
  callback: (el: number) => undefined
): void; // 함수 구현없이 타입만 정의해두고 싶은 경우 declare 를 붙여줌
// 대신 js로 변환시에 해당 코드는 사라짐
// 매개변수 함수 callback에서 void 말고 undefined를 쓴 경우
let target: number[];
forEach([1, 2, 3, 4], (el) => target.push(el)); // push의 리턴값은 number인데 위에서 타입 정의를 undefined로 했기 때문에 error 발생
forEach([1, 2, 3, 4], (el) => {
  target.push(el);
}); // 중괄호 내에 return이 없어서 void가 된다. -> void는 undefined에 할당할 수 없다

declare function forEach2(arr: number[], callback: (el: number) => void): void;
let target2: number[];
forEach2([1, 2, 3, 4], (el) => target2.push(el)); // 위 함수에 매개변수 함수 callback의 리턴값을 void로 설정 => 해당 리턴값을 사용하지 않겠다는 의미 // 오류 없음

// any vs unknown 차이
// any를 사용하면 존재하지 않는 것을 사용해도 오류 출력하지 않음 => 타입 검사를 안한다고 포기 선언하는 것 ; 타입스크립트 쓰는 의미가 없음
// 차라리 unknown 을 사용하면 알 수 없는 형식에 대해 오류 출력

try {
} catch (error) {
  // error의 타입은 unknown
  error.message(
    // 개체가 unknown입니다. 오류 발생
    error as Error
  ).message; // 이렇게 타입을 직접 입력해줘야함 ; Error는 ts가 제공하는 기본 에러 타입
}

// 타입 좁히기(타입 가드)
function numOfStr(a: number | string) {
  a.toFixed(1); // a 가 string일 가능성이 있기 때문에 ts는 오류를 보여줌
  // a는 숫자가 분명하다는 걸 알려줘야 함
  (a as number).toFixed(1); // 위험한 코드, 이렇게 사용하지 말것 (a는 문자열일수도..) ; unknown일 떄  || 남이 만든 타입이 틀렸을 때 말고는 as 사용하지 말자

  // type guard
  if (typeof a === "number") {
    a.toFixed(1);
  } else {
    a.charAt(3);
  }
}

function numOrNumArray(a: number | number[]) {
  if (Array.isArray(a)) {
    // Array.isArray : 배열인지 아닌지 확인하는 코드
    a.concat(4);
  } else {
    // number
    a.toFixed(3);
  }
}
numOrNumArray(123);
numOrNumArray([1, 2, 3]);

// type guard로 객체간의 타입 구별법
type OB = { type: "b"; bbb: string };
type OC = { type: "c"; ccc: string };
type OD = { type: "d"; ddd: string };

// 객체의 값으로 구별하는 방법
function typeCheck(a: OB | OC | OD) {
  if (a.type === "b") {
    a.bbb;
  } else if (a.type === "c") {
    a.ccc;
  } else {
    a.ddd;
  }
}

// 객체의 속성명으로 구별하는 방법
function typeCheck2(a: OB | OC | OD) {
  if ("bbb" in a) {
    // a 객체 내에 bbb라는 속성이 있다면
    a.type;
  } else if ("ccc" in a) {
    a.type;
  } else {
    a.type;
  }
}

// 객체 생성시에 습관들이기
const human2 = { type: "human" };
const cat = { type: "cat" };

// Custom Type Guard Example 1
interface Cat {
  meow: number;
}
interface Dog {
  bow: number;
}
function catOrDog(a: Cat | Dog): a is Dog {
  // return값에 is 가 들어있으면 custom type guard 함수이다.
  if ((a as Cat).meow) {
    return false;
  }
  return true;
}
// 타입을 구분해주는 커스텀 함수를 직접 만들 수 있음
function pet(a: Cat | Dog) {
  if (catOrDog(a)) {
    // Dog
    // custom type guard는 if문 안에 써서 정확한 타입을 알려주는 것
    console.log(a.bow);
  }
  if ("meow" in a) {
    console.log(a.meow);
  }
}

// Custom Type Guard Example 2
const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => {
  return input.status === "rejected";
};
const isFullfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => {
  return input.status === "fulfilled";
};

const promises = await Promise.allSettled([
  Promise.resolve("a"),
  Promise.resolve("b"),
]);
const errors = promises.filter(isRejected);
