import React, { useState } from "react"
import "./App.css"

function App() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPosts = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
      const result = await response.json() // Promiseを解決
      setData(result)
    } catch (error) {
      console.error("エラーが発生しました:", error)
    } finally {
      setIsLoading(false) // データ取得が完了したらローディングを解除
    }
  }

  // コンポーネントが初回レンダリングされたときにfetchPostsを呼び出す
  if (data === null) {
    fetchPosts() // 初回レンダリング時にデータを取得
  }

  if (isLoading) {
    return <p>読み込み中...</p> // データ取得中はローディング表示
  }

  return (
    <div>
      <h1>Hello World</h1>
      <p>{data[0].title}</p>
    </div>
  )
}

export default App
