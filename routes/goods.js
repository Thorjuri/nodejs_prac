    // routes/goods.js
    // router 생성 기초 뼈대
const express = require('express');
const router = express.Router(); //express에서 router를 받아서 생성해줌
const goods = [
    {
      goodsId: 4,
      name: "상품 4",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
      category: "drink",
      price: 0.1,
    },
    {
      goodsId: 3,
      name: "상품 3",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
      category: "drink",
      price: 2.2,
    },
    {
      goodsId: 2,
      name: "상품 2",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
      category: "drink",
      price: 0.11,
    },
    {
      goodsId: 1,
      name: "상품 1",
      thumbnailUrl:
        "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
      category: "drink",
      price: 6.2,
    },
  ];
const Cart = require('../schemas/cart')
const Goods = require("../schemas/goods");




// 장바구니 목록 조회
router.get("/carts", async (req, res) => {
  const carts = await Cart.find();
  const goodsIds = carts.map((cart) => cart.goodsId);

  const goods = await Goods.find({ goodsId: goodsIds });

  const results = carts.map((cart) => {
		return {
			quantity: cart.quantity,
			goods: goods.find((item) => item.goodsId === cart.goodsId)
		};
  });

  res.json({
    carts: results,
  });
});




//장바구니에 상품 추가
router.post('/goods/:goodsId/cart', async(req,res)=>{
    const {goodsId} = req.params;
    const {quantity} = req.body;

    const existsCarts = await Cart.find({goodsId:Number(goodsId)});
    if (existsCarts.length){
        return res.json({success:false, errorMessage: "이미 장바구니에 존재하는 상품입니다."});
    }

    await Cart.create({goodsId:Number(goodsId), quantity:quantity})

    res.json({result: "success"});
});


//장바구니 상품 수량 수정
router.put("/goods/:goodsId/cart", async (req, res) => {
    const { goodsId } = req.params;
    const { quantity } = req.body;
  
    if (quantity < 1) {
      res.status(400).json({ errorMessage: "수량은 1 이상이어야 합니다." });
      return;
    }
  
    const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
    if (existsCarts.length) {
      await Cart.updateOne({ goodsId: Number(goodsId) }, { $set: { quantity } });
    }
  
    res.json({ success: true });
  });

  


//장바구니에 상품 삭제
router.delete('/goods/:goodsId/cart', async(req,res)=>{
    const {goodsId} = req.params;

    const existsCarts = await Cart.find({goodsId:Number(goodsId)});
    if (existsCarts.length > 0){
        await Cart.deleteOne({goodsId:Number(goodsId)}) 
            //혹은 await Cart.deleteOne({ goodsId });

    }

    res.json({result: "success"});
});




    //http://localhost:3000/api/
    //   '/api/ '에서의  GET 에 대한 응답
router.get('/', (req, res) => {      //req는 request로 클라이언트에서 받을것
	res.send('this is home page');  //res는 response로 클라이언트에 보낼것
});             //res.send() 는 send 안의 값을 반환(response) 하라는 명령


    //http://localhost:3000/api/about
    //모두 app.js 파일의 app.use()를 거여 왔기 때문에 기본적으로 '/api'가 붙은채로 온다!!
    // 경로 '/api/about' 에서의 GET 에 대한 응답
router.get('/about', (req, res) => {
	res.send('this is about page');
});


router.get('/goods', (req,res)=>{
    res.json({goods:goods})
    // console.log(req.params)
})


router.get('/goods/:goodsId', (req,res)=>{
    // const goods = [
    //     {
    //       goodsId: 4,
    //       name: "상품 4",
    //       thumbnailUrl:
    //         "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    //       category: "drink",
    //       price: 0.1,
    //     },
    //     {
    //       goodsId: 3,
    //       name: "상품 3",
    //       thumbnailUrl:
    //         "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    //       category: "drink",
    //       price: 2.2,
    //     },
    //     {
    //       goodsId: 2,
    //       name: "상품 2",
    //       thumbnailUrl:
    //         "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    //       category: "drink",
    //       price: 0.11,
    //     },
    //     {
    //       goodsId: 1,
    //       name: "상품 1",
    //       thumbnailUrl:
    //         "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    //       category: "drink",
    //       price: 6.2,
    //     },
    //   ];
      const {goodsId} = req.params;
      const [detail] = goods.filter((goods) => goods.goodsId === Number(goodsId))
    res.json({detail})
    // console.log(req.params)
})




    //작성한 router 를 app.js 에서 사용하기 위한 코드
    //폴더와 파일을 따로 분리해서 router를 작성했기 때문에 app.js에 적용될 수 있도록 참조넣는것
    // 참조는 app.js 파일에도 넣어줘야함!!
module.exports = router;



//app.js 에서 app.use 미들웨어를 정해놨기 때문에 이 라우터 페이지로 오는 모든 주소는 /api 경로를 달고 있다.
// http://localhost:3000/api

// const Goods = require("../schemas/goods");
router.post("/goods", async (req, res) => {
	const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});


