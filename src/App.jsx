"use client"

import { useState } from "react"
import "./App.css"
import WeatherFortune from "./components/WeatherFortune"
import RouletteWheel from "./components/RouletteWheel"

function App() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // 地域コードのマッピング（気象庁APIで使用する地域コード）
  const regionCodes = {
    北海道: "016000",
    青森: "020000",
    岩手: "030000",
    宮城: "040000",
    秋田: "050000",
    山形: "060000",
    福島: "070000",
    茨城: "080000",
    栃木: "090000",
    群馬: "100000",
    埼玉: "110000",
    千葉: "120000",
    東京: "130000",
    神奈川: "140000",
    新潟: "150000",
    富山: "160000",
    石川: "170000",
    福井: "180000",
    山梨: "190000",
    長野: "200000",
    岐阜: "210000",
    静岡: "220000",
    愛知: "230000",
    三重: "240000",
    滋賀: "250000",
    京都: "260000",
    大阪: "270000",
    兵庫: "280000",
    奈良: "290000",
    和歌山: "300000",
    鳥取: "310000",
    島根: "320000",
    岡山: "330000",
    広島: "340000",
    山口: "350000",
    徳島: "360000",
    香川: "370000",
    愛媛: "380000",
    高知: "390000",
    福岡: "400000",
    佐賀: "410000",
    長崎: "420000",
    熊本: "430000",
    大分: "440000",
    宮崎: "450000",
    鹿児島: "460100",
    沖縄: "471000"
  }

  // 地域リスト
  const regions = Object.keys(regionCodes)

  // ルーレットをスタート
  const startRoulette = () => {
    setIsSpinning(true)
    setSelectedRegion(null)
    setWeatherData(null)
    setError(null)
  }

  // ルーレットをストップし、天気データを取得
  const stopRoulette = async () => {
    if (!isSpinning) return

    setIsLoading(true)

    // ランダムに地域を選択
    const randomRegionIndex = Math.floor(Math.random() * regions.length)
    const region = regions[randomRegionIndex]
    const regionCode = regionCodes[region]

    setSelectedRegion(region)

    try {
      // 気象庁APIから天気予報データを取得
      const weatherData = await fetchWeatherForecast(regionCode, region)
      setWeatherData(weatherData)
      console.log("取得した天気予報データ:", weatherData)
    } catch (err) {
      console.error("天気データの取得に失敗", err)
      setError("天気データの取得に失敗！もっかい試してみて！")
    }

    setIsSpinning(false)
    setIsLoading(false)
  }


  const fetchWeatherForecast = async (regionCode, regionName) => {
    try {
      // 気象庁の週間予報XMLデータを取得
      const response = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${regionCode}.json`)
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      console.log("気象庁APIレスポンス:", data)
      const areaData = data[0]
      const timeSeriesData = areaData.timeSeries

      const weatherForecast = timeSeriesData[0]
      const temperatureForecast = timeSeriesData[2] || timeSeriesData[1]

      const forecastDate = new Date(weatherForecast.timeDefines[0]).toISOString().split("T")[0]

      const weatherCode = weatherForecast.areas.find(
        (area) => area.area.name === regionName || area.area.code === regionCode
      )?.weatherCodes[0] || weatherForecast.areas[0].weatherCodes[0]

      const weatherText = getWeatherTextFromCode(weatherCode)

      let maxTemp = null
      let minTemp = null

      if (temperatureForecast) {
        const tempArea = temperatureForecast.areas.find(
          (area) => area.area.name === regionName || area.area.code === regionCode
        ) || temperatureForecast.areas[0]

        if (tempArea.temps) {
          maxTemp = Number.parseInt(tempArea.temps[1])
          minTemp = Number.parseInt(tempArea.temps[0])
        } else if (tempArea.tempsMax && tempArea.tempsMin) {
          maxTemp = Number.parseInt(tempArea.tempsMax[0])
          minTemp = Number.parseInt(tempArea.tempsMin[0])
        }
      }

      return {
        region: regionName,
        date: forecastDate,
        weather: weatherText,
        weatherCode: weatherCode,
        temperature: { max: maxTemp, min: minTemp }
      }
    } catch (error) {
      console.error("気象庁APIからのデータ取得エラー:", error)
      throw error
    }
  }

  // 気象庁の天気コードから天気テキストを取得する関数
  const getWeatherTextFromCode = (code) => {
    const weatherCodes = {
      100: "晴れ",
      101: "晴れ時々曇り",
      102: "晴れ一時雨",
      103: "晴れ時々雨",
      104: "晴れ一時雪",
      105: "晴れ時々雪",
      106: "晴れ一時雨か雪",
      107: "晴れ時々雨か雪",
      108: "晴れ一時雨か雷雨",
      110: "晴れのち時々曇り",
      111: "晴れのち曇り",
      112: "晴れのち一時雨",
      113: "晴れのち時々雨",
      114: "晴れのち雨",
      115: "晴れのち一時雪",
      116: "晴れのち時々雪",
      117: "晴れのち雪",
      118: "晴れのち雨か雪",
      119: "晴れのち雨か雷雨",
      120: "晴れ朝夕一時雨",
      121: "晴れ朝の内一時雨",
      122: "晴れ夕方一時雨",
      123: "晴れ山沿い雷雨",
      124: "晴れ山沿い雪",
      125: "晴れ午後は雷雨",
      126: "晴れ昼頃から雨",
      127: "晴れ夕方から雨",
      128: "晴れ夜は雨",
      130: "朝の内霧のち晴れ",
      131: "晴れ明け方霧",
      132: "晴れ朝夕曇り",
      140: "晴れ時々雨で雷を伴う",
      160: "晴れ一時雪か雨",
      170: "晴れ時々雪か雨",
      181: "晴れのち雪か雨",
      200: "曇り",
      201: "曇り時々晴れ",
      202: "曇り一時雨",
      203: "曇り時々雨",
      204: "曇り一時雪",
      205: "曇り時々雪",
      206: "曇り一時雨か雪",
      207: "曇り時々雨か雪",
      208: "曇り一時雨か雷雨",
      209: "霧",
      210: "曇りのち時々晴れ",
      211: "曇りのち晴れ",
      212: "曇りのち一時雨",
      213: "曇りのち時々雨",
      214: "曇りのち雨",
      215: "曇りのち一時雪",
      216: "曇りのち時々雪",
      217: "曇りのち雪",
      218: "曇りのち雨か雪",
      219: "曇りのち雨か雷雨",
      220: "曇り朝夕一時雨",
      221: "曇り朝の内一時雨",
      222: "曇り夕方一時雨",
      223: "曇り日中時々晴れ",
      224: "曇り昼頃から雨",
      225: "曇り夕方から雨",
      226: "曇り夜は雨",
      228: "曇り昼頃から雪",
      229: "曇り夕方から雪",
      230: "曇り夜は雪",
      231: "曇り海上海岸は霧か霧雨",
      240: "曇り時々雨で雷を伴う",
      250: "曇り時々雪で雷を伴う",
      260: "曇り一時雪か雨",
      270: "曇り時々雪か雨",
      281: "曇りのち雪か雨",
      300: "雨",
      301: "雨時々晴れ",
      302: "雨時々止む",
      303: "雨時々雪",
      304: "雨か雪",
      306: "大雨",
      308: "雨で暴風を伴う",
      309: "雨一時雪",
      311: "雨のち晴れ",
      313: "雨のち曇り",
      314: "雨のち時々雪",
      315: "雨のち雪",
      316: "雨か雪のち晴れ",
      317: "雨か雪のち曇り",
      320: "朝の内雨のち晴れ",
      321: "朝の内雨のち曇り",
      322: "雨朝晩一時雪",
      323: "雨昼頃から晴れ",
      324: "雨夕方から晴れ",
      325: "雨夜は晴れ",
      326: "雨昼頃から曇り",
      327: "雨夕方から曇り",
      328: "雨夜は曇り",
      329: "雨一時強く降る",
      340: "雨で雷を伴う",
      350: "雨で雷を伴い明け方から晴れ",
      361: "雨のち雪か雨",
      371: "雪か雨のち雨",
      400: "雪",
      401: "雪時々晴れ",
      402: "雪時々止む",
      403: "雪時々雨",
      405: "大雪",
      406: "風雪強い",
      407: "暴風雪",
      409: "雪一時雨",
      411: "雪のち晴れ",
      413: "雪のち曇り",
      414: "雪のち雨",
      420: "朝の内雪のち晴れ",
      421: "朝の内雪のち曇り",
      422: "雪昼頃から雨",
      423: "雪夕方から雨",
      425: "雪一時強く降る",
      426: "雪のちみぞれ",
      427: "みぞれのち雪",
      450: "雪で雷を伴う"
    }

    return weatherCodes[code] || "不明"
  }

  return (
    <div className="app-container">
      <h2 style={{ color: "blue", marginTop: "0px", backgroundColor: "#FFFFAA", borderRadius: "10px" }}>
        お天気ルーレットおみくじ
      </h2>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/images/お天気お姉さん.png" alt="お天気お姉さん" style={{ width: "120px" }} />
        <img src="/images/おみくじ.png" alt="おみくじ" style={{ width: "90px", marginLeft: "30px", opacity: "0.8" }} />
      </div>
      <div style={{ color: "#0088ff", margin: "15px 0px" }}>気象庁さんの予報データでおみくじしよう！</div>

      <main>
        <div className="roulette-container">
          <RouletteWheel
            regions={regions}
            isSpinning={isSpinning}
            selectedRegion={selectedRegion}
          />
        </div>

        <div className="controls">
          <button
            onClick={startRoulette}
            disabled={isSpinning || isLoading}
            className="control-button start-button"
          >スタート</button>
          <button
            onClick={stopRoulette}
            disabled={!isSpinning || isLoading}
            className="control-button stop-button"
          >ストップ</button>
        </div>

        {isLoading && (<div className="loading">気象庁さんのデータを探し中...</div>)}
        {error && <div className="error-message">{error}</div>}
        {weatherData && <WeatherFortune weatherData={weatherData} />}
      </main>
    </div>
  )
}

export default App
