const p1 = Promise.resolve(1)
  .then((a) => a + 1)
  .then((a) => a + 1)
  .then((a) => a.toString());
const p2 = Promise.resolve(2);
const p3 = new Promise((res, rej) => {
  setTimeout(res, 1000);
});

Promise.all([p1, p2, p3]).then((result) => {
  console.log(result); // ['3', 2, undefined]
});

// all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> }>;
// T : [p1, p2, p3] => 객체로 표현 시 { '0': p1, '1': p2, '2': p3, length:3}
// keyof T = '0' | '1' | '2' | 'length'
// Awaited<T[P]> : 배열T의 값들을 generic 으로 전달
