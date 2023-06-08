// 조심해야할 점
// ts는 건망증이 심하다 => 변수를 만들어서 중간중간 타입을 저장해야 함

interface Axios {
  get(): void;
}

// CustomError를 interface 로 구현한 경우 : js 로 변환 시 사라짐, instanceof 와 같은 키워드 사용 불가
// interface CustomError extends Error {
//   name: string;
//   message: string;
//   stack?: string;
//   response?: {
//     data: any;
//   };
// }

// CustomError를 class 로 구현한 경우 : js로 변환해도 남아있고 interface와 비슷한 역할 하는 class
class CustomError extends Error {
  response?: {
    data: any;
  };
}
declare const axios: Axios;

//
// Case 1
(async () => {
  try {
    await axios.get();
  } catch (err: unknown) {
    // interface 로 구현한 경우 instanceof 와 같은 키워드 사용 불가
    // 1. err 가 unknown 타입이다; unknown은 as 를 함께 사용해야 함
    // console.log(((err as Error).response?.data);  // 2. as 를 사용했는데 Error 형식에 response 속성이 없음

    // 수정 전

    // console.log((err as CustomError).response?.data); // 3. 그래서 CustomError interface 속성 만들어 사용 // 해당 객체 내에 response는 있을수도, 없을수도(undefined)있기 때문에 옵셔널 연산자(?) 사용
    // err.response?.data; // 4. But, 타입스크립트는 건망증이 심함. 윗줄에서 err as CustomError라고 했지만 아랫줄에서는 err:unknown임

    const customError = err as CustomError; //  5. 변수로 한번 선언 후 사용

    // 수정 후
    console.log(customError.response?.data);
    customError.response?.data;
  }
})();

// Case 3
async () => {
  try {
    await axios.get();
  } catch (err) {
    // 해당 코드라인에서 err:unknown
    if (err instanceof CustomError) {
      // custom typeguard에 의해서
      // typeguard 로 좁혀놓은 경우는 as 사용안해도 됨
      console.log(err.response?.data); // 해당 코드라인의 err:CustomError 가 됨
      err.response?.data;
    }
  }
};
