---
title: "TIL(Today I Learn) Day 9"
date: "2024-10-23"
description: ""
category: "TIL"
---

### 오늘의 책 읽기: 추천사 ~ 7장. 오류처리

### 기억에 남는, 기억하고 싶은 내용

-   예외에서 프로그램 안에다 **범위를 정의한다**는 사실은 매우 흥미롭다.(p.132 line5)
-   어떤 면에서 try 블록은 트랜잭션과 비슷하다. try 블록에서 무슨 일이 생기든지 catch 블록은 프로그램 상태를 일관성 있게 유지해야 한다.(p.132 line8)
-   확인된 예외는 OCP를 위반한다.(p.134 line13)

### 읽은 감상

-   예외처리 코드 작성은 ‘실패하는 코드부터 작성하는’ TDD를 사용하기 매우 좋다. 개발자의 의도대로 작동하는 코드만 작성하게 되면 오류 혹은 예외처리에 미처 신경쓰지 못 할 수도 있다. 어떠한 기능을 구현하기 시작했을 때, 개발 속도를 빠르게 하고 싶은 마음은 누구에게나 있을 것이다.
    그러나 대부분의 프로젝트는 일정에 여유가 없는 경우가 많다. 하지만 그럼에도 코드의 품질을 높이고, 이후에 더 많은 시간을 소모하고 싶지 않다면 TDD 기반의 코드 작성을 하는 것이 맞다고 생각한다. 특히, 예외처리는 개발자에게 도움과 단서가 된다.
-   Null 객체는 사용해본 적이 없다. null 혹은 0, -1 등을 반환하는 것의 위험성을 이해했으므로 기회가 오면 활용해보도록 하자.

### 더 알아보고 싶은 것들

-   특수 사례 패턴(special case pattern)

    -   예외나 오류 처리 로직을 단순화하기 위해 사용하는 소프트웨어 디자인 패턴
    -   별도의 객체나 클래스를 만들어서, 예상되는 예외 혹은 오류 상황을 일반적인 처리 로직에서 분리함
    -   예시

        -   `null` 을 반환해야 하는 경우, `null` 대신 'Null 객체'를 반환

            ```java
            class Cat {
            	public String getName() {
            		return "Nabi";
            	}
            }
            ```

            ```java
            class NullCat extends Cat {
            	@Override
            	public String getName() {
            		return "No Cat";
            	}
            }
            ```

            ```java
            Cat realCat = new Cat();
            Cat nullCat = new NullCat();

            System.out.println(realCat.getName());  // 출력: Nabi
            System.out.println(nullCat.getName());  // 출력: No Cat
            ```

#노개북 #노마드코더 #개발자북클럽
