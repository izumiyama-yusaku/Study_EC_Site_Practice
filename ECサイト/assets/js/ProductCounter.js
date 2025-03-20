class ProductCounter{

    //定数
    static #COUNTER_MIN = 0;
    static #COUNTER_MAX = 10;
    static #MIN_LIMIT_MESSAGE = '0以下の入力はできません。';
    static #MAX_LIMIT_MESSAGE = '1回の取引は'+ this.#COUNTER_MAX +'個までです。';
    static #STOCK_LIMIT_MESSAGE = '在庫切れです。申し訳ございません。';
    static #ACTIVE_COLOR = '#111111';
    static #INACTIVE_COLOR = '#777777';

    //メンバー変数
    #productId;
    #productStock;
    #point;
    #value;

    #$counterElement;
    #$messageElement;
    #$totalPointElement;
    #$incrementButton;
    #$decrementButton;

    constructor(productId, stock, point, initialValue = 0) {
        this.#productId = productId;
        this.#productStock = stock;
        this.#value = initialValue;
        this.#point = point;

        this.#$counterElement = document.getElementById(`js-counter-${this.#productId}`);
        this.#$messageElement = document.getElementById(`js-message-${this.#productId}`);
        this.#$totalPointElement = document.getElementById(`js-sun-point-${this.#productId}`);
        this.#$incrementButton = document.getElementById(`js-increment-${this.#productId}`);
        this.#$decrementButton = document.getElementById(`js-decrement-${this.#productId}`);
        
        this.#init();
    }

    //-----------------------------
    //　プライベートメソッド
    //----------------------------- 
    #init() {
        if (!this.#$counterElement || !this.#$incrementButton || !this.#$decrementButton) {
            console.error(`商品ID:${this.#productId} が存在しません`);
            return;
        }
        if (typeof this.#productId !== 'string') {
            throw new Error('プライベートproductIdはstringでなければいけません。');
        }

        this.attachEventListeners();        
        this.#updateDisplay();
    }

    #updateDisplay() {
        this.#$counterElement.textContent = this.#value;
        if(this.#value === 0){
            this.#$totalPointElement.textContent = this.#point;
            this.#$totalPointElement.style.color = ProductCounter.#INACTIVE_COLOR;
        }else{
            this.#$totalPointElement.textContent = this.#point * this.#value;
            this.#$totalPointElement.style.color = ProductCounter.#ACTIVE_COLOR;
        }
    }

    #clearMessage() {
        if (this.#$messageElement) {
            this.#$messageElement.textContent = "";
        }
    }

    //-----------------------------
    //　パブリックメソッド
    //-----------------------------
    increment() {

        this.#clearMessage();

        if (this.#value >= ProductCounter.#COUNTER_MAX) {
            this.#$messageElement.textContent = ProductCounter.#MAX_LIMIT_MESSAGE;
            return;
        }
        
        if(this.#value >= this.#productStock){
            this.#$messageElement.textContent = ProductCounter.#STOCK_LIMIT_MESSAGE;
            return;
        }
        
        this.#value += 1;

        this.#updateDisplay();
    }
    
    decrement() {

        this.#clearMessage();

        if (this.#value <= ProductCounter.#COUNTER_MIN) {
            this.#$messageElement.textContent = ProductCounter.#MIN_LIMIT_MESSAGE;
            return;
        }
        
        this.#value -= 1;
        this.#updateDisplay();
    }

    //カウントボタンのイベントリスナーを生成
    attachEventListeners() {
        this.#$incrementButton.addEventListener('click', () => this.increment());
        this.#$decrementButton.addEventListener('click', () => this.decrement());
    }

    //不要になったカウントボタンのイベントリスナーを削除する
    detachEventListeners() {
        this.#$incrementButton.removeEventListener('click', () => this.increment());
        this.#$decrementButton.removeEventListener('click', () => this.decrement());
    }

    //残りの在庫を計算する。
    setRemainingStock(){
        this.#productStock =this.#productStock - this.#value;
    }

    //カウンターの内容をリセットするメソッド
    productCountReset(){
        this.#value = ProductCounter.#COUNTER_MIN; 
        this.#clearMessage();
        this.#updateDisplay();
    };
}

export {ProductCounter}