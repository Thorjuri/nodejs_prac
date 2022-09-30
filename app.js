const express = require('express');
const app = express();
const port = 3000;
const goodsRouter = require('./routes/goods.js') //router.js 경로
const cartsRouter = require("./routes/goods.js")
const connect = require("./schemas");
connect();


// 전역 미들웨어 (모든 페이지에 해당되는 미들웨어)
// body parser를 사용하기 위한 명령 (express.json())
app.use(express.json());
app.use('/api', cartsRouter);
app.use('/api', goodsRouter)


app.post('/', (req,res)=> {
    console.log(req.body)
    res.send('기본 URI에 POST 메소드가 정상적으로 실행되었습니다.')
})


app.get('/', (req,res) => {
    console.log(req.query) //req.query : 쿼리 스트링을 console에 찍는 명령어
    const obj = {
        "key1234" : "안녕하세요 key1234입니다.",
        "이름입니다" : "이름일까요"
    }
    res.json(obj) //객체 형식으로 response 를 반환하는 방법 
    // res.status(400).json(obj) //인위적으로  status를 400 보내고 싶을때
})





app.get('/:id', (req,res)=>{  //쿼리스트링은 id라는 키의 값이다 라는 선언 (즉 / 뒤에오는 쿼리스트링은 id 라는 key값의 value로 객체형으로 console 창에 찍힘)
   console.log(req.params)
   res.send(':id URI에 정상적으로 반환되었습니다.')
})


app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
  });


// app.get('/', (req, res) => {      //localhost:3000 으로 들어오면 app.js 로 
//   res.send('Hello World!');       //뒤에 /api 경로가 붙은 모든 페이지는 router.js 로 
// });




// app.use('/api', [goodsRouter,cartsRouter]);
// " 'api'라는 경로가 추가되면 모두 goodsRouter로 거쳐라"
// 미들웨어 (먼저 거쳐가야할 혹은 실행해야할 주소를 삽인해주는것.)
// 즉 이후의 코드들은 모두 미들웨어를 거쳐 가야한다. 
// 이 밑의 코드들은 모두 미들웨어인 app.use() 를 먼저 거쳐간 후 실행한다. 
// 현재 미들웨어가 goodsRouter로 지정됬기에, 일단 goods.js의 router를 먼저 읽는다.
// 따라서 app.use()가 선언된 위치에 따라 실행 순서 차이가 있다.
// 이 순서에서는 윗부분 app.get을 먼저 읽고, 그 다음 app.use() 를 거친 후, 나머지 밑의 코드들을 읽는다
