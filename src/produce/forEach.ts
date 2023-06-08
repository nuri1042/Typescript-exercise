// forEach 타입 만들기
interface Arr<T> {
  forEach(callback: (item: T) => void): void; // callback 함수 리턴값을 사용하지 않으니까 void 로 설정
}

const pa: Arr<number> = [1, 2, 3];
pa.forEach((item) => {
  console.log(item);
  item.toFixed(1); // item의 타입을 number | string으로 작성하면 해당 함수들을 사용할 수 없음
});
pa.forEach((item) => {
  console.log(item);
  return "3";
});

const pb: Arr<string | number> = ["1", 2, "3"];
pb.forEach((item) => {
  console.log(item);
});
pb.forEach((item) => {
  console.log(item);
  return "3";
});
