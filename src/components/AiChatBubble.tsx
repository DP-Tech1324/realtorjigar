import React, { useState } from 'react';
import { Send } from 'lucide-react';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const AiChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) {
  setMessages(prev => [...prev, { role: 'assistant', content: 'Please enter a message first!' }]);
  return;
}


    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'You are a helpful real estate assistant.' },
            { role: 'user', content: userMessage },
          ],
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I didn’t understand that.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('OpenAI error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'There was an error. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleChat}
        className="bg-realtor-gold text-realtor-navy px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition"
      >
        {isOpen ? 'Close Chat' : 'Chat with AI'}
      </button>

      {isOpen && (
        <div className="mt-4 w-80 bg-white shadow-xl rounded-lg p-4 border border-realtor-navy">
          <div className="h-64 overflow-y-auto mb-2 space-y-2 text-sm text-gray-800">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === 'user' ? 'text-blue-600' : 'text-yellow-700'}>
                <strong>{msg.role === 'user' ? '👤 You' : '🤖 AI'}:</strong> {msg.content}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              className="flex-grow border border-gray-300 rounded px-2 py-1"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about listings..."
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-realtor-navy text-white px-2 py-1 rounded hover:bg-realtor-navy/90"
            >
              <Send size={16} />
            </button>
          </div>

          {loading && <p className="text-xs text-gray-500 mt-2">Thinking...</p>}
        </div>
      )}
    </div>
  );
};

export default AiChatBubble;
