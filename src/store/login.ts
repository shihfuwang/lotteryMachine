import { defineStore } from 'pinia';
import { usePlayerStore } from '../store/player';

export const useLoginStore = defineStore({
  id: 'login',
  state: () => {
    return {
      phoneNum: '',
      playerName: '',
      showRegisterForm: false,
      registerSuccess: false,
      showWrongMsg: false,
      loginStatus: false,
      showPhoneWrongMsg: false,
      phoneWrongMsg: '',
      wrongMessage: '',
    };
  },
  getters: {
    phoneNumLength: (state) => state.phoneNum.length,
    playerNameLength: (state) => state.playerName.length,
  },
  actions: {
    //開註冊單
    showRegisterBtn() {
      this.closeRegisterForm();
      this.showRegisterForm = true;
    },
    //關註冊單+清空
    closeRegisterForm() {
      this.showRegisterForm = false;
      this.showPhoneWrongMsg = false;
      this.showWrongMsg = false;
      this.phoneNum = '';
      this.playerName = '';
    },
    //關成功訊息
    messageBtn() {
      this.registerSuccess = false;
      this.closeRegisterForm();
    },
    //比對登入帳號
    async handleLogin(): Promise<boolean> {
      if (this.phoneNum =='') {
        this.showWrongMsg = true;
        this.wrongMessage = "*電話不可為空白";
        return false;
      }
      try {
        const response = await fetch(`/player/login`, {
          method: 'POST', credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phoneNumber: this.phoneNum })
        });

        const data = await response.json();

        if (data.loginStatus) {
          const playerStore = usePlayerStore();
          this.showWrongMsg = false;
          this.loginStatus = true;
          localStorage.setItem('isAuthenticated', 'true');
          const fetchSuccess = await playerStore.fetchPlayerData();

          if (fetchSuccess) {
            return true;
          } else {
            console.log("獲取玩家資料失敗");
            return false;
          }
          return true;
        } else {
          this.showWrongMsg = true;
          this.wrongMessage = data.message;
          this.loginStatus = false;
          return false;
        }
      } catch (error) {
        alert('發生錯誤: ' + (error as Error).message);
        return false;
      }
    },
    //檢查註冊表格式
    checkRegisterFormData(phoneNumber: string, playerName: string): boolean {
      if (phoneNumber == "") {
        this.showPhoneWrongMsg = true;
        this.phoneWrongMsg = '*電話不可為空白';
        return false;
      }
      this.showPhoneWrongMsg = false;

      if (!/^09\d{8}$/.test(phoneNumber)) {
        this.showPhoneWrongMsg = true;
        this.phoneWrongMsg = '*電話格式有誤';
        return false;
      }
      this.showPhoneWrongMsg = false;

      if (playerName == "") {
        this.showWrongMsg = true;
        this.wrongMessage = '*暱稱不可為空白';
        return false;
      }
      this.showWrongMsg = false;
      return true;
    },
    //註冊
    async registerPost(): Promise<boolean> {
      const isValid = this.checkRegisterFormData(this.phoneNum, this.playerName);

      if (!isValid) {
        return false;
      }
      try {
        const response = await fetch(`/player/new`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ phoneNumber: this.phoneNum, playerName: this.playerName })
        });
        const data = await response.json();

        if (data.status) {
          this.registerSuccess = true;
          return true;
        } else {
          this.showPhoneWrongMsg = true;
          this.phoneWrongMsg = data.message;
          return false;
        }
      } catch (error) {
        alert('發生錯誤: ' + (error as Error).message);
        return false;
      }
    },
    //檢查登入權限
    checkLoginStatus() {
      if (this.loginStatus === false) {
        alert('您尚未登入，請登入後再繼續操作。');
        window.location.href = '/';
        return false;
      }
      return true;
    },
    //設定登入狀態
    setLoginStatus(status: boolean) {
      this.loginStatus = status;
    },
    updatePhoneNum() {
      //限制只能輸入數字
      this.phoneNum = this.phoneNum.replace(/\D/g, '');
      if (this.phoneNum.length > 10) {
        this.phoneNum = this.phoneNum.substring(0, 10);
      }
    },
    updatePlayerName() {
      //限制只能輸入中文/字母/數字
      this.playerName = this.playerName.replace(/[^\u4E00-\u9FFF\u3400-\u4DBF\u20000-\u2A6DFa-zA-Z0-9]/g, '');
      if (this.playerName.length > 6) {
        this.playerName = this.playerName.substring(0, 6);
      }
    },
  }
})