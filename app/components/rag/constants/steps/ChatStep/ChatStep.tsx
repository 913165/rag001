// components/rag/steps/chat/ChatStep.tsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { MessageSquare, Send } from 'lucide-react';

const chatFeatures = [
  {
    name: 'Chat Enhancement',
    description: 'Enhance chat interactions with context awareness',
    options: [
      'Context tracking',
      'History management',
      'Entity memory',
      'Follow-up handling'
    ]
  },
  {
    name: 'Chat Routing',
    description: 'Route conversations to appropriate handlers',
    options: [
      'Intent detection',
      'Topic classification',
      'Sentiment analysis',
      'Language routing'
    ]
  },
  {
    name: 'Response Optimization',
    description: 'Optimize responses for better engagement',
    options: [
      'Context integration',
      'Source attribution',
      'Clarity enhancement',
      'Follow-up suggestions'
    ]
  }
];

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: string; content: string}>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: message.trim(),
          context: chatHistory
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to process chat message');
      }

      const data = await response.json();
      
      // Add the new messages to chat history
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: data.content }
      ]);
      
      setMessage('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 space-y-4">
        <h3 className="text-lg font-semibold">Interactive Chat</h3>
        
        {/* Chat History Display */}
        <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-4">
          {chatHistory.length > 0 ? (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              Start a conversation by sending a message
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Chat Input */}
        <form onSubmit={handleChat} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !message.trim()}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Send
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export const ChatImplementation = [
  {
    title: "Chat Pipeline",
    description: "Set up chat processing pipeline",
    component: (
      <div className="max-w-3xl mx-auto space-y-6">
        {chatFeatures.map((feature) => (
          <Card key={feature.name} className="border border-gray-200">
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{feature.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
              <div className="mt-2">
                <span className="text-sm font-medium text-gray-700">Options:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {feature.options.map((option) => (
                    <span
                      key={option}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Chat Processing Settings:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Maximum Message Length: 2000 tokens</li>
            <li>• Context Window: 10 messages</li>
            <li>• Response Timeout: 30 seconds</li>
            <li>• History Retention: 1 hour</li>
          </ul>
        </div>
        <ChatComponent />
      </div>
    )
  },
  {
    title: "Chat Implementation",
    description: "Implementation of chat processing logic",
    code: `// Chat Processing Pipeline
const processChat = async (message: string, context: ChatContext) => {
  // Message preprocessing
  const enhancedMessage = await chatEnhancer.process(message, context);
  
  // Intent detection
  const intent = await intentDetector.analyze(enhancedMessage);
  
  // Route to appropriate handler
  const handler = chatRouter.getHandler(intent);
  
  // Generate response with context
  const response = await handler.execute({
    message: enhancedMessage,
    context: context,
    options: {
      maxTokens: 2000,
      temperature: 0.7,
      useHistory: true,
      timeout: 30000
    }
  });
  
  return response;
};

// Chat Enhancement
const chatEnhancer = {
  process: async (message, context) => {
    // Context tracking
    const withContext = await trackContext(message, context);
    
    // Entity memory
    const entities = await extractEntities(withContext);
    
    // History integration
    const enriched = await enrichWithHistory(withContext, context.history);
    
    return enriched;
  }
};`
  }
];

export default ChatImplementation;