import React, { useState } from 'react';
import { Sparkles, Send, BookOpen, Lightbulb, User, Bot, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AiQuranAssistantProps {
  initialQuestion?: string;
}

export const AiQuranAssistant: React.FC<AiQuranAssistantProps> = ({ initialQuestion = '' }) => {
  const [question, setQuestion] = useState(initialQuestion);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Assalamu Alaikum! I am your AI Quran Assistant. Ask me any question regarding Quranic verses, classical Tafsir, moral lessons, or specific topics.'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const suggestedPrompts = [
    'What does the Quran say about patience and gratitude?',
    'Verses about peace, anxiety, and trusting Allah',
    'Explain Surah Ash-Sharh (94:5-6) "With hardship comes ease"',
    'What are the Quranic lessons on treating parents?',
    'Duas for seeking forgiveness and mercy in the Quran'
  ];

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || question;
    if (!textToSend.trim() || loading) return;

    const userMsg = { sender: 'user' as const, text: textToSend };
    setChatHistory(prev => [...prev, userMsg]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend })
      });

      const data = await res.json();
      const aiMsg = { sender: 'ai' as const, text: data.answer || 'Forgive me, I could not generate an answer.' };
      setChatHistory(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Assistant fetch error:', err);
      setChatHistory(prev => [...prev, { sender: 'ai', text: 'An unexpected error occurred. Please try asking again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-16 bg-[#080C0B] text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>AI Divine Scholar</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold gold-gradient-text">
            AI Quran Assistant
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2">
            Ask questions, explore topics, and uncover deep classical reflections from the Holy Quran.
          </p>
        </div>

        {/* Suggested Prompts Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-3.5 py-1.5 rounded-full bg-[#0E1714] border border-[#C5A059]/20 hover:border-[#C5A059] text-xs text-slate-300 hover:text-[#FFF1CB] transition-all text-left flex items-center gap-1.5 cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{p}</span>
            </button>
          ))}
        </div>

        {/* Main Chat Box Container */}
        <div className="bg-[#0E1714] border-2 border-[#C5A059]/30 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col h-[520px]">
          
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {chatHistory.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`p-4 rounded-2xl max-w-[85%] text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-[#C5A059]/20 text-[#FFF1CB] border border-[#C5A059]/40 rounded-tr-none' 
                    : 'bg-[#121d19] text-slate-200 border border-[#C5A059]/15 rounded-tl-none font-light'
                }`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-xl bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] flex-shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {loading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-4 rounded-2xl bg-[#121d19] border border-[#C5A059]/15 text-xs text-[#C5A059] italic">
                  Consulting sacred scriptures and Tafsir insights...
                </div>
              </div>
            )}
          </div>

          {/* Input Row */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question about the Quran..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 bg-[#121d19] border border-[#C5A059]/30 rounded-2xl px-4 py-3 text-xs sm:text-sm text-slate-100 outline-none focus:border-[#C5A059] placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-[#C5A059] text-slate-950 font-bold shadow-lg hover:scale-105 active:scale-95 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};
