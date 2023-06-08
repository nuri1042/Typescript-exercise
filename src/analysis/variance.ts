// 공변성, 반공변성
// 함수 간 서로 대입할 수 있는지 없는지 따지는 것

function va(x: string): number {
  return +x;
}
va("1"); // 1

type VB = (x: string) => number | string; // 리턴값은 더 좁은 타입에서 넓은 타입으로는 대입 가능
const vb: VB = va;

//
//
function vc(x: string | number): number {
  // 매개변수 x는 string or number
  return 0;
}
type VD = (x: string) => number; // 매개변수는 리턴값이랑 반대로 넓은 타입에서 좁은 타입으로 대입 가능 ( 좁은 타입에서 넓은 타입으로 대입은 불가능 )
let vd: VD = vc;
