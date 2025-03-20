"use client"

import { useEffect, useRef, useState } from "react"
import "./RouletteWheel.css"

function RouletteWheel({ regions, isSpinning, selectedRegion }) {
  const rouletteRef = useRef(null)
  const animationRef = useRef(null)
  const [displayedRegion, setDisplayedRegion] = useState(regions[0]) // 表示される地域をstateで管理

  // ルーレットのアニメーション
  useEffect(() => {
    if (isSpinning) {
      let startTime
      let currentIndex = 0 // ローカル変数としてcurrentIndexを定義

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime

        // 回転速度を計算（時間経過とともに少し速くなる）
        const speed = Math.min(100, 50 + elapsed / 100)

        if (elapsed % speed < 16) {
          // 16msは約60FPSに相当
          currentIndex = (currentIndex + 1) % regions.length
          setDisplayedRegion(regions[currentIndex]) // 表示される地域を更新
        }

        animationRef.current = requestAnimationFrame(animate)
      }

      // ルーレットアニメーション開始
      animationRef.current = requestAnimationFrame(animate)

      return () => {
        // ルーレットアニメーション停止
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    } else if (selectedRegion) {
      // selectedRegionが設定されたら、その地域を表示
      setDisplayedRegion(selectedRegion)
    }
  }, [isSpinning, regions, selectedRegion])

  return (
    <div className="roulette-wheel">
      <div className="roulette-display" ref={rouletteRef}>
        {displayedRegion}
      </div>
    </div>
  )
}

export default RouletteWheel
