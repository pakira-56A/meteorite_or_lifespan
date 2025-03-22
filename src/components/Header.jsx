"use client"

function Header ()  {

  return (
    <>
      <h2 style={{ color: "blue", marginTop: "0px", backgroundColor: "#FFFFAA", borderRadius: "10px" }}>
        お天気ルーレットおみくじ
      </h2>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="/images/お天気お姉さん.png" alt="お天気お姉さん" style={{ width: "120px" }} />
        <img src="/images/おみくじ.png" alt="おみくじ" style={{ width: "90px", marginLeft: "30px", opacity: "0.8" }} />
      </div>
      <div style={{ color: "#0088ff", margin: "15px 0px" }}>気象庁さんの予報データでおみくじしよう！</div>
    </>
  )
}

export default Header