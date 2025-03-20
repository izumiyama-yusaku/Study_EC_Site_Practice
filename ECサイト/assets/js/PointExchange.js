class PointExchange{

    static #POINT_EXCHANGE_ID = 'js-exchange-button';
    static #TOTAL_POINT_ID = 'js-total-point';
    static #USER_POINT_ID = 'js-user-point';
    static #USER_POINT_HEAD_ID = 'js-user-point-header';
    //メンバー変数
    #productCounterList;  //ProductCounterクラスの配列

    #$pointExchangeButton;

    constructor(productCounterList) {

        this.#productCounterList = productCounterList;
        this.#$pointExchangeButton = document.getElementById(PointExchange.#POINT_EXCHANGE_ID);
       
        this.attachEventListeners(); 
    }

    //----------------------------
    //　プライベートメソッド
    //----------------------------

    //ここですべてのカウントボタンの内容をリセットしています。
    #resetAllCounters(){
        this.#productCounterList.forEach(productCounter => {
            productCounter.productCountReset();
        });
    }

    #calculate(){
        this.#productCounterList.forEach(productCounter => {
            productCounter.setRemainingStock();
        });
    }

    //会計処理
    #payPoint(){
        let $totalPointElement = document.getElementById(PointExchange.#TOTAL_POINT_ID);
        let $userPointElement = document.getElementById(PointExchange.#USER_POINT_ID);
        let $userPointHeaderElement = document.getElementById(PointExchange.#USER_POINT_HEAD_ID);
        let userPointValue = parseInt($userPointElement.textContent);
        let totalPointValue = parseInt($totalPointElement.textContent);

        if(totalPointValue === 0){
            alert('商品を選択してください。');
        
        }else if(userPointValue >= totalPointValue){
            userPointValue -= totalPointValue;
            alert('いつもご利用ありがとうございます！！');

            $userPointElement.textContent = userPointValue;
            $userPointHeaderElement.textContent = userPointValue;
            this.#calculate();
            this.#resetAllCounters();
        }else{
            alert('ポイントが足りません・・・');
        }

    }

    //-----------------------------
    //　パブリックメソッド
    //-----------------------------
    attachEventListeners() {
        this.#$pointExchangeButton.addEventListener('click', () => this.#payPoint());
    }
}
export {PointExchange}