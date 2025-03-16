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
          "太陽のように明るく輝く一日になりそうです！新しいことに挑戦するのに最適な日です。",
        luck: 5
      }
    } else if (weather.includes("晴れ") && weather.includes("曇り")) {
      return {
        result: weather,
        imagePath: "/images/曇り.png",
        message:
          "時々雲が出ても、あなたの前向きな気持ちが晴れ間を作り出します。チャンスを見逃さないでください！",
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
          "雲の向こうには必ず太陽があります。今日は内省と計画を立てるのに良い日です。明日への準備をしましょう。",
        luck: 3
      }
    } else if (weather.includes("雨") && weather.includes("曇り")) {
      return {
        result: weather,
        imagePath: "/images/曇りと雨.png",
        message:
          "雨は新しい成長の始まり。今日の雨が明日の花を咲かせます。室内でのクリエイティブな活動に最適です。",
        luck: 3
      }
    } else if (weather.includes("雨") && !weather.includes("雷")) {
      return {
        result: weather,
        imagePath: "/images/雨.png",
        message:
          "雨は新しい成長の始まり。今日の雨が明日の花を咲かせます。室内でのクリエイティブな活動に最適です。",
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
          "吹雪の中にも静けさがあります。今日は家でゆっくり過ごし、内なる声に耳を傾けましょう。",
        luck: 2
      }
    } else if (weather.includes("雪")) {
      return {
        result: weather,
        imagePath: "/images/雪.png",
        message:
          "雪のように純粋な心で物事に取り組めば、美しい結晶のような成果が得られるでしょう。静かな時間を大切にしてください。",
        luck: 2
      }
    } else if (weather.includes("霧")) {
      return {
        result: weather,
        imagePath: "/images/霧.png",
        message:
          "霧の中にも道はあります。一歩一歩慎重に進めば、やがて視界が開けてきます。直感を信じて行動しましょう。",
        luck: 2
      }
    } else if (weather.includes("雷")) {
      return {
        result: weather,
        imagePath: "/images/雷.png",
        message:
          "雷の力強いエネルギーがあなたの中の眠っていた情熱を呼び覚ますでしょう。大胆な決断が実を結ぶ日かもしれません。",
        luck: 1
      }
    } else {
      // デフォルトの場合は曇りの画像を使用
      return {
        result: weather,
        imagePath: "/images/曇り.png",
        message:
          "天気が変わるように、運命も常に動いています。柔軟な心で一日を過ごせば、思わぬ幸運に出会えるかもしれません。",
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
        <div className="fortune-clovers">{renderClovers(fortune.luck)}</div>


        <p className="fortune-message">{fortune.message}</p>

        <div className="fortune-details">
          <div className="fortune-item">
            <span className="fortune-label">空気おいしい度</span>
            <div className="fortune-value">
              {renderClovers(
                Math.max(1, Math.floor(Math.random() * fortune.luck + 1))
              )}
            </div>
          </div>
          <div className="fortune-item">
            <span className="fortune-label">気分アゲ度</span>
            <div className="fortune-value">
              {renderClovers(
                Math.max(1, Math.floor(Math.random() * fortune.luck + 1))
              )}
            </div>
          </div>
          <div className="fortune-item">
            <span className="fortune-label">お散歩しちゃう</span>
            <div className="fortune-value">
              {renderClovers(
                Math.max(1, Math.floor(Math.random() * fortune.luck + 1))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherFortune
