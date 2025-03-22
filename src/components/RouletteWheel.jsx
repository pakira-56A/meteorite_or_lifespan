"use client"

import { useEffect, useRef, useState } from "react"
import "./RouletteWheel.css"

function RouletteWheel({ regions, isSpinning, selectedRegion }) {
  const rouletteRef  = useRef(null)  // ルーレットの要素を、再レンダリングに影響されずに・直接操作するための参照をつくる
  const animationRef = useRef(null)
  const [displayedRegion, setDisplayedRegion] = useState(regions[0]) // 表示される地域をuseStateで管理

  // ルーレットのアニメーション
  useEffect(() => {   // コンポーネントが描画された後の処理
    if (isSpinning) {
      let startTime           // アニメの開始時間
      let stopRegionIndex = 0 // ローカル変数としてstopRegionIndexを定義

      const animationMoving = (timestamp) => {  // 現在の時刻の情報を情報を渡す
        if (!startTime) startTime = timestamp   // startTime が未定義なら、アニメの開始時刻を現在の timestamp で設定
        const elapsed = timestamp - startTime   // 経過時間を計算
        const speed = 50

        if (elapsed % speed < 16) { // 16msは約60FPSに相当
          // インクリメントし、regions 配列の長さで割った余りをとり、インデックスが配列の長さを超えないようにする
          stopRegionIndex = (stopRegionIndex + 1) % regions.length
          setDisplayedRegion(regions[stopRegionIndex])  // 表示される地域を更新
        }
        animationRef.current = requestAnimationFrame(animationMoving)
      }

      // ルーレットアニメーション開始
      animationRef.current = requestAnimationFrame(animationMoving)

      return () => {  // コンポーネントがアンマウントされる際・依存関係が変更される際に、この関数を実行
        if (animationRef.current) {  // アニメフレームがあるなら、アニメを停止
          cancelAnimationFrame(animationRef.current)
        }
      }
    }
    else if (selectedRegion) {  // isSpinning が falseで、 selectedRegion が設定されてたら...
      setDisplayedRegion(selectedRegion)
    }
  }, [isSpinning, regions, selectedRegion])  // useEffectの依存関係を指定。これらの値が変更されると、上記の関数が再実行される

  return (
    <div className="roulette-wheel">
      <div className="roulette-display" ref={rouletteRef}>
        {displayedRegion}
      </div>
    </div>
  )
}

export default RouletteWheel
