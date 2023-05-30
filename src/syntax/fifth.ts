// ? : optional
function optional(a: number, b?: number) {}
optional(1);
optional(1, 2);

let optionalObject: { a: string; b?: string } = { a: "hello" };

//매개변수 개수 제한 두고 싶지 않을 때
function optional2(...args: number[]) {}

//
// Generic
// 타입을 변수처럼 만드는 것 . 지금 당장 타입은 모르지만 나중에 결정하고 싶을 때 사용

// 같은 타입을 하나의 문자로 <> 안에 표현
// extends ~  // 뒤에 붙이는 타입으로 generic에 제한을 줄 수 있음
function GA<T extends number, K extends string>(x: T, y: K): T {
  return x + y;
}
function GB<T extends number | string>(x: T) {}

GA(1, 2);
GA("1", "2");
GA(1, "2");

// <T extends {...}>
function GAA<T extends { a: string }>(x: T): T {
  return x;
}
GAA({ a: "hello" });

// <T extends any[]>
function GAB<T extends string[]>(x: T): T {
  return x;
}
GAB(["1", "2", "3"]);

// <T extends (...args: any) => any>
// 콜백함수의 형태 제한할 때 사용
// 제한을 두지 않을 때는 any 사용
function GAC<T extends (a: string) => number>(x: T): T {
  return x;
}
GAC((a) => +a);

// <T extends abstract new (...args: any) => any> // 생성자
function GAD<T extends abstract new (...args: any) => any>(x: T): T {
  return x;
}
