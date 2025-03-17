# [お天気ルーレットおみくじ](https://otenki-omikuji.vercel.app/)

[![Image from Gyazo](https://i.gyazo.com/1c85719846e729406564c77a90fb0e7c.png)](https://otenki-omikuji.vercel.app/)

- React（JavaScript）をキャッチアップし始めて１週間後、４日間（20時間）で作ったミニアプリです！
- 「**Reactのキャッチアップの為、"書く力"より先に"読み取って修正する力"をつけるため**のミニアプリ」です。    
  なので、このアプリのコードは一部 V0 という AI に書かせました。  
  そこから手動で修正やコンポーネント化を加えたり、基礎的なJavaScriptの書き方を模写して学んでゆきました。

## 当サービス概要
- 気象庁さんの予報データでおみくじが引けます！
- おみくじ結果を X（旧Twitter）でシェアできます

|       | 技術スタック                         |
|---------|------------------------------|
| 技術    | React、CSS、気象庁API     |
| デプロイ| Vercel                      |
| 機能    | Xシェア機能、OGP機能      |


## 今回のアプリで、Reactキャッチアップとして学んだ事
- **Fetch APIの方法**（`async` `await`）で、API KEYを取得・活用しなくてもAPIのデータが取得できる
  - [参考記事](https://www.resumy.ai/posts/18832dcc-5f97-4b4d-9ae8-2d161bca922a)
    ```jsx
    const fetchWeatherForecast = async (regionCode, regionName) => {
      try {      // 気象庁の週間予報XMLデータを取得
        const response = await fetch(
          `https://www.jma.go.jp/bosai/forecast/data/forecast/${regionCode}.json`
        )..
    ```
- ユーザーが止めたルーレットで地域を決め、気象庁APIの予報データを取得
- APIから取得したデータを元に、アプリ内に用意した画像を出しわけができる
___
## なぜ気象庁APIチョイスなのか
- 日本語でデータが取得でき、導入にコストや時間がかからないので！  
- アプリを作るからには、誰でも触れるものにしたかったの気象APIを選びました
- 以下は経緯です  
  - **NASA APIの使用を断念した話**  
    - NASA APIのKEYを取得しアプリ内でデータを取得できたのですが、出力されるデータは全て英語です。  
      ユーザーには日本語でデータを提示したいので  
      翻訳APIとの併用も検討したのですが、翻訳APIのKEYを取得する際はクレジットカード登録が必要です。  
    - デプロイするためのVercelに  
      環境変数に`REACT_APP_hoge_API_KEY`という名前とバリューを設定すると  
      「デプロイ時にログでバリューが公開されてしまう可能性がある」という警告が出ました。  
    - クレジットカードやメールアドレスを登録して取得したAPI_KEYなので、セキュリティの問題が発生すると考え  
      NASA APIや翻訳APIの使用を断念しました。  
  - **[{JSON}Placeholder_API](https://github.com/typicode/jsonplaceholder)の使用を断念した話**  
    - 公式リポジトリを`fork/clone`し  
      自分のリポジトリと作業ディレクトリで、オリジナルの投稿サイトAPI(自分専用API)を作成し  
      その自分専用APIからデータを取得し、ミニプリを作ろうとしました。  
    - しかし、[{JSON}Placeholder_API](https://github.com/typicode/jsonplaceholder)は  
      [My JSON server](https://my-json-server.typicode.com/)というサービス（有料）と掛け合わせないと使えない様でした。  
    - コスト的にも時間的にも、API ✖️ React 初心者がいきなりAPIと他のサービスを掛け合わせた実装をするのは  
      身の丈にあわず、間に合わない・完成という事態をさけるため  
      [{JSON}Placeholder_API](https://github.com/typicode/jsonplaceholder)の使用を断念いたしました。  

