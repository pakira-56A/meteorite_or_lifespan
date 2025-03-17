import { useState } from "react"
import { TwitterShareButton } from "react-share"

export const XShareButton = ({ weatherData, fortune }) => {
  const shareText = `\n \n ${weatherData.region}のお天気、ラッキー度：${fortune.luck}🍀\n #お天気ルーレットおみくじ\n `
  const [isHovered, setIsHovered] = useState(false)

  return (
    <TwitterShareButton
      url={window.location.href}
      title={shareText}
      style={{
        marginRight: "10px",
        cursor: "pointer",
        boxShadow: isHovered ? "none" : "0 4px 8px rgba(260, 130, 0, 0.3)",
        borderRadius: "10px",
        backgroundColor: isHovered ? "yellow" : "#dbffd3", // 薄い緑
        padding: "5px",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      onMouseOver={() => setIsHovered(true)} // Hover stateをtrueに
      onMouseOut={() => setIsHovered(false)} // Hover stateをfalseに
      target="_blank"
    >
      <img
        src={isHovered ? "/images/xshare-hover.svg" : "/images/xshare.svg"}
        alt={`Xシェア`}
        style={{
          width: "30px",
          height: "30px"
        }}
      />
    </TwitterShareButton>
  )
}
