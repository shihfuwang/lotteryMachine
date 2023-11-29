/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.json());

// app.use(cors({ origin: 'http://192.168.86.50:5174' }));
app.use(cors());


app.post('/player/login', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  if (phoneNumber == "0911111111") {
    res.json({ loginStatus: true, message: "登入成功" });
    return
  }
  res.status(401).json({ loginStatus: false, message: "*電話有誤！" });
});

app.post('/player/new', (req, res) => {
  const phoneNum = req.body.phoneNum;
  const playerName = req.body.playerName;
  console.log(phoneNum, playerName);
  if (phoneNum !== '0911111111') {
    res.json({ status: true, message: "註冊成功" });
    return
  }
  res.status(401).json({ status: false, message: "*電話號碼已存在" });
});

app.get('/player', (req, res) => {
  const data = {
    "status": true,
    "playerData": {
      "playerName": "石兼友憲",
      "phoneNumber": "0911111111",
      "ticketsQuantity": 100,
    }
  }
  res.json({ data });
});

app.get('/prize-list', (req, res) => {
  const data = {
    "status": true,
    "prizeList": [{
      "prizeId": 1,
      "prizeProbability": 30,
      "quantity": 100,
      "prizeName": "SHIB",
      "img": "/image/shib.png",
    }, {
      "prizeId": 2,
      "prizeProbability": 0.5,
      "quantity": 3,
      "prizeName": "USDT",
      "img": "/image/usdt.png",
    }, {
      "prizeId": 3,
      "prizeProbability": 10,
      "quantity": 10,
      "prizeName": "APE",
      "img": "/image/ape.png",
    }, {
      "prizeId": 4,
      "prizeProbability": 0.01,
      "quantity": 0.01,
      "prizeName": "BTC",
      "img": "/image/bitcoin.png",
    },
    {
      "prizeId": 5,
      "prizeProbability": 10,
      "quantity": 50,
      "prizeName": "DOGE",
      "img": "/image/doge.png",
    }, {
      "prizeId": 6,
      "prizeProbability": 10,
      "quantity": 200,
      "prizeName": "PEPE",
      "img": "/image/pepe.png",
    }, {
      "prizeId": 7,
      "prizeProbability": 0.03,
      "quantity": 1,
      "prizeName": "ETH",
      "img": "/image/eth.png",
    }, {
      "prizeId": 8,
      "prizeProbability": 1,
      "quantity": 5,
      "prizeName": "SOL",
      "img": "/image/sol.png",
    }, {
      "prizeId": 9,
      "prizeProbability": 33.46,
      "quantity": 200,
      "prizeName": "LUNA",
      "img": "/image/luna.png",
    }, {
      "prizeId": 10,
      "prizeProbability": 5,
      "quantity": 50,
      "prizeName": "ARB",
      "img": "/image/arb.png",
    }
    ],
  }
  res.json({ data });
});

app.post('/player/lottery-record', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  console.log(phoneNumber);
  const data = {
    "status": true,
    "lotteryRecord": [{
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 14:44:21",
    }, {
      "prizeName": "ARB",
      "quantity": 50,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "PEPE",
      "quantity": 200,
      "lotteryTime": "2023-11-13 12:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    }, {
      "prizeName": "LUNA",
      "quantity": 200,
      "lotteryTime": "2023-11-13 13:44:21",
    },
    ],
  }
  if (phoneNumber == '0911111111') {
    res.json({ data });
    return
  }
  res.status(401).json({
    "status": false,
    "message": "尚未抽獎"
  });
});

app.get('/go-lottery', (req, res) => {
  const prizeList = [
    { prizeId: 1, prizeProbability: 9, quantity: 100, prizeName: "SHIB", img: "/image/shib.png" },
    { prizeId: 2, prizeProbability: 5, quantity: 3, prizeName: "USDT", img: "/image/usdt.png" },
    { prizeId: 3, prizeProbability: 5, quantity: 10, prizeName: "APE", img: "/image/ape.png" },
    { prizeId: 4, prizeProbability: 1, quantity: 0.01, prizeName: "BTC", img: "/image/bitcoin.png" },
    { prizeId: 5, prizeProbability: 8, quantity: 50, prizeName: "DOGE", img: "/image/doge.png" },
    { prizeId: 6, prizeProbability: 5, quantity: 200, prizeName: "PEPE", img: "/image/pepe.png" },
    { prizeId: 7, prizeProbability: 2, quantity: 1, prizeName: "ETH", img: "/image/eth.png" },
    { prizeId: 8, prizeProbability: 5, quantity: 5, prizeName: "SOL", img: "/image/sol.png" },
    { prizeId: 9, prizeProbability: 5, quantity: 200, prizeName: "LUNA", img: "/image/luna.png" },
    { prizeId: 10, prizeProbability: 5, quantity: 50, prizeName: "ARB", img: "/image/arb.png" },
    { prizeId: 11, prizeProbability: 50, quantity: 0, prizeName: "未中獎", img: "/image/cry.png" },
  ];

  const totalProbability = prizeList.reduce((acc, prize) => acc + prize.prizeProbability, 0);
  let randomNum = Math.random() * totalProbability;

  let selectedPrize = prizeList.find(prize => {
    randomNum -= prize.prizeProbability;
    return randomNum < 0;
  });

  const data = {
    status: true,
    prize: selectedPrize
  };

  console.log(selectedPrize);
  res.json({ data });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});