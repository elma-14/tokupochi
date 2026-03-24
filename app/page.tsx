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

    // 1. 画像にあったハイフン入りのIDをここに貼り付け！
    const appId = "39d35fb1-31a6-411f-9f38-fb1cf209de42"; 
    
   // URLの最初が「app.rakuten.co.jp」になっているかチェック！
    const url = `https://openapi.rakuten.co.jp/ichibams/api/IchibaItem/Search/20220601`;   
    try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("楽天からの生の声:", data); // これを足す！
      if (data.error) {
        setStatus(`楽天エラー：${data.error_description || data.error}`);
        return;
      }

      if (data.Items && data.Items.length > 0) {
        setItems(data.Items);
        setStatus("検索完了やに！");
      } else {
        setStatus("商品は見つからんだわ。");
      }
    } catch (error) {
      setStatus("通信エラーやに");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ color: "#ff9900" }}>得ポチ：楽天検索テスト</h1>
      
      <div style={{ margin: "30px 0" }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="例：マインクラフト"
          style={{ padding: "12px", width: "300px", borderRadius: "5px", border: "2px solid #ccc" }}
        />
        <button 
          onClick={searchRakuten} 
          style={{ marginLeft: "10px", padding: "12px 25px", background: "#ff9900", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
        >
          検索！
        </button>
      </div>

      <div style={{ marginBottom: "20px", padding: "10px", background: "#eef", borderRadius: "5px", fontWeight: "bold" }}>
        【今の状態】 {status}
      </div>

      <div style={{ display: "grid", gap: "20px" }}>
        {items.map((item, index) => (
          <div key={index} style={{ background: "white", border: "1px solid #ddd", padding: "20px", borderRadius: "10px" }}>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>{item.itemName}</p>
            <p style={{ color: "#d33", fontSize: "20px", fontWeight: "bold" }}>
              価格：{item.itemPrice?.toLocaleString()}円
            </p>
            <a href={item.itemUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0066cc" }}>
              楽天で見る →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}