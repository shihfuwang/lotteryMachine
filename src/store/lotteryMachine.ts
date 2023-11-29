import { defineStore } from 'pinia';
import { useLoginStore } from './login';

const prizeImg = {
  src: '/image/circle.png',
  width: '65%',
  top: '-3px'
};

interface GetPrize {
  name: string;
  quantity: number;
  img: string;
}

export const useLotteryMachineStore = defineStore('lotteryMachine', {
  state: () => ({
    blocks: [
      {
        padding: '58px',
        imgs: [{
          src: '/image/border.png',
          top: '15px',
          width: '100%',
          height: '100%',
        }],
      },
    ],
    prizes: [
      { background: 'black', fonts: [{ text: '' }] },
      { background: 'black', fonts: [{ text: '' }], imgs: [prizeImg] },
    ],
    buttons: [
      {
        radius: '30%',
        imgs: [{
          src: '/image/btn4.png',
          width: '230%',
          top: '-95px',
          left: '-1px',
        }]
      }
    ],
    defaultConfig: {
    },
    showMessage: false,
    showMessageX: false,
    playFireWork:false,
    isNoPrize: false,
    gameStart: false,
    showWrongMessage: false,
    showLotteryMessage: false,
    getPrize: {} as GetPrize,
    lotteryMessageTitle: "",
    lotteryMessage: '',
    wrongMessage: '',
  }),
  getters: {

  },
  actions: {
    startBtn() {
      this.showMessageX = true;
      this.showMessage = true;
    },
    async startGetPrize() {

      const loginStore = useLoginStore();
      if (!loginStore.checkLoginStatus()) {
        this.showMessage = false;
        this.showMessageX = false;
        this.playFireWork = false;
        return;
      }

      this.showMessage = false;
      this.showMessageX = false;
      this.playFireWork = false;

      try {
        const response = await fetch(`/player/go-lottery`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();

        if (data.status) {
          if (data.prize) {
            const { name, quantity, img } = data.prize;
            this.getPrize = { name, quantity, img };
            this.playFireWork = true;
            this.isNoPrize = false;
            this.lotteryMessageTitle = '恭喜獲得';
            this.lotteryMessage = this.getPrize.name
          } else {
            this.getPrize = { name: "", quantity: 0, img: "" };
            this.playFireWork = false;
            this.isNoPrize = true;
            this.lotteryMessageTitle = '再接再勵';
            this.lotteryMessage = "您這次沒有中獎 QQ";
          }
          return true;
        } else {
          this.showWrongMessage = true;
          this.wrongMessage = data.message
          return false;
        }
      } catch (error) {
        alert('發生錯誤: ' + (error as Error).message);
        return false;
      }
    },
    MessageXBtn() {
      this.showMessage = false;
      this.showMessageX = false;
    },
    closeWrongMessage() {
      this.showMessage = false;
      this.showWrongMessage = false;
      this.wrongMessage = '';
    },
    gameOver() {
      this.showLotteryMessage = false;
      this.gameStart = false;
      this.getPrize = [];
    },
  },
}
)