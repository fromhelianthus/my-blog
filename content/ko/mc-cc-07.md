---
title: "TIL(Today I Learn) Day 7"
date: "2024-10-20"
description: ""
category: "TIL"
---

### 오늘의 책 읽기: 추천사 ~ 6장. 객체와 자료구조

### 기억에 남는, 기억하고 싶은 내용

-   객체는 추상화 뒤로 자료를 숨긴 채 자료를 다루는 함수만 공개한다. 자료구조는 자료를 그대로 공개하며 별다른 함수는 제공하지 않는다.(p.119 line19)
-   복잡한 시스템을 짜다 보면 새로운 함수가 아니라 새로운 자료 타입이 필요한 경우가 생긴다. 이때는 클래스와 객체 지향 기법이 가장 적합하다. 반면, 새로운 자료 타입이 아니라 새로운 함수가 필요한 경우도 생긴다. 이때는 절차적인 코드와 자료 구조가 좀 더 적합하다.(p.122 line6)

### 읽은 감상

-   본 장의 내용은 이미 정해진 형식(객체를 사용할 것인 지 자료구조를 사용할 것인 지)에 따르거나, 습관적으로 작성하는 코드에 관한 것이었다. DAO, DTO, VO 등, 처음부터 새로 시작하는 프로젝트가 아니라면 기존의 객체(또는 자료구조) 생성 체계에 따르는 것이 적절하다. 새로 시작하는 프로젝트라 하더라도 프레임워크가 많은 도움을 주며, 유사한 프로젝트들을 참고할 수도 있다.
-   다만 코드를 작성하면서 ‘절차 지향’, ‘객체 지향’, ‘디미터 법칙’ 등의 개념을 염두에 둔 것은 아니었다. 해당 서적이 쓰여졌을 때보다 지금은 편리한 도구들이 많고, 주어진 업무를 기한 내에 완수하는 것이 최우선이기는 하나, 당연하게 생각했던 코드라도 ‘내가 작성하는 코드가 왜 이렇게 쓰여졌는가’를 계속 생각해보도록 하자.

### 더 알아보고 싶은 것들

-   디미터 법칙(Law of Demeter)
    -   The Law of Demeter (LoD) or principle of least knowledge is a design guideline for developing software, particularly object-oriented programs.
    -   The fundamental notion is that a given object should assume as little as possible about the structure or properties of anything else (including its subcomponents), in accordance with the principle of “information hiding”
    -   디미터 법칙은 객체 지향 프로그래밍에서 객체 간의 결합도를 낮추기 위한 설계 원칙이다. '최소 지식의 원칙(Principle of Least Knowledge)'이라고도 불린다. 객체는 자신이 직접 소유한 객체에만 메시지를 보내야 한다는 규칙을 따라야 한다.
    -   디미터 법칙을 준수하면 시스템 내 객체 간의 의존성이 줄어들고, 코드의 모듈성이 높아진다. 각 객체의 역할과 책임이 더 명확해지며, 유지보수가 용이해진다.
-   기차 충돌
    -   불필요하게 복잡한 코드나 불명확한 의존성으로 인해 발생하는 여러 가지 잘못된 패턴 혹은 구조가 얽히는 현상
        -   과도한 체인 호출

#노개북 #노마드코더 #개발자북클럽
