# [お天気ルーレットおみくじ](https://otenki-omikuji.vercel.app/)

[![Image from Gyazo](https://i.gyazo.com/1c85719846e729406564c77a90fb0e7c.png)](https://otenki-omikuji.vercel.app/)

- React（JavaScript）をキャッチアップし始めて１週間後、４日間（20時間）で作ったミニアプリです！
- 「**Reactのキャッチアップの為、"書く力"より先に"読み取って修正する力"をつけるため**のミニアプリ」です。    
  なので、このアプリのコードは一部 V0 という AI に書かせました。  
  そこから手動で修正やコンポーネント化を加えたり、基礎的なJavaScriptの書き方を模写して学んでゆきました。

## 当サービス概要
- 気象庁さんの予報データでおみくじが引けます！

## 今回のアプリで、Reactキャッチアップとして学んだ事
**Fetch APIの方法**（`async` `await`）で、API KEYを取得・活用しなくてもAPIのデータが取得できる
```jsx
const fetchWeatherForecast = async (regionCode, regionName) => {
  try { // 気象庁の週間予報XMLデータを取得
    const response = await fetch(
      `https://www.jma.go.jp/bosai/forecast/data/forecast/${regionCode}.json`
    )..
```
- ユーザーが止めたルーレットで地域を決め、気象庁APIの予報データを取得
- APIから取得したデータを元に、アプリ内に用意した画像を出しわけができる
