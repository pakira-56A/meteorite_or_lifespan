"use client"

import { useEffect, useRef } from "react"
import "./RouletteWheel.css"

function RouletteWheel({ regions, isSpinning, selectedRegion }) {
  const rouletteRef = useRef(null)
  const animationRef = useRef(null)
  const currentIndexRef = useRef(0)

  // ルーレットのアニメーション
  useEffect(() => {
    if (isSpinning) {
      let startTime

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const elapsed = timestamp - startTime

        // 回転速度を計算（時間経過とともに少し速くなる）
        const speed = Math.min(100, 50 + elapsed / 100)

        if (elapsed % speed < 16) {
          // 16msは約60FPSに相当
          currentIndexRef.current = (currentIndexRef.current + 1) % regions.length

          if (rouletteRef.current) {
            // 現在の地域を表示
            rouletteRef.current.textContent = regions[currentIndexRef.current]
          }
        }

        animationRef.current = requestAnimationFrame(animate)
      }

      animationRef.current = requestAnimationFrame(animate)
      console.log("ルーレットアニメーション開始")

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          console.log("ルーレットアニメーション停止")
        }
      }
    }
  }, [isSpinning, regions])

  // 選択された地域が変更されたとき
  useEffect(() => {
    if (selectedRegion && rouletteRef.current) {
      rouletteRef.current.textContent = selectedRegion
    }
  }, [selectedRegion])

  return (
    <div className="roulette-wheel">
      <div className="roulette-display" ref={rouletteRef}>
        {selectedRegion || regions[0]}
      </div>
    </div>
  )
}

export default RouletteWheel

