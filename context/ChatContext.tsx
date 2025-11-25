
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatSession, ChatMessage } from '../types';
import { useContent } from './ContentContext';

type AdminStatus = 'Online' | 'Away';

interface ChatContextType {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  adminStatus: AdminStatus;
  startSession: (name: string, customerId?: string) => void;
  sendUserMessage: (text: string, attachmentType?: 'image' | 'location', attachmentUrl?: string) => void;
  sendAdminMessage: (sessionId: string, text: string, attachmentType?: 'image' | 'location', attachmentUrl?: string) => void;
  markAsRead: (sessionId: string) => void;
  refreshSessions: () => void;
  clearSessionMessages: (sessionId: string) => void;
  notifyTyping: () => void;
  updateAdminStatus: (status: AdminStatus) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [adminStatus, setAdminStatus] = useState<AdminStatus>('Online');
  const { content } = useContent();

  // Load all sessions and status from local storage on mount
  useEffect(() => {
    refreshSessions();
    refreshAdminStatus();
    
    // Check if this browser has an existing session
    const mySessionId = localStorage.getItem('harmonika_my_session_id');
    if (mySessionId) {
      const allSessions = getStoredSessions();
      const mySession = allSessions.find(s => s.id === mySessionId);
      if (mySession) {
        setCurrentSession(mySession);
      }
    }
  }, []);

  // Poll for updates (simulating real-time socket for both sessions and admin status)
  useEffect(() => {
    const interval = setInterval(() => {
        refreshSessions();
        refreshAdminStatus();
        
        if (currentSession) {
             const allSessions = getStoredSessions();
             const updatedMySession = allSessions.find(s => s.id === currentSession.id);
             if (updatedMySession && updatedMySession.messages.length !== currentSession.messages.length) {
                 setCurrentSession(updatedMySession);
             }
        }
    }, 2000);
    return () => clearInterval(interval);
  }, [currentSession]);

  // Auto-reply Logic
  useEffect(() => {
    const checkAutoReply = () => {
        // Only auto-reply if admin is actually away or hasn't responded? 
        // For now, we keep the existing logic based on time, but we could use adminStatus here too.
        const allSessions = getStoredSessions();
        let changed = false;
        const now = Date.now();
        const autoReplyText = content.chatConfig?.autoReplyText || "Kami sedang tidak ada di tempat, mohon tinggalkan pesan.";

        const updatedSessions = allSessions.map(session => {
            const lastMsg = session.messages[session.messages.length - 1];
            // If last message is from user AND > 60 seconds ago AND no auto-reply sent yet
            if (lastMsg && lastMsg.sender === 'user' && (now - lastMsg.timestamp > 60000)) {
                
                // Check if we already sent an auto-reply recently to avoid spam
                const hasRecentAutoReply = session.messages.slice(-3).some(m => m.isAutoReply);
                
                if (!hasRecentAutoReply) {
                    const autoReplyMsg: ChatMessage = {
                        id: Date.now().toString(),
                        text: autoReplyText,
                        sender: 'admin',
                        timestamp: Date.now(),
                        isAutoReply: true
                    };
                    session.messages.push(autoReplyMsg);
                    session.lastUpdated = Date.now();
                    session.unreadCount = 0;
                    changed = true;
                }
            }
            return session;
        });

        if (changed) {
            saveSessions(updatedSessions);
            setSessions(updatedSessions);
            if (currentSession) {
                const updatedMine = updatedSessions.find(s => s.id === currentSession.id);
                if (updatedMine) setCurrentSession(updatedMine);
            }
        }
    };

    const interval = setInterval(checkAutoReply, 10000); 
    return () => clearInterval(interval);
  }, [content]);

  const getStoredSessions = (): ChatSession[] => {
    const stored = localStorage.getItem('harmonika_chat_sessions');
    return stored ? JSON.parse(stored) : [];
  };

  const saveSessions = (newSessions: ChatSession[]) => {
    localStorage.setItem('harmonika_chat_sessions', JSON.stringify(newSessions));
  };

  const refreshSessions = () => {
    setSessions(getStoredSessions());
  };

  const refreshAdminStatus = () => {
    const storedStatus = localStorage.getItem('harmonika_admin_status');
    if (storedStatus && (storedStatus === 'Online' || storedStatus === 'Away')) {
        setAdminStatus(storedStatus as AdminStatus);
    }
  };

  const updateAdminStatus = (status: AdminStatus) => {
      setAdminStatus(status);
      localStorage.setItem('harmonika_admin_status', status);
  };

  const startSession = (name: string, customerId?: string) => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      userName: name,
      customerId: customerId || '',
      messages: [],
      lastUpdated: Date.now(),
      unreadCount: 0
    };

    const allSessions = getStoredSessions();
    allSessions.push(newSession);
    saveSessions(allSessions);
    
    setSessions(allSessions);
    setCurrentSession(newSession);
    localStorage.setItem('harmonika_my_session_id', newSession.id);

    // Welcome message
    setTimeout(() => {
        sendAdminMessage(newSession.id, `Halo ${name}, ada yang bisa kami bantu seputar koneksi internet Harmonika Tech?`);
    }, 500);
  };

  const sendUserMessage = (text: string, attachmentType?: 'image' | 'location', attachmentUrl?: string) => {
    if (!currentSession) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: Date.now(),
      attachmentType,
      attachmentUrl
    };

    const allSessions = getStoredSessions();
    const sessionIndex = allSessions.findIndex(s => s.id === currentSession.id);
    
    if (sessionIndex !== -1) {
      allSessions[sessionIndex].messages.push(newMessage);
      allSessions[sessionIndex].lastUpdated = Date.now();
      allSessions[sessionIndex].unreadCount += 1;
      
      saveSessions(allSessions);
      setSessions(allSessions);
      setCurrentSession(allSessions[sessionIndex]);
    }
  };

  const sendAdminMessage = (sessionId: string, text: string, attachmentType?: 'image' | 'location', attachmentUrl?: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'admin',
      timestamp: Date.now(),
      attachmentType,
      attachmentUrl
    };

    const allSessions = getStoredSessions();
    const sessionIndex = allSessions.findIndex(s => s.id === sessionId);
    
    if (sessionIndex !== -1) {
      allSessions[sessionIndex].messages.push(newMessage);
      allSessions[sessionIndex].lastUpdated = Date.now();
      allSessions[sessionIndex].unreadCount = 0; 
      
      saveSessions(allSessions);
      setSessions(allSessions);
      
      if (currentSession && currentSession.id === sessionId) {
        setCurrentSession(allSessions[sessionIndex]);
      }
    }
  };

  const markAsRead = (sessionId: string) => {
    const allSessions = getStoredSessions();
    const sessionIndex = allSessions.findIndex(s => s.id === sessionId);
    if (sessionIndex !== -1) {
        allSessions[sessionIndex].unreadCount = 0;
        saveSessions(allSessions);
        setSessions(allSessions);
    }
  };

  const clearSessionMessages = (sessionId: string) => {
    const allSessions = getStoredSessions();
    const sessionIndex = allSessions.findIndex(s => s.id === sessionId);
    
    if (sessionIndex !== -1) {
      allSessions[sessionIndex].messages = [];
      allSessions[sessionIndex].lastUpdated = Date.now();
      
      saveSessions(allSessions);
      setSessions(allSessions);
      
      if (currentSession && currentSession.id === sessionId) {
        setCurrentSession(allSessions[sessionIndex]);
      }
    }
  };

  const notifyTyping = () => {
    if (!currentSession) return;
    const allSessions = getStoredSessions();
    const sessionIndex = allSessions.findIndex(s => s.id === currentSession.id);
    
    if (sessionIndex !== -1) {
      allSessions[sessionIndex].lastTypingTimestamp = Date.now();
      saveSessions(allSessions);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      sessions, 
      currentSession, 
      adminStatus,
      startSession, 
      sendUserMessage, 
      sendAdminMessage, 
      markAsRead, 
      refreshSessions,
      clearSessionMessages,
      notifyTyping,
      updateAdminStatus
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
