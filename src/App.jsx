"use client"

import { useState } from "react"
import "./App.css"
import RouletteWheel from "./components/RouletteWheel"
import WeatherFortune from "./components/WeatherFortune"
import Header from "./components/Header"
import {regionCodes, getWeatherTextFromCode} from "./Codes.jsx"

function App() {
  const [isSpinning, setIsSpinning] = useState(false)    // 初期値はルーレットが回転していない
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // 地域名リストを生成する
  const regions = Object.keys(regionCodes)

  const startRoulette = () => {
    setIsSpinning(true)     // ルーレット回転中
    setSelectedRegion(null)
    setWeatherData(null)
    setError(null)
  }

  // ルーレットをストップし、天気データを取得
  const stopRoulette = async () => {  // asyncで非同期関数
    if (!isSpinning) return           // ルーレット非回転だとreturn

    setIsLoading(true)

    // ランダムに地域を選択
    const randomRegionIndex = Math.floor(Math.random() * regions.length) // 地域名リストから、ランダムなインデックスを生成
    const region            = regions[randomRegionIndex]   // ランダムに選択した地域名 を設定
    const regionCode        = regionCodes[region]          // 選択した地域に対応する地域コード を設定

    setSelectedRegion(region)

    try {  // エラー対策を以下に記載する宣言
      // awaitでPromise が解決されるまで処理を一時停止し、結果を待つ
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
      if (!response.ok) {  // レスポンスが正常じゃないなら
        // プログラムの実行中に、意図的にエラーを起こさせて、処理の流れを中断させる
        throw new Error(`APIリクエスト: ${response.status}`)
      }

      const data = await response.json()// レスポンスデータ(JSON形式)を、JavaScriptが扱いやすい「オブジェクト」に変換
      console.log("気象庁APIレスポンス:", data)
      const areaData = data[0]
      const timeSeriesData = areaData.timeSeries  // 時系列データ

      const weatherForecast = timeSeriesData[0]
      // 温度予報データ。3番目のデータがないなら、2番目のデータを使う
      const temperatureForecast = timeSeriesData[2] || timeSeriesData[1]

      // 天気予報の時間定義配列１つ目から取得した値を、Dateオブジェクトに変換し日付として扱ったのち
      // ISO形式の文字列に変換し、Tで分割して最初の部分（つまり日付部分）を代入
      const forecastDate = new Date(weatherForecast.timeDefines[0]).toISOString().split("T")[0]

      // 地域に対応する天気コードを検索
      const area = weatherForecast.areas.find((area) => {
        // 各area名がregionNameと一致するか、codeがregionCodeと一致するかをチェック
        return area.area.name === regionName || area.area.code === regionCode
      })
      const weatherCode = area ? area.weatherCodes[0] : weatherForecast.areas[0].weatherCodes[0]

      // 天気コードを使って天気テキストを取得
      const weatherText = getWeatherTextFromCode(weatherCode)

      let maxTemp = null
      let minTemp = null

      if (temperatureForecast) {    // 温度予報があるなら
        const foundArea = temperatureForecast.areas.find((area) => {
          // 各area名がregionNameと一致するか、codeがregionCodeと一致するかをチェック
          return area.area.name === regionName || area.area.code === regionCode
        })
        // foundAreaがあればその値を、ない場合は気温予報地域の最初の要素をtempAreaに代入
        const tempArea = foundArea || temperatureForecast.areas[0]

        if (tempArea.temps) {
          // 気温の最大と最小を取得し、数値に変換してそれぞれに保存
          maxTemp = Number.parseInt(tempArea.temps[1])
          minTemp = Number.parseInt(tempArea.temps[0]) }
        // 温度データがないなら、気温のmax値とmin値があるか確認
        else if (tempArea.tempsMax && tempArea.tempsMin) {
          // 気温の最高と最低を取得し、数値に変換してそれぞれに保存
          maxTemp = Number.parseInt(tempArea.tempsMax[0])
          minTemp = Number.parseInt(tempArea.tempsMin[0])
        }
      }

      return {   // 関数の結果として返すオブジェクトの定義
        region:      regionName,
        date:        forecastDate,
        weather:     weatherText,
        weatherCode: weatherCode,
        temperature: { max: maxTemp, min: minTemp }
      }
    }
    catch (error) {
      console.error("気象庁APIからのデータ取得エラー:", error)
      throw error
    }
  }

  return (
    <div className="app-container">
      <Header />

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
