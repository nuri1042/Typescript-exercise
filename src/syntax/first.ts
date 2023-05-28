// 타입스크립트는 자바스크립트의 변수, 매개변수, 리턴값에 타입을 붙여놓은 것이다

const a: number = 5;
const b: string = "5";
const c: boolean = true;
const d: undefined = undefined;
const e: null = null;

// 함수 type 작성하는 방법
function add1(x: number, y: number): number {
  // 매개변수 바로 뒤가 return값에 대한 타입 적는 자리
  return x + y;
}
const result = add1;
// parameter 만 type 을 작성해주면 return 값은 알아서 type 추론 해준다

const add10: (x: number, y: number) => number = (x, y) => x + y;

// type 으로 타입을 선언하는 방식 : type alias
type Add = (x: number, y: number) => number;
const add: Add = (x, y) => x + y;

// interface 방식
interface Add2 {
  (x: number, y: number): number;
}
const add2: Add2 = (x, y) => x + y;

// 객체 타입 작성하는 방법
const obj: { lat: number; lon: number } = { lat: 37.5, lon: 127.5 };

// 배열 타입 작성하는 방법
const arr: string[] = ["123", "456"]; // const arr = ['123','456'] 이런 식으로 적었을 때 typescript가 알아서 타입추론을 잘 해주면 생략하는게 좋음
const arr2: Array<number> = [123, 456]; // <> : generic

const arr3: [number, string, string] = [123, "hello", "world"]; // tuple : 길이가 고정적인 배열
//arr3[3] = 'name'; // 아래와 같은 코드이지만 이 코드는 오류 띄워줌
arr3.push("name"); // 해당 코드는 오류 잡아내지 못함 (!조심하기)

// rest 문법
function rest(a: string, ...args: string[]) {
  console.log(a, args); // '1', ['2','3']
}
rest("1", "2", "3");

function restSum(a: number, ...nums: number[]): number {
  let totSum = 0;
  for (let key in nums) {
    totSum += nums[key];
  }
  return a + totSum;
}

// function add3(x: number, y: number): number; // 같은 함수여도 type만 적혀있고
// function add3(x, y) {
//   // 아래는 실제 함수 선언되어있는 경우도 있음
//   return x + y;
// }

// never, unknown, any 타입 주의하기
// 빈 배열을 선언할 때 타입 지정안해주면 never타입으로 지정될 수 있음(그러면 나중에 값을 넣을 수 없음)
// 빈 배열 선언시에는 반드시 타입지정해줘야 나중에 배열에 값을 넣을 수 있음
try {
  const array: string[] = [];
  array.push("hello");
} catch (err) {
  err;
}

// const head = document.querySelector('#head')!; // ! : 해당 변수가 null 이나 undefined가 아님을 보증하는 방식 (비추)
const head = document.querySelector("#head");
if (head) {
  head.innerHTML = "hello world";
  console.log(head);
}

// type을 custom하게 만들기
type World = "world" | "hell";
const ca: World = "world";
// const ca:World  = 'World' 는 error

type Greeting = `hello ${World}`;
const cc: Greeting = "hello hell";

// enum 은 js코드로 변환했을 때 사라짐
const enum EDirection {
  Up = 3, // 0 기본적으로 부여되는 값 , 처음값을 3으로 지정하면 3,4,5,6순서로 값이 부여됨
  Down, // 1
  Left, // 2
  Right, // 3
}
// 같은 내용의 객체는 js코드로 변환했을 때 남아있음
const ODirection = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3,
} as const;
// as const를 생략하면 위의 값들의 타입은 number가 되고
// as const를 붙이면 값들의 타입이 0,1,2,3으로 정확히 되어있음
const enumA = EDirection.Up; // 3

// keyof - 객체의 value 들을 가져오는 방법
const obj2 = { a: "123", b: "hello", c: "world" };
// a,b,c만 꺼내오고 싶으면
type Key = keyof typeof obj2; // Key는 'a' || 'b' || 'c' 가 된다

const obj3 = { a: "123", b: "hello", c: "world" } as const;
type Key2 = (typeof obj3)[keyof typeof obj3]; // Key2는 value들의 타입을 가져와서 '123' || 'hello' || 'world'가 된다

// 넓은 타입과 좁은 타입
type A = string | number; // 넓은 타입
type B = string; // 좁은 타입에서 넓은 타입으로 대입하는 것은 가능

// 객체에서는 속성 개수가 적을수록 넓은 타입
// 객체는 상세할수록(구체적일수록) 좁은 타입으로 생각하기
type A1 = { name: string }; // 넓은 타입
type B1 = { age: number }; // 넓은 타입

type AB = A1 | B1;
type C1 = { name: string; age: number }; // 좁은 타입
type C2 = A1 & B1; // 윗줄과 같은 코드, 이렇게도 표현 가능

const ab: AB = { name: "nuri" };
// const c: C2 = ab; // AB는 넓은 타입, C2는 좁은 타입 => 넓은 타입을 좁은 타입에 할당할 수 없다

//const ccc: C2 = { name: "nuri", age: 27, married: false }; // 오른쪽 객체가 변수 ccc보다 더 좁은타입
// 좁은 타입을 넓은 타입에 넣었는데 error
// 객체 리터럴 검사 - 객체를 바로 넣게되면 '잉여 속성 검사'를 통해 오류 발생

const objTmp = { name: "nuri", age: 27, married: false }; // 중간에 변수에 한번 할당 한 후 사용하면 오류 발생하지 않음
const ddd: C2 = objTmp;
