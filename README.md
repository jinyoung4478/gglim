# GGLIM

<img src="https://user-images.githubusercontent.com/102174146/210340700-3be1e4d9-90f4-4c2b-88a1-9e27b3d5e7bc.png" width="400" >

<br />

## 1. 프로젝트 소개

끌리는 사람들과 소통할 수 있는 커뮤니티

<br />

### 1-1. 구현 목표

1. Vanilla JS로 구현한 SPA 방식 웹 애플리케이션 개발
2. 회원 가입 시 이메일 인증 기능 구현
3. 기본적인 게시판 CRUD 구현하기
4. 채팅 및 화면 공유, 화상 채팅 기능 구현

### 1-2. 데모

[배포 미구현]

<br />

## 2. 기술 스택

| 포지션   | 스택                |
| -------- | ------------------- |
| language | JavaScript          |
| FE       | redux               |
| BE       | node.js, express.js |
| DB       | MongoDB             |
| Deploy   | NGINX               |

<br />

## 3. 기능별 페이지 및 UI

<details><summary>로그인 / 회원가입 페이지</summary>

|                                                                                                                  |
| :--------------------------------------------------------------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/102174146/210343777-97d17597-b19a-4300-8ebb-03fb92646677.png) |
|                                                      로그인                                                      |
| ![image](https://user-images.githubusercontent.com/102174146/210343700-79dddad4-9504-42e7-a61a-2f651d3a6987.gif) |
|                                                     회원가입                                                     |

</details>

<br />

## 4. 디렉토리 구조

```bash
 |    .env
 |    .gitignore
 |    nodemon.json
 |    package.json
 |    jsconfig.json
 |    babel.config.json
 |    index.js
 |    README.md
 |
 └ backend
 |   |    server.js
 |   |
 |   └ db
 |   └ middlewares
 |   └ routers
 |   └ services
 |
 └ frontend
 |   |    index.js
 |   |    Router.js
 |   |
 |   └ components
 |   └ pages
 |   └ services
 |   └ utils
 |
 └ public
     |    index.html
     |
     └ css
     └ favicon
     └ img
```

<br />

## 5. 회고록

1. [Vanilla JS로 SPA 구현하기](https://velog.io/@matajeu/JavaScript-Vanilla-JS%EB%A1%9C-SPA-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%99%84%EB%B2%BD-%EC%A0%95%EB%A6%AC)
2. [input 태그 자동완성 막기](https://velog.io/@matajeu/HTML-input-%ED%83%9C%EA%B7%B8-%EC%9E%90%EB%8F%99%EC%99%84%EC%84%B1-%EB%A7%89%EA%B8%B0)

<br />

## 6. 버전

0.0.0 : 개발 중
