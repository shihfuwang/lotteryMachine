import { defineStore } from 'pinia';
import { useLoginStore } from './login';

interface Prize {
  prizeId: number;
  img: string;
  prizeName: string;
  quantity: number;
  prizeProbability: number;
}

export const usePrizeStore = defineStore({
  id: 'prize',
  state: () => {
    return {
      showPrizeList: false,
      prizeList: [] as Prize[],
    }
  },
  getters: {

  },
  actions: {
    showPrizeInfo() {
      this.showPrizeList = !this.showPrizeList
    },
    async getPrizeListInfo() {
      const loginStore = useLoginStore();
      if (!loginStore.checkLoginStatus()) {
        return;
      }
      this.showPrizeList = true;
      try {
        const response = await fetch(`/player/prize-list`, {
          method: 'GET', credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        if (data.status) {
          const sortedPrizeList = data.prize.sort((a, b) => a.prizeProbability - b.prizeProbability);
          this.prizeList = sortedPrizeList;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        alert('發生錯誤: ' + (error as Error).message);
        return false;
      }
    },
  },
}
)