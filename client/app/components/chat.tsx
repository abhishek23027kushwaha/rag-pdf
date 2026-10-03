'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as React from 'react';
import { Loader2 } from 'lucide-react';

interface Doc {
  pageContent?: string;
  metadata?: {
    loc?: {
      pageNumber?: number;
    };
    source?: string;
  };
}

interface IMessage {
  role: 'assistant' | 'user';
  content?: string;
  documents?: Doc[];
}

const ChatComponent: React.FC = () => {
  const [message, setMessage] = React.useState<string>('');
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSendChatMessage = async () => {
    if (!message.trim()) return;

    const currentMessage = message;
    setMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: currentMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch(`http://localhost:8000/chat?message=${encodeURIComponent(currentMessage)}`);
      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data?.message,
          documents: data?.docs,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error connecting to the server.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen relative bg-slate-950 text-white p-6">
      <div className="flex-1 overflow-y-auto pb-24 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 pr-2">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-slate-500 flex-col">
            <h2 className="text-2xl font-semibold text-slate-300 mb-2">Welcome to PDF AI</h2>
            <p>Upload a PDF on the left and start asking questions!</p>
          </div>
        )}
        
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'}`}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              
              {/* Display sources if available */}
              {msg.documents && msg.documents.length > 0 && (
                <div className="mt-4 text-xs bg-slate-900/50 p-3 rounded-lg border border-slate-700/50">
                  <span className="font-semibold text-slate-400 mb-2 block">Found in Document Sources:</span>
                  <ul className="list-disc ml-4 space-y-2">
                    {msg.documents.map((doc, i) => (
                      <li key={i} className="text-slate-400">
                        {doc.pageContent && doc.pageContent.length > 100 
                          ? `"${doc.pageContent.substring(0, 100)}..."` 
                          : `"${doc.pageContent}"`}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-2xl rounded-bl-none p-4 shadow-lg flex items-center gap-2">
              <Loader2 className="animate-spin text-slate-400" size={16} />
              <span className="text-slate-400 text-sm">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="absolute bottom-6 left-6 right-6 flex gap-3 bg-slate-900 p-2 rounded-xl border border-slate-700 shadow-xl">
        <Input
          className="flex-1 bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 text-md px-4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question about your PDF..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendChatMessage();
            }
          }}
          disabled={isLoading}
        />
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 transition-colors"
          onClick={handleSendChatMessage} 
          disabled={!message.trim() || isLoading}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatComponent;
