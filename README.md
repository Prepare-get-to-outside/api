# book-market-be
쩝쩝박사 백엔드 프로젝트

# git clone
$ git clone https://github.com/Prepare-get-to-outside/api.git book-market-be

# express 설치
$ npm i -g express-generator

# express 구성
$ express book-market-be --view=pug

# 프로젝트 npm 설치
$ npm install

# sqlite3 library 설치
$ npm install sqlite -save

# Sequelize 설치(node js에서 사용하는 orm)
$ npm install sequelize -save
https://sequelize.org/v6/

# sequelize CLI(command-line-interface)를 사용하기 위한 패키지 이므로 전역으로 설치 
npm install -g sequelize-cli

### sequelize 구조 설치
sequelize init

# sequelize로 DB 테이블 구성
sequelize db:migrate


# express 구조
[bin/www]
http 모듈에 express 모듈을 연결하며, 포트를 지정할 수 있다.
서버를 실행하는 스크립트이다.

public
각종 리소스들을 모아놓은 폴더로 외부(브라우저 등의 클라이언트)에서 접근 가능한 파일들을 모아 둔 디렉토리이다.
images, javascripts, stylesheets 파일들이 들어있다.

routes
라우터들을 관리하는 곳으로 서버의 로직은 모두 routes 폴더 안의 파일에 작성할 것이다. index.js를 기반으로 라우팅 관리를 해주면 된다. routes 디렉토리 안에 또 폴더를 만들어 관리하던지 파일을 만들어 관리하던지 하면 된다. 다만 index.js가 루트가 되게!

view 
파일들을 관리하는 곳으로 웹서버로 사용 시 이 디렉토리에 잇는 파일들을 사용해서 렌더링 시킨다.


app.js
대망의 app.js! 핵심적인 서버의 역할을 하며 미들웨어 관리를 하는 곳이다.

# 추후 구조 변경(나중에 하자)
https://github.com/santiq/bulletproof-nodejs/tree/master/src

# 트랜잭션
https://sequelize.org/v3/docs/transactions/

# 테이블 관계 및 join
https://sequelize.org/v3/docs/associations/