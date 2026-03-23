"use client";

import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [status, setStatus] = useState("待機中やに");

  const searchRakuten = async () => {
    if (!keyword) return;
    
    setStatus("楽天で探し中...");
    setItems([]); 

    // 【重要】ここに手元のIDを貼り付け！
    const appId = "39d35fb1-31a6-411f-9f38-fb1cf209de42"; 
    
    const url = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?applicationId=${appId}&keyword=${encodeURIComponent(keyword)}&hits=10`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Items && data.Items.length > 0) {
        setItems(data.Items);
        setStatus("検索完了！マイクラ見つかったで！");
      } else if (data.error) {
        setStatus(`エラーやわ：${data.error_description || data.message}`);
      } else {
        setStatus("商品は見つからんだわ。キーワード変えてみて。");
      }
    } catch (error) {
      setStatus("通信エラーやに。ネット繋がっとる？");
      console.error(error);
    }
  };

  return (
    <div style={{ 
      padding: "40px", 
      background: "#f9f9f9", 
      minHeight: "100vh", 
      color: "#333", 
      fontFamily: "sans-serif" 
    }}>
      <h1 style={{ 
        borderBottom: "3px solid #ff9900", 
        paddingBottom: "10px",
        color: "#ff9900"
      }}>
        得ポチ：楽天検索テスト
      </h1>
      
      <div style={{ margin: "30px 0" }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="例：マインクラフト"
          style={{ 
            border: "2px solid #ccc", 
            padding: "12px", 
            width: "300px", 
            borderRadius: "5px",
            fontSize: "16px"
          }}
        />
        <button 
          onClick={searchRakuten}
          style={{ 
            marginLeft: "10px", 
            padding: "12px 25px", 
            background: "#ff9900", 
            color: "white", 
            border: "none", 
            borderRadius: "5px", 
            cursor: "pointer", 
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          検索！
        </button>
      </div>

      <div style={{ 
        marginBottom: "20px", 
        padding: "10px",
        background: "#eef",
        borderRadius: "5px",
        color: "#007", 
        fontWeight: "bold" 
      }}>
        【今の状態】 {status}
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {items.map((item, index) => (
          <div key={index} style={{ 
            background: "white",
            border: "1px solid #ddd", 
            padding: "20px", 
            borderRadius: "10px", 
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)" 
          }}>
            <p style={{ margin: "0 0 10px 0", fontWeight: "bold", fontSize: "18px" }}>
              {item.Item.itemName}
            </p>
            <p style={{ margin: "0", color: "#d33", fontSize: "20px", fontWeight: "bold" }}>
              価格：{item.Item.itemPrice.toLocaleString()}円
            </p>
            <a 
              href={item.Item.itemUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: "#0066cc", textDecoration: "none", fontSize: "14px" }}
            >
              楽天で見る →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}