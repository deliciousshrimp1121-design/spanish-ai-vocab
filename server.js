import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({limit:"1mb"}));
app.use(express.static(path.join(__dirname,"public")));

const PORT = process.env.PORT || 3000;
const MODEL = process.env.GEMINI_MODEL || "gemini-3.7-flash";

app.post("/api/generate", async (req,res)=>{
  try{
    const apiKey = process.env.GEMINI_API_KEY;
    if(!apiKey) return res.status(500).json({error:"後端尚未設定 GEMINI_API_KEY"});
    const existing = Array.isArray(req.body?.existing) ? req.body.existing : [];
    const ai = new GoogleGenAI({apiKey});
    const n = Math.floor(Math.random()*11)+10;
    const prompt = `你是西班牙文老師。請產生 ${n} 個適合繁體中文初學者學習的全新西班牙文單字。
絕對不能與「已出現過」清單重複。只輸出 JSON，不要 Markdown。
每個物件必須有：es, zh, category, example。
zh 使用台灣繁體中文；example 是簡短自然的西班牙文例句。
避免專有名詞、過時詞、重複詞形與只差性別/單複數的重複項。
已出現過：${JSON.stringify(existing.slice(-5000))}`;

    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: { responseMimeType:"application/json" }
    });
    const raw = response.text || "[]";
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed) ? parsed : (parsed.words || []);
    const seen = new Set(existing.map(x=>String(x).toLowerCase()));
    const out=[];
    for(const w of arr){
      const es=String(w.es||"").trim();
      if(!es || seen.has(es.toLowerCase())) continue;
      seen.add(es.toLowerCase());
      out.push({es,zh:String(w.zh||"").trim(),category:String(w.category||"其他"),example:String(w.example||"").trim()});
      if(out.length>=20) break;
    }
    res.json({words:out});
  }catch(e){ console.error(e); res.status(500).json({error:e.message||"AI 生成失敗"}); }
});

app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Spanish AI site running on ${PORT}`));