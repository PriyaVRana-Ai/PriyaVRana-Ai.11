"use client";
import { useState } from "react";
import { Home, MessageSquare, Image as ImageIcon, PenTool, Music, BookOpen, Laugh, Mic, User, Settings, Crown, Moon, Send, Paperclip, Loader2 } from "lucide-react";

const sidebarItems = [
  { id: "home", name: "Home", icon: Home },
  { id: "chat", name: "AI Chat", icon: MessageSquare },
  { id: "image", name: "Image AI", icon: ImageIcon },
  { id: "shayari", name: "Shayari AI", icon: PenTool },
  { id: "song", name: "Song AI", icon: Music },
  { id: "study", name: "Study AI", icon: BookOpen },
  { id: "comedy", name: "Comedy AI", icon: Laugh },
  { id: "voice", name: "Voice AI", icon: Mic },
  { id: "login", name: "Login", icon: User },
  { id: "settings", name: "Settings", icon: Settings },
  { id: "admin", name: "Admin Panel", icon: Crown },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return alert("Pehle prompt likho 🙏");
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/ai", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ tab: activeTab, prompt }) 
      });
      const data = await res.json();
      if(data.error) throw new Error(data.error);
      setResult(data.result);
    } catch (e: any) {
      setResult("Error: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      {/* Left Sidebar */}
      <div className="w-72 bg-blue-950 p-4 overflow-y-auto">
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-purple-600 mx-auto mb-2 flex items-center justify-center text-3xl">🙏</div>
          <p className="text-yellow-300">Radhe Radhe</p>
          <h1 className="text-xl font-bold">PriyaVRana-Ai</h1>
          <p className="text-sm text-gray-300">मैं आपका स्वागत है ❤️</p>
        </div>
        
        {sidebarItems.map((item) => (
          <button 
            key={item.id} 
            onClick={() => {setActiveTab(item.id); setResult(""); setPrompt("");}} 
            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 transition ${activeTab === item.id? "bg-blue-600" : "hover:bg-blue-800"}`}
          >
            <item.icon size={20} /> {item.name}
          </button>
        ))}
        
        <div className="mt-6 text-center">
          <div className="w-full h-32 bg-purple-800 rounded-lg flex items-center justify-center mb-2">🕉️</div>
          <p className="text-yellow-300">Radhe Radhe ❤️</p>
        </div>
      </div>

      {/* Right Main */}
      <div className="flex-1 p-6 flex flex-col bg-white text-black rounded-l-3xl overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="flex items-center gap-2"><Crown className="text-blue-600"/> <span className="text-2xl font-bold">PriyaVRana-Ai</span></p>
            <p className="text-sm text-gray-600">All in One AI Assistant</p>
          </div>
          <div className="flex gap-3"><Moon/><User/></div>
        </div>

        <div className="bg-blue-100 p-3 rounded-xl mb-4 flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">🙏</div>
          <div><p className="font-bold">Radhe Radhe 🙏</p><p className="text-sm">PriyaVRana-Ai में आपका स्वागत है ❤️</p></div>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl mb-4">
          <p>मैं <span className="font-bold text-blue-700">PriyaVRana-Ai</span> हूँ<br/>आपकी हर जरूरत का स्मार्ट साथी ❤️</p>
        </div>

        <textarea 
          value={prompt} 
          onChange={(e)=>setPrompt(e.target.value)} 
          placeholder="अपना prompt यहाँ लिखें..." 
          className="flex-1 p-3 border-2 border-gray-200 rounded-xl mb-4 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />

        <button 
          onClick={handleGenerate} 
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 p-3 rounded-xl flex items-center justify-center gap-2 font-bold text-white"
        >
          {loading ? <Loader2 className="animate-spin"/> : <Send/>} Generate
        </button>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-xl">
            {activeTab === "image" ? <img src={result} className="rounded-lg w-full"/> : <p className="whitespace-pre-wrap">{result}</p>}
          </div>
        )}
      </div>
    </div>
  );
}