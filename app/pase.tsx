'use client';

import { useState } from 'react';
import {
  MessageCircle,
  Feather,
  Music,
  BookOpen,
  Smile,
  Mic,
  Home,
  Settings,
  LogIn,
  Crown,
  Send,
} from 'lucide-react';

type Message = {
  role: 'ai' | 'user';
  text: string;
};

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('AI Chat');
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: 'Radhe Radhe 🙏 PriyaVRana-Ai me aapka swagat hai ❤️',
    },
  ]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { name: 'AI Chat', icon: <MessageCircle size={18} /> },
    { name: 'Shayari AI', icon: <Feather size={18} /> },
    { name: 'Song AI', icon: <Music size={18} /> },
    { name: 'Study AI', icon: <BookOpen size={18} /> },
    { name: 'Comedy AI', icon: <Smile size={18} /> },
    { name: 'Voice AI', icon: <Mic size={18} /> },
  ];

  const handleSend = async () => {
    if (!prompt.trim() || loading) return;

    const currentPrompt = prompt;

    const userMsg: Message = {
      role: 'user',
      text: currentPrompt,
    };

    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: currentPrompt,
          tab: activeTab,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || 'AI request failed');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: data.reply || 'Sorry, mujhe koi reply nahi mila.',
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: 'Sorry bhai, AI se response nahi aa paya. API check karo.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900 dark:bg-[#0a0a1a] dark:text-white">
      {/* Sidebar */}
      <div className="hidden w-64 flex-col bg-gradient-to-b from-blue-900 to-blue-700 p-4 md:flex">
        <div className="mb-6 text-center">
          <img
            src="https://i.imgur.com/8KmCSTT.png"
            alt="PriyaVRana-Ai"
            className="mx-auto h-20 w-20 rounded-full border-4 border-yellow-400"
          />

          <p className="mt-2 font-bold">🙏 Radhe Radhe 🙏</p>

          <h2 className="text-xl font-bold">PriyaVRana-Ai</h2>

          <p className="text-sm">मैं आपका स्वागत करता हूँ ❤️</p>
        </div>

        <nav className="flex flex-col gap-2">
          <button
            type="button"
            className="flex items-center gap-3 rounded-lg bg-blue-600 p-2"
          >
            <Home size={18} />
            Home
          </button>

          {tabs.map((tab) => (
            <button
              type="button"
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center gap-3 rounded-lg p-2 ${
                activeTab === tab.name
                  ? 'bg-blue-600'
                  : 'hover:bg-blue-800'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}

          <button
            type="button"
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-blue-800"
          >
            <LogIn size={18} />
            Login
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-blue-800"
          >
            <Settings size={18} />
            Settings
          </button>

          <button
            type="button"
            className="flex items-center gap-3 rounded-lg p-2 hover:bg-blue-800"
          >
            <Crown size={18} />
            Admin Panel
          </button>
        </nav>
      </div>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold">
              👑 PriyaVRana-Ai
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              All in One AI Assistant
            </p>
          </div>

          <div className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold">
            {activeTab}
          </div>
        </header>

        {/* Chat Area */}
        <div className="mb-4 flex-1 overflow-y-auto rounded-xl bg-white p-4 dark:bg-[#111122]">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`my-2 max-w-[85%] rounded-lg p-3 whitespace-pre-line ${
                m.role === 'ai'
                  ? 'bg-blue-100 dark:bg-blue-900'
                  : 'ml-auto bg-gray-200 text-right dark:bg-gray-800'
              }`}
            >
              {m.text}
            </div>
          ))}

          {loading && (
            <div className="my-2 max-w-[85%] rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
              <span className="animate-pulse">AI soch raha hai... 🤖</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-md dark:bg-[#111122]">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={`${activeTab} se kuch poochiye...`}
            className="flex-1 rounded-lg border border-gray-300 bg-transparent px-4 py-3 outline-none focus:border-blue-500 dark:border-gray-700"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}