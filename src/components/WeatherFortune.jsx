import { XShareButton } from "../styles/xShareButton"
import "./WeatherFortune.css"

function WeatherFortune({ weatherData }) {
  // 天気画像の取得関数
  const getWeatherImagePath = (weatherText) => {
    const weatherImages = {
      晴れ: "/images/晴れ.png",
      曇り: "/images/曇り.png",
      雨: "/images/雨.png",
      雪: "/images/雪.png",
      霧: "/images/霧.png",
      雷: "/images/雷.png",
      吹雪: "/images/吹雪.png"
    }

    for (const weather of Object.keys(weatherImages)) {
      if (weatherText.includes(weather)) {
        return weatherImages[weather]
      }
    }

    return "/images/曇り.png" // デフォルト
  }

  // エラーハンドリング関数
  const handleImageError = (event, path) => {
    console.error(`画像の読み込みに失敗: ${path}`)
    event.target.src = "/images/曇り.png"
    event.target.alt = "画像が見つかりません。"
  }

  // 特定の天気キーワードを抽出する関数
  const extractWeatherKeyword = (text) => {
    const keywords = ["晴れ", "曇り", "雨", "雪", "霧", "雷", "吹雪"]
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return keyword
      }
    }
    return "曇り" // デフォルト
  }

  // 天気に基づいておみくじ結果を生成
  const getFortuneResult = (weather) => {
    const defaultMessage =
      "変わりやすい天気だね！！君の柔軟な心で、どんな日も楽しめるよ！✨"

    const fortuneMessages = {
      sunshine: {
        message:
          "あっぱれ！才能が開花してキラキラ輝く日✨新しい事どんどんチャレンジしーちゃお🥳",
        imagePath: "/images/晴れ.png",
        luck: 5
      },
      sunAndClouds: {
        message:
          "君の持ち前の明るさで、きっと晴れ間が見えるよ！☀️チャンス掴んじゃお！",
        imagePath: "/images/曇り.png",
        luck: 4
      },
      cloudy: {
        message:
          "雲の上はいつも晴れてるんだって☀️自分を見つめ直すチャンスかも！心の整理をしてスッキリしよ☺️",
        imagePath: "/images/曇り.png",
        luck: 3
      },
      rainAndClouds: {
        message:
          "雨降って地固まる、発想力が冴える日✨創作や学びのチャンス！新しい発見しーちゃおう💃",
        imagePath: "/images/曇りと雨.png",
        luck: 3
      },
      rain: {
        message:
          "雨の日は浄化のタイミング🌧️余計なものを手放して心をスッキリさせちゃお！🍵",
        imagePath: "/images/雨.png",
        luck: 3
      },
      heavySnow: {
        message:
          "今日は無理しないで！たまにはお家でゆっくり心を整えるのが吉✨心と体を温めて休もう🫕",
        imagePath: "/images/吹雪.png",
        luck: 2
      },
      snow: {
        message:
          "雪の真っ白なきもちで心をリセット！新しいスタートを切るチャンス！穏やかに過ごしてみよう☺️",
        imagePath: "/images/雪.png",
        luck: 2
      },
      fog: {
        message:
          "視界がぼんやりでも大丈夫！九星気学的に直感が冴える日✨自分を信じて焦らずゆっくり進もう🏃‍♀️",
        imagePath: "/images/霧.png",
        luck: 2
      },
      thunder: {
        message:
          "雷は運気の転換期⚡九星気学では新しいステージの始まり！ビビらずワクワクしてこう！😊",
        imagePath: "/images/雷.png",
        luck: 1
      }
    }

    if (
      weather.includes("晴れ") &&
      !weather.includes("曇り") &&
      !weather.includes("雨") &&
      !weather.includes("雪")
    ) {
      return fortuneMessages.sunshine
    } else if (weather.includes("晴れ") && weather.includes("曇り")) {
      return fortuneMessages.sunAndClouds
    } else if (
      weather.includes("曇り") &&
      !weather.includes("雨") &&
      !weather.includes("雪")
    ) {
      return fortuneMessages.cloudy
    } else if (weather.includes("雨") && weather.includes("曇り")) {
      return fortuneMessages.rainAndClouds
    } else if (weather.includes("雨")) {
      return fortuneMessages.rain
    } else if (
      weather.includes("雪") &&
      (weather.includes("強い") || weather.includes("暴風"))
    ) {
      return fortuneMessages.heavySnow
    } else if (weather.includes("雪")) {
      return fortuneMessages.snow
    } else if (weather.includes("霧")) {
      return fortuneMessages.fog
    } else if (weather.includes("雷")) {
      return fortuneMessages.thunder
    } else {
      // デフォルトの場合は曇りの画像を使用
      return {
        result: weather,
        imagePath: "/images/曇り.png",
        message: defaultMessage,
        luck: 3
      }
    }
  }

  // 天気の表示タイプを判定し、画像パスを取得
  const getWeatherImages = (weather) => {
    if (weather.includes("のち")) {
      const [firstWeather, secondWeather] = weather.split("のち")
      return {
        type: "transition",
        firstImagePath: getWeatherImagePath(firstWeather),
        secondImagePath: getWeatherImagePath(secondWeather),
        symbol: "→"
      }
    } else if (weather.includes("を伴う")) {
      const mainWeather = extractWeatherKeyword(weather.split("で")[0])
      const accompanyingWeather = extractWeatherKeyword(
        weather.split("を伴う")[0].split("で")[1] || weather
      )

      return {
        type: "accompanying",
        firstImagePath: getWeatherImagePath(mainWeather),
        secondImagePath: getWeatherImagePath(accompanyingWeather),
        symbol: "+"
      }
    } else {
      return {
        type: "single",
        imagePath: getWeatherImagePath(weather)
      }
    }
  }

  const fortune = getFortuneResult(weatherData.weather)
  const weatherImages = getWeatherImages(weatherData.weather)

  // クローバーの数を表示
  const renderClovers = (luck) => (
    <>
      {[...Array(luck)].map((_, i) => (
        <span key={`filled-${i}`} className="clover filled">🍀</span>
      ))}
      {[...Array(5 - luck)].map((_, i) => (
        <span key={`empty-${i}`} className="clover empty">🍀</span>
      ))}
    </>
  )

  // 日付をフォーマット
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
  }

  return (
    <div className="weather-fortune">
      <div className="fortune-card">
        <div className="fortune-header">
          <span className="region-date">
            {formatDate(weatherData.date)} {weatherData.region}
          </span>
          {weatherData.weather}
          {weatherData.temperature.max && weatherData.temperature.min
            ? ` ${weatherData.temperature.max}℃〜${weatherData.temperature.min}℃`
            : ""}
        </div>

        <div className="weather-image-container">
          {weatherImages.type !== "single" ? (
            <>
              <img
                src={weatherImages.firstImagePath || "/placeholder.svg"}
                alt={weatherImages.firstWeather}
                className="weather-image combined-image"
                onError={(e) =>
                  handleImageError(e, weatherImages.firstImagePath)
                }
              />
              <span className="weather-symbol">{weatherImages.symbol}</span>
              <img
                src={weatherImages.secondImagePath || "/placeholder.svg"}
                alt={weatherImages.secondWeather}
                className="weather-image combined-image"
                onError={(e) =>
                  handleImageError(e, weatherImages.secondImagePath)
                }
              />
            </>
          ) : (
            <img
              src={weatherImages.imagePath || fortune.imagePath}
              alt={fortune.result}
              className="weather-image"
              onError={(e) =>
                handleImageError(
                  e,
                  weatherImages.imagePath || fortune.imagePath
                )
              }
            />
          )}
        </div>
        <span style={{ color: "green" }}>ラッキー度</span>
        <div className="fortune-clovers">{renderClovers(fortune.luck)}</div>
        <p className="fortune-message">{fortune.message}</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <XShareButton weatherData={weatherData} fortune={fortune} />
        </div>
      </div>
    </div>
  )
}

export default WeatherFortune
