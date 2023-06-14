// infer

function zip(
  x: number,
  y: string,
  z: boolean
): { x: number; y: string; z: boolean } {
  return { x, y, z };
}

// Parameter Type 직접 만들기
// infer : 타입스크립트가 알아서 추론하게 함
// 매개변수 자리를 추론해서 값이 있으면 A 리턴, 없으면 never
type MyParam<T extends (...args: any) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never; // <T extends (...args: any) => any> : T 값으로 받아오는게 함수이도록 제한을 둬야 함

// 함수의 리턴타입 가져오는 Return Type 직접 만들기
type MyReturn<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer A
  ? A
  : never;

// 함수 매개변수의 타입 가져오는 방법
type Params = Parameters<typeof zip>; // 변수는 바로 Paramenter<zip>과 같이 사용 불가 => <typeof 변수> 형태로 사용
type Params2 = MyParam<typeof zip>;
type first = Params[0]; // number

type return1 = ReturnType<typeof zip>;
type return2 = MyReturn<typeof zip>;
