import { defineStore } from 'pinia';
import { useLoginStore } from './login';

interface LotteryHistory {
  prizeName: string;
  quantity: number;
  lotteryTime: Date;
}

interface PlayerData {
  playerName: string;
  phoneNumber: string;
  ticketsQuantity: number;
  playerCreatTime: string;
  lastLotteryTime: string;
}

export const usePlayerStore = defineStore('player', {
  state: (): {
    showHistoryRecord: boolean;
    playerData: PlayerData;
    lotteryHistory: LotteryHistory[]
  } => ({
    showHistoryRecord: false,
    playerData: {
      playerName: '',
      phoneNumber: '',
      ticketsQuantity: 0,
      playerCreatTime: '',
      lastLotteryTime: ''
    },
    lotteryHistory: [],
  }),
  getters: {

  },
  actions: {
    //獲取玩家資料
    async fetchPlayerData() {
      try {
        const response = await fetch(`/player`, {
          method: 'GET', credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const result = await response.json();
          this.playerData = result.playerData;
          return true;
        } else {
          console.error('Failed to fetch player data');
          return false;
        }
      } catch (error) {
        console.error('Error fetching player data:', error);
      }
    },
    showHistoryBtn() {
      this.showHistoryRecord = !this.showHistoryRecord;
    },
    async getPlayerHistoryRecord() {
      const loginStore = useLoginStore();

      if (!loginStore.checkLoginStatus()) {
        return;
      }
      this.showHistoryRecord = true;

      try {
        const response = await fetch(`/player/lottery-record`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const data = await response.json();

        if (data.status) {
          this.lotteryHistory = data.lotteryRecord;
          while (this.lotteryHistory.length < 10) {
            this.lotteryHistory.push({
              prizeName: ' ',
              quantity: '',
              lotteryTime: '',
            });
          }
          return true;
        } else {
          this.lotteryHistory = Array(10).fill({
            prizeName: ' ',
            quantity: '',
            lotteryTime: '',
          });
          return false;
        }
      } catch (error) {
        alert('發生錯誤: ' + (error as Error).message);
        return false;
      }
    },
  }
}
)