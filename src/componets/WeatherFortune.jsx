import { XShareButton } from "../styles/xShareButton"
import "./WeatherFortune.css"

function WeatherFortune({ weatherData }) {
  // 天気に基づいておみくじ結果を生成
  const getFortuneResult = (weather) => {
    // 天気パターンに基づいておみくじ結果を決定
    if (
      weather.includes("晴れ") &&
      !weather.includes("曇り") &&
      !weather.includes("雨") &&
      !weather.includes("雪")
    ) {
      return {
        result: weather,
        imagePath: "/images/晴れ.png",
        message:
          "あっぱれ！才能が開花してキラキラ輝く日✨新しい事どんどんチャレンジしーちゃお🥳",
        luck: 5
      }
    } else if (weather.includes("晴れ") && weather.includes("曇り")) {
      return {
        result: weather,
        imagePath: "/images/曇り.png",
        message:
          "君の持ち前の明るさで、きっと晴れ間が見えるよ！☀️チャンス掴んじゃお！",
        luck: 4
      }
    } else if (
      weather.includes("曇り") &&
      !weather.includes("雨") &&
      !weather.includes("雪")
    ) {
      return {
        result: weather,
        imagePath: "/images/曇り.png",
        message:
          "雲の上はいつも晴れてるんだって☀️自分を見つめ直すチャンスかも！心の整理をしてスッキリしよ☺️",
        luck: 3
      }
    } else if (weather.includes("雨") && weather.includes("曇り")) {
      return {
        result: weather,
        imagePath: "/images/曇りと雨.png",
        message:
          "雨降って地固まる、発想力が冴える日✨創作や学びのチャンス！新しい発見しーちゃおう💃",
        luck: 3
      }
    } else if (weather.includes("雨") && !weather.includes("雷")) {
      return {
        result: weather,
        imagePath: "/images/雨.png",
        message:
          "雨の日は浄化のタイミング🌧️余計なものを手放して心をスッキリさせちゃお！🍵",
        luck: 3
      }
    } else if (
      weather.includes("雪") &&
      (weather.includes("強い") || weather.includes("暴風"))
    ) {
      return {
        result: weather,
        imagePath: "/images/吹雪.png",
        message:
          "今日は無理しないで！たまにはお家でゆっくり心を整えるのが吉✨心と体を温めて休もう🫕",
        luck: 2
      }
    } else if (weather.includes("雪")) {
      return {
        result: weather,
        imagePath: "/images/雪.png",
        message:
          "雪の真っ白なきもちで心をリセット！新しいスタートを切るチャンス！穏やかに過ごしてみよう☺️",
        luck: 2
      }
    } else if (weather.includes("霧")) {
      return {
        result: weather,
        imagePath: "/images/霧.png",
        message:
          "視界がぼんやりでも大丈夫！九星気学的に直感が冴える日✨自分を信じて焦らずゆっくり進もう🏃‍♀️",
        luck: 2
      }
    } else if (weather.includes("雷")) {
      return {
        result: weather,
        imagePath: "/images/雷.png",
        message:
          "雷は運気の転換期⚡九星気学では新しいステージの始まり！ビビらずワクワクしてこう！😊",
        luck: 1
      }
    } else {
      // デフォルトの場合は曇りの画像を使用
      return {
        result: weather,
        imagePath: "/images/曇り.png",
        message:
          "変わりやすい天気だね！！君の柔軟な心で、どんな日も楽しめるよ！✨",
        luck: 3
      }
    }
  }

  // 天気文字列から天気画像のパスを取得する関数
  const getWeatherImagePath = (weatherText) => {
    if (
      weatherText.includes("晴れ") &&
      !weatherText.includes("曇り") &&
      !weatherText.includes("雨") &&
      !weatherText.includes("雪")
    ) {
      return "/images/晴れ.png"
    } else if (weatherText.includes("曇り") && weatherText.includes("晴れ")) {
      return "/images/曇り.png"
    } else if (
      weatherText.includes("曇り") &&
      !weatherText.includes("雨") &&
      !weatherText.includes("雪")
    ) {
      return "/images/曇り.png"
    } else if (weatherText.includes("雨") && weatherText.includes("曇り")) {
      return "/images/曇りと雨.png"
    } else if (weatherText.includes("雨") && !weatherText.includes("雷")) {
      return "/images/雨.png"
    } else if (
      weatherText.includes("雪") &&
      (weatherText.includes("強い") || weatherText.includes("暴風"))
    ) {
      return "/images/吹雪.png"
    } else if (weatherText.includes("雪")) {
      return "/images/雪.png"
    } else if (weatherText.includes("霧")) {
      return "/images/霧.png"
    } else if (weatherText.includes("雷")) {
      return "/images/雷.png"
    } else {
      return "/images/曇り.png"
    }
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

  // 天気の表示タイプを判定し、画像パスを取得
  const getWeatherImages = (weather) => {
    if (weather.includes("のち")) {
      // 「のち」で分割して前後の天気を取得
      const [firstWeather, secondWeather] = weather.split("のち")
      return {
        type: "transition",
        symbol: "→",
        firstImagePath: getWeatherImagePath(firstWeather),
        secondImagePath: getWeatherImagePath(secondWeather),
        firstWeather,
        secondWeather
      }
    } else if (weather.includes("を伴う")) {
      // 「を伴う」を含む場合（例：雨で雷を伴う）
      const mainWeather = extractWeatherKeyword(weather.split("で")[0])
      const accompanyingWeather = extractWeatherKeyword(
        weather.split("を伴う")[0].split("で")[1] || weather
      )

      return {
        type: "accompanying",
        symbol: "+",
        firstImagePath: getWeatherImagePath(mainWeather),
        secondImagePath: getWeatherImagePath(accompanyingWeather),
        firstWeather: mainWeather,
        secondWeather: accompanyingWeather
      }
    } else {
      // 単一の天気の場合
      return {
        type: "single",
        imagePath: getWeatherImagePath(weather)
      }
    }
  }

  const fortune = getFortuneResult(weatherData.weather)
  const weatherImages = getWeatherImages(weatherData.weather)

  console.log(`おみくじ結果: ${fortune.result} (天気: ${weatherData.weather})`)
  if (weatherImages.type !== "single") {
    console.log(
      `天気の表示タイプ: ${weatherImages.type}, ${weatherImages.firstWeather} ${weatherImages.symbol} ${weatherImages.secondWeather}`
    )
  }

  // 運勢に応じたクローバーの数を表示
  const renderClovers = (luck) => {
    // 塗りつぶしのクローバーと薄緑のクローバーを表示
    return (
      <>
        {[...Array(luck)].map((_, i) => (
          <span key={`filled-${i}`} className="clover filled">
            🍀
          </span>
        ))}
        {[...Array(5 - luck)].map((_, i) => (
          <span key={`empty-${i}`} className="clover empty">
            🍀
          </span>
        ))}
      </>
    )
  }

  // 日付をフォーマット
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}/${month}/${day}`
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
            // 複合的な天気の場合（遷移または伴う）
            <>
              <img
                src={weatherImages.firstImagePath || "/placeholder.svg"}
                alt={weatherImages.firstWeather}
                className="weather-image combined-image"
                onError={(e) => {
                  console.error(
                    `画像の読み込みに失敗: ${weatherImages.firstImagePath}`
                  )
                  e.target.src = "/images/曇り.png"
                  e.target.alt = "画像が見つかんない！"
                }}
              />
              <span className="weather-symbol">{weatherImages.symbol}</span>
              <img
                src={weatherImages.secondImagePath || "/placeholder.svg"}
                alt={weatherImages.secondWeather}
                className="weather-image combined-image"
                onError={(e) => {
                  console.error(
                    `画像の読み込みに失敗: ${weatherImages.secondImagePath}`
                  )
                  e.target.src = "/images/曇り.png"
                  e.target.alt = "画像が見つかんない！"
                }}
              />
            </>
          ) : (
            // 単一の天気の場合
            <img
              src={weatherImages.imagePath || fortune.imagePath}
              alt={fortune.result}
              className="weather-image"
              onError={(e) => {
                console.error(
                  `画像の読み込みに失敗: ${weatherImages.imagePath || fortune.imagePath}`
                )
                e.target.src = "/images/曇り.png"
                e.target.alt = "画像が見つかんない！"
              }}
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
