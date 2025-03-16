import "./WeatherFortune.css"

function WeatherFortune({ weatherData }) {
  // 天気に基づいておみくじ結果を生成
  const getFortuneResult = (weather) => {
    // 天気パターンに基づいておみくじ結果を決定
    if (weather.includes("晴れ") && !weather.includes("曇り") && !weather.includes("雨") && !weather.includes("雪")) {
      return {
        result: weather,
        imagePath: "/image/晴れ.png",
        message: "太陽のように明るく輝く一日になりそうです！新しいことに挑戦するのに最適な日です。",
        luck: 5,
      }
    } else if (weather.includes("晴れ") && weather.includes("曇り")) {
      return {
        result: weather,
        imagePath: "/image/曇り.png",
        message: "時々雲が出ても、あなたの前向きな気持ちが晴れ間を作り出します。チャンスを見逃さないでください！",
        luck: 4,
      }
    } else if (weather.includes("曇り") && !weather.includes("雨") && !weather.includes("雪")) {
      return {
        result: weather,
        imagePath: "/image/曇り.png",
        message: "雲の向こうには必ず太陽があります。今日は内省と計画を立てるのに良い日です。明日への準備をしましょう。",
        luck: 3,
      }
    } else if (weather.includes("雨") && weather.includes("曇り")) {
      return {
        result: weather,
        imagePath: "/image/曇りと雨.png",
        message: "雨は新しい成長の始まり。今日の雨が明日の花を咲かせます。室内でのクリエイティブな活動に最適です。",
        luck: 3,
      }
    } else if (weather.includes("雨") && !weather.includes("雷")) {
      return {
        result: weather,
        imagePath: "/image/雨.png",
        message: "雨は新しい成長の始まり。今日の雨が明日の花を咲かせます。室内でのクリエイティブな活動に最適です。",
        luck: 3,
      }
    } else if (weather.includes("雪") && (weather.includes("強い") || weather.includes("暴風"))) {
      return {
        result: weather,
        imagePath: "/image/吹雪.png",
        message: "吹雪の中にも静けさがあります。今日は家でゆっくり過ごし、内なる声に耳を傾けましょう。",
        luck: 2,
      }
    } else if (weather.includes("雪")) {
      return {
        result: weather,
        imagePath: "/image/雪.png",
        message:
          "雪のように純粋な心で物事に取り組めば、美しい結晶のような成果が得られるでしょう。静かな時間を大切にしてください。",
        luck: 2,
      }
    } else if (weather.includes("霧")) {
      return {
        result: weather,
        imagePath: "/image/霧.png",
        message: "霧の中にも道はあります。一歩一歩慎重に進めば、やがて視界が開けてきます。直感を信じて行動しましょう。",
        luck: 2,
      }
    } else if (weather.includes("雷")) {
      return {
        result: weather,
        imagePath: "/image/雷.png",
        message:
          "雷の力強いエネルギーがあなたの中の眠っていた情熱を呼び覚ますでしょう。大胆な決断が実を結ぶ日かもしれません。",
        luck: 1,
      }
    } else {
      // デフォルトの場合は曇りの画像を使用
      return {
        result: weather,
        imagePath: "/image/曇り.png",
        message:
          "天気が変わるように、運命も常に動いています。柔軟な心で一日を過ごせば、思わぬ幸運に出会えるかもしれません。",
        luck: 3,
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
      return "/image/晴れ.png"
    } else if (weatherText.includes("曇り") && weatherText.includes("晴れ")) {
      return "/image/曇り.png"
    } else if (weatherText.includes("曇り") && !weatherText.includes("雨") && !weatherText.includes("雪")) {
      return "/image/曇り.png"
    } else if (weatherText.includes("雨") && weatherText.includes("曇り")) {
      return "/image/曇りと雨.png"
    } else if (weatherText.includes("雨") && !weatherText.includes("雷")) {
      return "/image/雨.png"
    } else if (weatherText.includes("雪") && (weatherText.includes("強い") || weatherText.includes("暴風"))) {
      return "/image/吹雪.png"
    } else if (weatherText.includes("雪")) {
      return "/image/雪.png"
    } else if (weatherText.includes("霧")) {
      return "/image/霧.png"
    } else if (weatherText.includes("雷")) {
      return "/image/雷.png"
    } else {
      return "/image/曇り.png"
    }
  }

  // 「のち」を含む天気かどうかをチェックし、画像パスを取得
  const getWeatherImages = (weather) => {
    if (weather.includes("のち")) {
      // 「のち」で分割して前後の天気を取得
      const [firstWeather, secondWeather] = weather.split("のち")
      return {
        hasTransition: true,
        firstImagePath: getWeatherImagePath(firstWeather),
        secondImagePath: getWeatherImagePath(secondWeather),
        firstWeather,
        secondWeather,
      }
    } else {
      // 「のち」を含まない場合は単一の画像
      return {
        hasTransition: false,
        imagePath: getWeatherImagePath(weather),
      }
    }
  }

  const fortune = getFortuneResult(weatherData.weather)
  const weatherImages = getWeatherImages(weatherData.weather)

  console.log(`おみくじ結果: ${fortune.result} (天気: ${weatherData.weather})`)
  if (weatherImages.hasTransition) {
    console.log(`天気の変化: ${weatherImages.firstWeather} → ${weatherImages.secondWeather}`)
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
    return `${year}年${month}月${day}日`
  }

  return (
    <div className="weather-fortune">
      <h2>能天気おみくじ</h2>

      <div className="fortune-card">
        <div className="fortune-header">
          <span className="region-date">
            {weatherData.region} - {formatDate(weatherData.date)}
          </span>
          <span className="weather-info">
            {weatherData.weather}
            {weatherData.temperature.max && weatherData.temperature.min
              ? ` ${weatherData.temperature.max}℃/${weatherData.temperature.min}℃`
              : ""}
          </span>
        </div>

        <div className="fortune-result">
          <div className="weather-image-container">
            {weatherImages.hasTransition ? (
              // 「のち」を含む場合は2つの画像を表示
              <>
                <img
                  src={weatherImages.firstImagePath || "/placeholder.svg"}
                  alt={weatherImages.firstWeather}
                  className="weather-image transition-image"
                  onError={(e) => {
                    console.error(`画像の読み込みに失敗しました: ${weatherImages.firstImagePath}`)
                    e.target.src = "/image/曇り.png"
                    e.target.alt = "画像が見つかりません"
                  }}
                />
                <span className="weather-arrow">→</span>
                <img
                  src={weatherImages.secondImagePath || "/placeholder.svg"}
                  alt={weatherImages.secondWeather}
                  className="weather-image transition-image"
                  onError={(e) => {
                    console.error(`画像の読み込みに失敗しました: ${weatherImages.secondImagePath}`)
                    e.target.src = "/image/曇り.png"
                    e.target.alt = "画像が見つかりません"
                  }}
                />
              </>
            ) : (
              // 単一の天気の場合は1つの画像を表示
              <img
                src={weatherImages.imagePath || fortune.imagePath}
                alt={fortune.result}
                className="weather-image"
                onError={(e) => {
                  console.error(`画像の読み込みに失敗しました: ${weatherImages.imagePath || fortune.imagePath}`)
                  e.target.src = "/image/曇り.png"
                  e.target.alt = "画像が見つかりません"
                }}
              />
            )}
          </div>
          <div className="fortune-clovers">{renderClovers(fortune.luck)}</div>
        </div>

        <p className="fortune-message">{fortune.message}</p>

        <div className="fortune-details">
          <div className="fortune-item">
            <span className="fortune-label">空気おいしい度</span>
            <div className="fortune-value">
              {renderClovers(Math.max(1, Math.floor(Math.random() * fortune.luck + 1)))}
            </div>
          </div>
          <div className="fortune-item">
            <span className="fortune-label">気分ルンルン度</span>
            <div className="fortune-value">
              {renderClovers(Math.max(1, Math.floor(Math.random() * fortune.luck + 1)))}
            </div>
          </div>
          <div className="fortune-item">
            <span className="fortune-label">お散歩日和度</span>
            <div className="fortune-value">
              {renderClovers(Math.max(1, Math.floor(Math.random() * fortune.luck + 1)))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherFortune

