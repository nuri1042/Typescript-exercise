// typescript 4.8 version update

// {} , Object : 객체처럼 보이지만 모든 타입을 의미 (nullrhk undefined는 제외)
const newX: {} = "hello";
const newY: Object = "hi";

// object : 객체
const newXX: object = "world"; // error
const newYY: object = { hello: "world" }; // object는 지양하고 interface, type, class 사용하기

// 기존 ) unknown : 모든 값을 받을 수 있음
const newZ: unknown = "hello";
// update ) unknown = {} || null || undefined
if (newZ) {
  // 4.8 버전에서는 unknown을 if문 안에 사용하면
  newZ; // 해당 값이 {} 로 출력됨
}
