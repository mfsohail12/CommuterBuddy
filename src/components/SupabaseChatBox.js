import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';

export default function SupabaseChatBox({ roomId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef();

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    // Load existing messages
    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('room_id', roomId)
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error loading messages:', error);
        } else {
          setMessages(data || []);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    getCurrentUser();
    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          setMessages(current => [...current, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roomId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || !user) return;

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([
          {
            room_id: roomId,
            user_id: user.id,
            user_name: user.user_metadata?.full_name || user.email,
            message: input.trim(),
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error sending message:', error);
      } else {
        setInput('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse">Loading chat...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 mb-2">Please sign in to use chat</p>
          <button 
            onClick={onClose} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
      <div className="max-w-4xl mx-auto">
        <div className="h-40 overflow-auto mb-2 bg-gray-50 rounded-lg p-3">
          {messages.length === 0 && (
            <div className="text-gray-500 text-center py-4">
              No messages yet. Start the conversation!
            </div>
          )}
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`my-2 ${
                message.user_id === user.id 
                  ? 'text-right' 
                  : 'text-left'
              }`}
            >
              <span className={`font-bold ${
                message.user_id === user.id ? 'text-blue-600' : 'text-green-600'
              }`}>
                {message.user_id === user.id ? 'You' : message.user_name}:
              </span>
              {' '}
              <span>{message.message}</span>
              <div className="text-xs text-gray-400 mt-1">
                {new Date(message.created_at).toLocaleTimeString()}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button 
            onClick={send} 
            disabled={!input.trim()}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-r-lg transition-colors"
          >
            Send
          </button>
          <button 
            onClick={onClose} 
            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            End Chat
          </button>
        </div>
      </div>
    </div>
  );
}
