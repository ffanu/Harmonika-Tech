
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Smile, Plus, Image as ImageIcon, MapPin } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useLocation } from 'react-router-dom';

const LiveChatWidget: React.FC = () => {
  const { currentSession, startSession, sendUserMessage, notifyTyping, adminStatus } = useChat();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  // Login Form State
  const [name, setName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [nameError, setNameError] = useState('');

  // Message State
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastTypingRef = useRef<number>(0);

  const commonEmojis = ['😊', '👍', '👋', '🎉', '❤️', '✅', '🔥', '😂', '🤔', '🙏', '🆗', '🙌', '🤖', '✨', '🚀', '📅'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [currentSession?.messages, isOpen]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNameError('Nama wajib diisi');
      return;
    }
    setNameError('');
    startSession(name, customerId);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendUserMessage(message);
      setMessage('');
      setShowEmojiPicker(false);
      setShowAttachMenu(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    const now = Date.now();
    if (now - lastTypingRef.current > 1000) {
      notifyTyping();
      lastTypingRef.current = now;
    }
  };

  const handleEmojiClick = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        sendUserMessage('Image Attachment', 'image', base64String);
        setShowAttachMenu(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationShare = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        sendUserMessage('Shared Location', 'location', mapsUrl);
        setShowAttachMenu(false);
      },
      () => {
        alert('Unable to retrieve your location');
      }
    );
  };

  // Ensure hooks are always called before this conditional return
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end animate-fade-in">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col animate-fade-in-up" style={{ height: '500px' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 flex justify-between items-center text-white shrink-0">
            <div className="flex items-center gap-3">
               <div className="relative">
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold">
                    H
                 </div>
                 <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${adminStatus === 'Online' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
               </div>
               <div>
                 <div className="font-bold text-sm">Harmonika Support</div>
                 <div className="text-xs text-gray-400">{adminStatus}</div>
               </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 scrollbar-thin scrollbar-thumb-gray-300">
            {!currentSession ? (
              <div className="h-full flex flex-col justify-center">
                <div className="text-center mb-6">
                  <h3 className="font-bold text-gray-800 mb-2">Selamat Datang!</h3>
                  <p className="text-sm text-gray-500">Silakan isi data diri Anda untuk memulai percakapan dengan tim kami.</p>
                </div>
                <form onSubmit={handleStart} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nama <span className="text-red-500">*</span></label>
                    <input 
                      className={`w-full px-4 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-pink-500 outline-none ${nameError ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                      placeholder="Nama Anda"
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                        if (nameError) setNameError('');
                      }}
                    />
                    {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">ID Pelanggan (Optional)</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 text-sm focus:ring-2 focus:ring-pink-500 outline-none"
                      placeholder="Contoh: HMK-12345"
                      value={customerId}
                      onChange={e => setCustomerId(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-pink-600 text-white font-bold rounded-lg hover:bg-pink-700 transition-colors">
                    Mulai Chat
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-4">
                 <div className="text-center text-xs text-gray-400 my-4">Chat dimulai</div>
                 {currentSession.messages.map((msg) => (
                   <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-pink-600 text-white rounded-tr-none' 
                          : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                      }`}>
                        
                        {msg.attachmentType === 'image' && msg.attachmentUrl && (
                          <div className="mb-2">
                            <img src={msg.attachmentUrl} alt="attachment" className="rounded-lg max-w-full h-auto border border-white/20" />
                          </div>
                        )}

                        {msg.attachmentType === 'location' && msg.attachmentUrl && (
                          <div className="mb-2">
                             <a 
                               href={msg.attachmentUrl} 
                               target="_blank" 
                               rel="noopener noreferrer"
                               className={`flex items-center gap-2 p-2 rounded-lg ${msg.sender === 'user' ? 'bg-pink-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                             >
                                <MapPin size={16} />
                                <span className="underline font-semibold">Lihat Lokasi di Maps</span>
                             </a>
                          </div>
                        )}

                        <div className="whitespace-pre-wrap">{msg.text}</div>
                        <div className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-pink-200' : 'text-gray-400'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                   </div>
                 ))}
                 <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Footer Input */}
          {currentSession && (
            <div className="p-3 bg-white border-t border-gray-100 shrink-0 relative">
               {showEmojiPicker && (
                  <div className="absolute bottom-16 left-2 bg-white border border-gray-200 shadow-xl rounded-xl p-3 grid grid-cols-6 gap-2 w-64 z-10 animate-fade-in-up">
                    {commonEmojis.map(emoji => (
                      <button 
                        key={emoji}
                        type="button"
                        onClick={() => handleEmojiClick(emoji)}
                        className="text-xl hover:bg-gray-100 rounded p-1 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
               )}

               {showAttachMenu && (
                  <div className="absolute bottom-16 left-12 bg-white border border-gray-200 shadow-xl rounded-xl p-2 w-40 z-10 animate-fade-in-up flex flex-col gap-1">
                     <button 
                       onClick={() => fileInputRef.current?.click()}
                       className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 w-full text-left"
                     >
                       <ImageIcon size={16} className="text-blue-500" /> Kirim Foto
                     </button>
                     <button 
                       onClick={handleLocationShare}
                       className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 w-full text-left"
                     >
                       <MapPin size={16} className="text-red-500" /> Share Lokasi
                     </button>
                  </div>
               )}

               <input 
                 type="file" 
                 accept="image/*" 
                 ref={fileInputRef} 
                 className="hidden" 
                 onChange={handleImageUpload}
               />

               <form onSubmit={handleSend} className="flex gap-2 items-end">
                 <div className="flex gap-1 pb-1">
                   <button 
                     type="button" 
                     onClick={() => {
                        setShowEmojiPicker(!showEmojiPicker);
                        setShowAttachMenu(false);
                     }}
                     className="p-2 text-gray-400 hover:text-pink-500 transition-colors rounded-full hover:bg-gray-100"
                   >
                     <Smile size={22} />
                   </button>
                   <button 
                     type="button" 
                     onClick={() => {
                        setShowAttachMenu(!showAttachMenu);
                        setShowEmojiPicker(false);
                     }}
                     className={`p-2 transition-colors rounded-full hover:bg-gray-100 ${showAttachMenu ? 'text-pink-500 bg-pink-50' : 'text-gray-400 hover:text-pink-500'}`}
                   >
                     <Plus size={22} />
                   </button>
                 </div>
                 
                 <div className="flex-1 bg-gray-100 rounded-2xl flex items-center">
                    <input 
                      ref={inputRef}
                      className="w-full px-4 py-2.5 bg-transparent text-sm focus:outline-none"
                      placeholder="Ketik pesan..."
                      value={message}
                      onChange={handleInputChange}
                    />
                 </div>
                 
                 <button type="submit" className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-colors shadow-md mb-0.5">
                   <Send size={18} className="ml-0.5" />
                 </button>
               </form>
            </div>
          )}
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg hover:shadow-pink-500/40 hover:scale-110 transition-all flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

    </div>
  );
};

export default LiveChatWidget;
