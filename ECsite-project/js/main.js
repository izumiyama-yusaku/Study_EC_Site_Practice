import {ProductCounter} from './ProductCounter.js';
import {PointExchange} from './PointExchange.js';

(() => {
    const productCounters = [
        new ProductCounter("0001", 15 , 100),
        new ProductCounter("0002", 15, 200),
        new ProductCounter("0003", 15, 300),
        new ProductCounter("0004", 5, 400)
    ];


    //商品の個数の値の変化を監視する処理
    //個数の変更がされた場合商品の合計ポイントを計算する。
    const $targets = document.querySelectorAll('.product-counter');
    const config = { attributes: true, childList: true, subtree: true };

    const callback = () => {
        const $products = document.querySelectorAll('.product-counter');
        const $totalPointElement = document.getElementById('js-total-point');
        let totalPoint = 0;
        $products.forEach(product => {
            const point = product.getElementsByClassName('product-point')[0].textContent;
            const counter = product.getElementsByClassName('counter-number')[0].textContent;
            if(parseInt(counter) !== 0){
                totalPoint += parseInt(point); 
            }
        });
        $totalPointElement.textContent = totalPoint;
    };

    const observer = new MutationObserver(callback);

    $targets.forEach(target => {
        observer.observe(target,config);
    });


    //交換ボタンのインスタンスを生成
    const exchangeButton = new PointExchange(productCounters);
})();