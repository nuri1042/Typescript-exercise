// Partial

interface Profile2 {
  name: string;
  age: number;
  married: boolean;
}
// value에 접근하는 방법
type Name = Profile2["name"];

// Partial type 직접 만들어보기
type P<T> = {
  // 여기서 T는 Profile
  [key in keyof T]?: T[key]; // index signature // key 자리에는 name, age, married가 오게 됨
};

// 위 코드를 풀어서 보면
// P<Profile> {
//   name?: string,
//   age?: number,
//   married?: boolean,
// }

const myName: Profile2 = {
  name: "nuri",
  age: 27,
  married: false,
};

// const yourName: Profile = { // interface의 모든 속성을 사용하지 않으면 error
//   name: 'som',
//   age: 1,
// }

// Partial 의 기능 : 뒤에 작성하는 인터페이스의 속성들을 전부 optional 로 만들어줌
const yourName: P<Profile2> = {
  name: "som",
  age: 1,
};
