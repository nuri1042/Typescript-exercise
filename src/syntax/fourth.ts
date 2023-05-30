// 클래스 작성법 1
// 클래스의 이름은 그 자체로 타입이 될 수 있다
class CA {
  a: string;
  b: number;
  constructor() {
    this.a = "123";
    this.b = 123;
  }
  method() {}
}

// 클래스 작성법 2 ( 생략된 버전 )
class CB {
  a: string = "123";
  b: number = 123;
}

class CC {
  a: string;
  constructor(a: string) {
    // 생성자의 매개변수 받을 수 있음
    this.a = a;
  }
}
const aaaaa = new CC("hi");

type CCA = CA;
const ccaa: CA = new CA(); // 클래스 이름 (CA): 클래스 자체가 아니라 new CA ( 인스턴스 new CA() )를 가리킴
const ccbb: typeof CA = CA; // typeof : 클래스 자체를 가리키는 것

// 클래스의 private 문법
// 자기 클래스 내부에서만 사용 가능
class CD {
  private a: string = "123"; // ts에서 제공하는 private ( 추천 , 더 정교하게 사용 가능 ) => 그러나 js로 변환하면 public 변수로 바뀜
  #b: number = 123; // js에서 제공하는 private

  method() {
    console.log(this.a, this.#b);
  }
}

// implements, private, protected

// interface는 추상적 개념, class는 그 추상적 개념을 실제 구현한 것
// js로 변환시에 interface 는 사라짐
// 필요시에 interface 대신 abstract class 사용하는게 더 낫다
interface IA {
  readonly a: string;
  b: string;
}

// class IB 가 IA를 구현하다
// 클래스의 모양을 인터페이스로 통제함 -> 인터페이스와 타입 다르게 작성하면 오류발생
class IB implements IA {
  a: string = "123";
  b: string = "world";
}

// private : 클래스 내부에서만 접근 가능 (인스턴스에서는 사용 불가)
// protected : 클래스 외부에서는 사용 불가 (인스턴스에서는 사용 불가)
// 단, protected는 상속한 클래스에서는 사용 가능
// public : 클래스 내,외부에서 전부 접근 가능
class IC implements IA {
  private a: string = "1000";
  protected b: string = "nuri";
  public c: string = "weather";

  method() {
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
  }
}

class ID extends IC {
  // ID는 IC를 상속받았기 때문에 해당 클래스 내에서는 IC의 protected 변수 사용 가능
  method() {
    console.log(this.a);
    console.log(this.b);
    console.log(this.c);
  }
}
// 인스턴스 : new 키워드를 사용해서 실제 객체로 만들어낸 것
new ID().a; // private 속성은 해당 클래스 안에서만 접근 가능 (인스턴스에서는 사용 불가)
new ID().b; // (인스턴스에서는 사용 불가)
new ID().c;

//            public     protected      private
//클래스 내부      O            O             O
//인스턴스        O            X             X
//상속클래스      O            O             X
