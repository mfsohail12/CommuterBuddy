import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";
import useUser from "../hooks/useUser";

export default function RealtimeChat({ roomName, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const user = useUser();

  useEffect(() => {
    if (!user) return;

    // Load existing messages
    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("room_id", roomName)
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error loading messages:", error);
        } else {
          setMessages(data || []);
        }
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    loadMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`room-${roomName}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `room_id=eq.${roomName}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, roomName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !user) return;

    try {
      const { error } = await supabase.from("chat_messages").insert([
        {
          room_id: roomName,
          user_id: user.id,
          user_name: user.full_name || user.email,
          message: input.trim(),
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Error sending message:", error);
      } else {
        setInput("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please sign in to use chat</p>
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Close Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 flex flex-col z-[2000]">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800">Chat Room</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.user_id === user.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg ${
                  message.user_id === user.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <div className="text-sm font-medium mb-1">
                  {message.user_id === user.id ? "You" : message.user_name}
                </div>
                <div className="text-sm">{message.message}</div>
                <div
                  className={`text-xs mt-1 ${
                    message.user_id === user.id
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {formatTime(message.created_at)}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
