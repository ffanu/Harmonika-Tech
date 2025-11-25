
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useChat } from '../context/ChatContext';
import { Save, RotateCcw, LogOut, Layout, Activity, Wifi, Phone, MapPin, Loader2, Check, Star, Zap, MessageSquare, Search, Send, User, Smile, Settings, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { SiteContent, PricingPackage, FeatureItem, TestimonialItem, WhyChooseItem } from '../types';

const AdminDashboard: React.FC = () => {
  const { content, updateContent, resetContent } = useContent();
  const { sessions, sendAdminMessage, markAsRead, refreshSessions, clearSessionMessages, adminStatus, updateAdminStatus } = useChat();
  
  const [formData, setFormData] = useState<SiteContent>(content);
  const [activeTab, setActiveTab] = useState<'home' | 'features' | 'packages' | 'testimonials' | 'contact' | 'chat'>('home');
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  // Chat State
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [adminReply, setAdminReply] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showChatConfig, setShowChatConfig] = useState(false); // Toggle for config
  const [isUserTyping, setIsUserTyping] = useState(false); // Local state for typing animation smoothing
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to get active session
  const activeChat = sessions.find(s => s.id === selectedChatId);

  const commonEmojis = ['😊', '👍', '👋', '🎉', '❤️', '✅', '🔥', '😂', '🤔', '🙏', '🆗', '🙌', '🤖', '✨', '🚀', '📅'];

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (!auth) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    setFormData(content);
  }, [content]);

  // Fast Polling for Typing Indicator (500ms) to ensure smooth UX
  useEffect(() => {
    if (!selectedChatId) return;
    
    const typingInterval = setInterval(() => {
        const chat = sessions.find(s => s.id === selectedChatId);
        if (chat && chat.lastTypingTimestamp) {
            // If updated within the last 2 seconds, show typing
            const isTyping = (Date.now() - chat.lastTypingTimestamp < 2000);
            setIsUserTyping(isTyping);
        } else {
            setIsUserTyping(false);
        }
    }, 500);

    return () => clearInterval(typingInterval);
  }, [selectedChatId, sessions]);

  // Scroll chat to bottom when selected or new message arrives
  useEffect(() => {
    if (activeTab === 'chat' && selectedChatId) {
        setTimeout(() => {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    }
  }, [selectedChatId, activeTab, activeChat?.messages.length, isUserTyping]); 

  // Focus input when chat is selected or tab changes to chat
  useEffect(() => {
    if (activeTab === 'chat' && selectedChatId) {
        setTimeout(() => {
            chatInputRef.current?.focus();
        }, 100);
    }
  }, [selectedChatId, activeTab]);

  const handleChange = (section: keyof SiteContent, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(prev[section] as any),
        [field]: value
      }
    }));
    setIsSaved(false);
  };

  const handleArrayItemChange = <T,>(
    section: keyof SiteContent, 
    itemsField: string, 
    index: number, 
    field: keyof T, 
    value: string | number
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sectionData = formData[section] as any;
    const newItems = [...sectionData[itemsField]];
    newItems[index] = { ...newItems[index], [field]: value };
    
    setFormData(prev => ({
      ...prev,
      [section]: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(prev[section as any] as any),
        [itemsField]: newItems
      }
    }));
    setIsSaved(false);
  };

  const handlePackageChange = (index: number, field: keyof PricingPackage, value: string | boolean) => {
    const newPackages = [...formData.packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setFormData(prev => ({ ...prev, packages: newPackages }));
    setIsSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    updateContent(formData);
    setIsSaving(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all content to default values? This cannot be undone.')) {
      setIsResetting(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      resetContent();
      setIsResetting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  // Chat Functions
  const handleChatSelect = (id: string) => {
      setSelectedChatId(id);
      markAsRead(id);
      setShowEmojiPicker(false);
      setShowAttachMenu(false);
  };

  const handleSendReply = (e: React.FormEvent) => {
      e.preventDefault();
      if (selectedChatId && adminReply.trim()) {
          sendAdminMessage(selectedChatId, adminReply);
          setAdminReply('');
          setShowEmojiPicker(false);
          setShowAttachMenu(false);
          // Keep focus after sending
          setTimeout(() => chatInputRef.current?.focus(), 0);
      }
  };

  const handleEmojiClick = (emoji: string) => {
    setAdminReply(prev => prev + emoji);
    setShowEmojiPicker(false);
    // Return focus to input after picking emoji
    setTimeout(() => chatInputRef.current?.focus(), 0);
  };

  const handleClearChatHistory = () => {
    if (selectedChatId && window.confirm('Are you sure you want to delete all messages in this chat session? This action cannot be undone.')) {
      clearSessionMessages(selectedChatId);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedChatId) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        sendAdminMessage(selectedChatId, 'Image Attachment', 'image', base64String);
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
    if (selectedChatId) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            sendAdminMessage(selectedChatId, 'Shared Location', 'location', mapsUrl);
            setShowAttachMenu(false);
        },
        () => {
            alert('Unable to retrieve your location');
        }
        );
    }
  };

  const toggleAdminStatus = () => {
    updateAdminStatus(adminStatus === 'Online' ? 'Away' : 'Online');
  };

  const renderHomeTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
       {/* Hero Section Form */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
          <Layout size={18} className="text-gray-500"/>
          <h2 className="font-semibold text-gray-700">Hero Section</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Tagline Pill</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={formData.hero.tagline}
              onChange={(e) => handleChange('hero', 'tagline', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Headline Start</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={formData.hero.headlineStart}
              onChange={(e) => handleChange('hero', 'headlineStart', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-pink-500 uppercase mb-1">Headline Highlight (Gradient)</label>
            <input 
              className="w-full px-3 py-2 border border-pink-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={formData.hero.headlineHighlight}
              onChange={(e) => handleChange('hero', 'headlineHighlight', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Headline End</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={formData.hero.headlineEnd}
              onChange={(e) => handleChange('hero', 'headlineEnd', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none h-24"
              value={formData.hero.description}
              onChange={(e) => handleChange('hero', 'description', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Stats Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <Activity size={18} className="text-gray-500"/>
            <h2 className="font-semibold text-gray-700">Quick Stats</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
              <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Uptime SLA</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                value={formData.stats.uptime}
                onChange={(e) => handleChange('stats', 'uptime', e.target.value)}
              />
            </div>
              <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Latency</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                value={formData.stats.latency}
                onChange={(e) => handleChange('stats', 'latency', e.target.value)}
              />
            </div>
              <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">NOC Response</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                value={formData.stats.nocResponse}
                onChange={(e) => handleChange('stats', 'nocResponse', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Monitoring Card Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <Activity size={18} className="text-gray-500"/>
            <h2 className="font-semibold text-gray-700">Monitoring Card</h2>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
              <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Current Traffic</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                value={formData.monitoring.traffic}
                onChange={(e) => handleChange('monitoring', 'traffic', e.target.value)}
              />
            </div>
              <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Packet Loss</label>
              <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                value={formData.monitoring.packetLoss}
                onChange={(e) => handleChange('monitoring', 'packetLoss', e.target.value)}
              />
            </div>
            <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Backbone Status</label>
                <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                value={formData.monitoring.backboneStatus}
                onChange={(e) => handleChange('monitoring', 'backboneStatus', e.target.value)}
              />
            </div>
            <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Alert Text 1</label>
                <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                value={formData.dashboardAlerts.alert1}
                onChange={(e) => handleChange('dashboardAlerts', 'alert1', e.target.value)}
              />
            </div>
             <div className="col-span-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Alert Text 2</label>
                <input 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                value={formData.dashboardAlerts.alert2}
                onChange={(e) => handleChange('dashboardAlerts', 'alert2', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Why Choose Us Form (Home) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <Zap size={18} className="text-gray-500"/>
            <h2 className="font-semibold text-gray-700">"Why Choose Us" (Home)</h2>
          </div>
           <div className="p-6 space-y-4">
             {formData.homeFeatures.items.map((item, idx) => (
                <div key={idx} className="pb-4 border-b border-gray-100 last:border-0">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Feature {idx + 1}</label>
                  <input 
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm mb-2"
                    value={item.title}
                    onChange={(e) => handleArrayItemChange<WhyChooseItem>('homeFeatures', 'items', idx, 'title', e.target.value)}
                  />
                  <textarea 
                    className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm h-16"
                    value={item.description}
                    onChange={(e) => handleArrayItemChange<WhyChooseItem>('homeFeatures', 'items', idx, 'description', e.target.value)}
                  />
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );

  const renderFeaturesTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
          <Layout size={18} className="text-gray-500"/>
          <h2 className="font-semibold text-gray-700">Page Header</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Hero Title</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={formData.featuresPage.heroTitle}
              onChange={(e) => handleChange('featuresPage', 'heroTitle', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Hero Subtitle</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none h-20"
              value={formData.featuresPage.heroSubtitle}
              onChange={(e) => handleChange('featuresPage', 'heroSubtitle', e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formData.featuresPage.items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
             <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">Feature Point #{idx + 1}</h3>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Title</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={item.title}
                  onChange={(e) => handleArrayItemChange<FeatureItem>('featuresPage', 'items', idx, 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Description</label>
                <textarea 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none h-24"
                  value={item.desc}
                  onChange={(e) => handleArrayItemChange<FeatureItem>('featuresPage', 'items', idx, 'desc', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPackagesTab = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Wifi className="text-pink-500" size={24}/>
        <h2 className="text-xl font-bold text-gray-800">Internet Packages</h2>
        <span className="text-sm text-gray-400 ml-2">(Edit pricing and features for the 5 slots)</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {formData.packages.map((pkg, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">Package #{index + 1}</h3>
              {pkg.highlight && <span className="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-bold">POPULAR</span>}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Name</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={pkg.name}
                  onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Speed</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={pkg.speed}
                  onChange={(e) => handlePackageChange(index, 'speed', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Devices</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={pkg.devices}
                  onChange={(e) => handlePackageChange(index, 'devices', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Feature 1</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={pkg.feature1}
                  onChange={(e) => handlePackageChange(index, 'feature1', e.target.value)}
                />
              </div>
               <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Feature 2</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={pkg.feature2}
                  onChange={(e) => handlePackageChange(index, 'feature2', e.target.value)}
                />
              </div>
               <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Price</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none font-bold text-gray-800"
                  value={pkg.price}
                  onChange={(e) => handlePackageChange(index, 'price', e.target.value)}
                />
              </div>
               <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox"
                  id={`highlight-${index}`}
                  checked={pkg.highlight || false}
                  onChange={(e) => handlePackageChange(index, 'highlight', e.target.checked)}
                  className="rounded text-pink-500 focus:ring-pink-500"
                />
                <label htmlFor={`highlight-${index}`} className="text-xs text-gray-500 cursor-pointer select-none">Mark as Popular</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTestimonialsTab = () => (
     <div className="space-y-6 animate-fade-in">
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
          <Star size={18} className="text-gray-500"/>
          <h2 className="font-semibold text-gray-700">Page Header</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Hero Title</label>
            <input 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
              value={formData.testimonialsPage.heroTitle}
              onChange={(e) => handleChange('testimonialsPage', 'heroTitle', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Hero Subtitle</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none h-20"
              value={formData.testimonialsPage.heroSubtitle}
              onChange={(e) => handleChange('testimonialsPage', 'heroSubtitle', e.target.value)}
            />
          </div>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formData.testimonialsPage.items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-700">Review #{idx + 1}</h3>
            </div>
            <div className="p-4 space-y-3">
               <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Name</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={item.name}
                  onChange={(e) => handleArrayItemChange<TestimonialItem>('testimonialsPage', 'items', idx, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Role</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={item.role}
                  onChange={(e) => handleArrayItemChange<TestimonialItem>('testimonialsPage', 'items', idx, 'role', e.target.value)}
                />
              </div>
               <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Company</label>
                <input 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={item.company}
                  onChange={(e) => handleArrayItemChange<TestimonialItem>('testimonialsPage', 'items', idx, 'company', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Review Text</label>
                <textarea 
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none h-24"
                  value={item.text}
                  onChange={(e) => handleArrayItemChange<TestimonialItem>('testimonialsPage', 'items', idx, 'text', e.target.value)}
                />
              </div>
               <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Rating (1-5)</label>
                <input 
                  type="number"
                  min="1"
                  max="5"
                  className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:border-pink-500 outline-none"
                  value={item.rating}
                  onChange={(e) => handleArrayItemChange<TestimonialItem>('testimonialsPage', 'items', idx, 'rating', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        ))}
       </div>
     </div>
  );

  const renderContactTab = () => (
    <div className="max-w-2xl mx-auto animate-fade-in">
       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-2">
            <Phone size={18} className="text-gray-500"/>
            <h2 className="font-semibold text-gray-700">Contact Information</h2>
          </div>
          <div className="p-6 space-y-6">
             <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email Address</label>
              <div className="relative">
                <input 
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                  value={formData.contact.email}
                  onChange={(e) => handleContactChange('email', e.target.value)}
                />
                <Layout className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
             <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">WhatsApp Number</label>
              <div className="relative">
                <input 
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                  value={formData.contact.whatsapp}
                  onChange={(e) => handleContactChange('whatsapp', e.target.value)}
                />
                <Phone className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
             <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Office Phone</label>
              <div className="relative">
                <input 
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none"
                  value={formData.contact.phone}
                  onChange={(e) => handleContactChange('phone', e.target.value)}
                />
                <Phone className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Address</label>
              <div className="relative">
                <textarea 
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500 outline-none h-32"
                  value={formData.contact.address}
                  onChange={(e) => handleContactChange('address', e.target.value)}
                />
                <MapPin className="absolute left-3 top-2.5 text-gray-400" size={16} />
              </div>
            </div>
          </div>
       </div>
    </div>
  );

  const renderChatTab = () => {
      const sortedSessions = [...sessions].sort((a, b) => b.lastUpdated - a.lastUpdated);

      return (
          <div className="flex h-[600px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-fade-in">
              {/* Sidebar List */}
              <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
                  {/* Admin Profile Header */}
                  <div className="p-4 border-b border-gray-200 bg-white flex items-center gap-3">
                      <div className="relative cursor-pointer" onClick={toggleAdminStatus}>
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-sm">
                              A
                          </div>
                          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white transition-colors ${adminStatus === 'Online' ? 'bg-green-500' : 'bg-amber-500'}`} title={adminStatus}></div>
                      </div>
                      <div className="flex-1 cursor-pointer" onClick={toggleAdminStatus}>
                          <div className="font-bold text-gray-900 text-sm">Administrator</div>
                          <div className={`text-xs font-medium flex items-center gap-1 ${adminStatus === 'Online' ? 'text-green-600' : 'text-amber-600'}`}>
                              {adminStatus}
                          </div>
                      </div>
                      <button 
                        onClick={() => setShowChatConfig(!showChatConfig)} 
                        className={`p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors ${showChatConfig ? 'bg-gray-100 text-pink-600' : ''}`}
                        title="Settings"
                      >
                        <Settings size={18} />
                      </button>
                  </div>

                  {/* Config Section */}
                  {showChatConfig && (
                    <div className="p-4 border-b border-gray-200 bg-gray-50/80 animate-fade-in space-y-4">
                       <div>
                           <div className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1">
                             <Loader2 size={10} className="animate-spin" /> Auto-Reply Message (60s timeout)
                           </div>
                           <textarea 
                             className="w-full p-2 border border-gray-300 rounded text-xs h-20 focus:ring-1 focus:ring-pink-500 outline-none"
                             value={formData.chatConfig.autoReplyText}
                             onChange={(e) => handleChange('chatConfig', 'autoReplyText', e.target.value)}
                             placeholder="Message sent when admin is away..."
                           />
                       </div>
                       
                       {selectedChatId && (
                           <div className="pt-2 border-t border-gray-200">
                               <button 
                                onClick={handleClearChatHistory}
                                className="flex items-center gap-2 text-red-500 hover:text-red-700 text-xs font-bold transition-colors w-full"
                               >
                                   <Trash2 size={12} /> Clear Current Chat History
                               </button>
                           </div>
                       )}
                    </div>
                  )}

                  {/* List Header */}
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider">Active Chats</h3>
                      <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-[10px] font-bold">{sortedSessions.length}</span>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                      {sortedSessions.length === 0 ? (
                          <div className="p-8 text-center text-gray-400 text-sm flex flex-col items-center">
                              <MessageSquare size={32} className="mb-2 opacity-20"/>
                              <span className="mt-2">No active chats yet.</span>
                          </div>
                      ) : (
                          sortedSessions.map(session => (
                              <div 
                                  key={session.id}
                                  onClick={() => handleChatSelect(session.id)}
                                  className={`p-3 border-b border-gray-100 cursor-pointer transition-all flex gap-3 group ${
                                    selectedChatId === session.id 
                                        ? 'bg-purple-50 border-l-4 border-l-purple-600 shadow-md z-10' 
                                        : 'border-l-4 border-l-transparent bg-white hover:bg-gray-50'
                                  }`}
                              >
                                  {/* Avatar */}
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                                      selectedChatId === session.id 
                                        ? 'bg-purple-600 text-white shadow-sm' 
                                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                  }`}>
                                      {session.userName.charAt(0).toUpperCase()}
                                  </div>

                                  <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-baseline mb-0.5">
                                          <div className="flex items-center gap-2 min-w-0">
                                            <h4 className={`text-sm font-bold truncate ${selectedChatId === session.id ? 'text-purple-900' : 'text-gray-700'}`}>
                                                {session.userName}
                                            </h4>
                                            {session.customerId && (
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded border shrink-0 ${selectedChatId === session.id ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                                                    {session.customerId}
                                                </span>
                                            )}
                                          </div>
                                          <span className="text-[10px] text-gray-400 shrink-0 ml-2">
                                              {new Date(session.lastUpdated).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                          </span>
                                      </div>

                                      <div className="flex justify-between items-center gap-2">
                                          <p className={`text-xs truncate ${selectedChatId === session.id ? 'text-purple-700 font-medium' : 'text-gray-500'}`}>
                                              {session.messages[session.messages.length - 1]?.sender === 'admin' && <span className="italic mr-1 opacity-75">You:</span>}
                                              {session.messages[session.messages.length - 1]?.text || 'No messages'}
                                          </p>
                                          {session.unreadCount > 0 && (
                                              <span className="w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] flex items-center justify-center font-bold shrink-0 shadow-sm animate-pulse">
                                                  {session.unreadCount}
                                              </span>
                                          )}
                                      </div>
                                  </div>
                              </div>
                          ))
                      )}
                  </div>
              </div>

              {/* Chat Window */}
              <div className="flex-1 flex flex-col bg-white">
                  {activeChat ? (
                      <>
                          {/* Chat Header */}
                          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                             <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                                     {activeChat.userName.charAt(0)}
                                 </div>
                                 <div>
                                     <div className="flex items-center gap-2">
                                        <div className="font-bold text-gray-800">{activeChat.userName}</div>
                                        {activeChat.customerId && (
                                            <span className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded border border-gray-200 font-medium">
                                                {activeChat.customerId}
                                            </span>
                                        )}
                                     </div>
                                     <div className="text-xs text-gray-500">
                                       Customer Support Chat
                                     </div>
                                 </div>
                             </div>
                          </div>

                          {/* Messages */}
                          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                              {activeChat.messages.map(msg => (
                                  <div key={msg.id} className={`flex flex-col mb-2 ${msg.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                                      <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                                          msg.sender === 'admin' 
                                            ? 'bg-purple-600 text-white rounded-br-sm' 
                                            : 'bg-gray-200 text-gray-800 rounded-bl-sm'
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
                                                    className={`flex items-center gap-2 p-2 rounded-lg ${msg.sender === 'admin' ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-800'}`}
                                                >
                                                    <MapPin size={16} />
                                                    <span className="underline font-semibold">View Location</span>
                                                </a>
                                            </div>
                                          )}

                                          <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                                      </div>
                                      <div className={`text-[10px] text-gray-400 mt-1 px-1 select-none ${msg.sender === 'admin' ? 'text-right' : 'text-left'}`}>
                                          {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                      </div>
                                  </div>
                              ))}
                              
                              {/* Typing Indicator */}
                              {isUserTyping && (
                                <div className="flex flex-col mb-2 items-start animate-fade-in">
                                    <div className="bg-gray-200 text-gray-500 px-4 py-3 rounded-2xl rounded-bl-sm text-xs shadow-sm flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        <span className="ml-1">Typing...</span>
                                    </div>
                                </div>
                              )}

                              <div ref={chatEndRef} />
                          </div>

                          {/* Input */}
                          <div className="p-4 border-t border-gray-200 relative">
                              {showEmojiPicker && (
                                <div className="absolute bottom-20 left-4 bg-white border border-gray-200 shadow-xl rounded-xl p-3 grid grid-cols-6 gap-2 w-64 z-10">
                                  {commonEmojis.map(emoji => (
                                    <button 
                                      key={emoji}
                                      type="button"
                                      onClick={() => handleEmojiClick(emoji)}
                                      className="text-2xl hover:bg-gray-100 rounded p-1 transition-colors"
                                    >
                                      {emoji}
                                    </button>
                                  ))}
                                </div>
                              )}
                              
                              {/* Attach Menu (Admin) */}
                              {showAttachMenu && (
                                  <div className="absolute bottom-16 left-12 bg-white border border-gray-200 shadow-xl rounded-xl p-2 w-40 z-10 animate-fade-in-up flex flex-col gap-1">
                                      <button 
                                      onClick={() => fileInputRef.current?.click()}
                                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 w-full text-left"
                                      >
                                      <ImageIcon size={16} className="text-blue-500" /> Send Image
                                      </button>
                                      <button 
                                      onClick={handleLocationShare}
                                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm text-gray-700 w-full text-left"
                                      >
                                      <MapPin size={16} className="text-red-500" /> Share Location
                                      </button>
                                  </div>
                              )}

                               {/* Hidden File Input */}
                               <input 
                                type="file" 
                                accept="image/*" 
                                ref={fileInputRef} 
                                className="hidden" 
                                onChange={handleImageUpload}
                                />

                              <form onSubmit={handleSendReply} className="flex gap-2">
                                  <div className="flex gap-1">
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            setShowEmojiPicker(!showEmojiPicker);
                                            setShowAttachMenu(false);
                                        }}
                                        className="p-2 text-gray-400 hover:text-pink-500 transition-colors"
                                    >
                                        <Smile size={24} />
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => {
                                            setShowAttachMenu(!showAttachMenu);
                                            setShowEmojiPicker(false);
                                        }}
                                        className={`p-2 transition-colors rounded-full hover:bg-gray-100 ${showAttachMenu ? 'text-pink-500 bg-pink-50' : 'text-gray-400 hover:text-pink-500'}`}
                                    >
                                        <Plus size={24} />
                                    </button>
                                  </div>
                                  <input 
                                      ref={chatInputRef}
                                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 outline-none text-sm"
                                      placeholder="Reply to customer..."
                                      value={adminReply}
                                      onChange={(e) => setAdminReply(e.target.value)}
                                  />
                                  <button type="submit" className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                                      <Send size={18} />
                                  </button>
                              </form>
                          </div>
                      </>
                  ) : (
                      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                          <MessageSquare size={48} className="mb-4 opacity-20" />
                          <p>Select a conversation from the sidebar to start chatting.</p>
                      </div>
                  )}
              </div>
          </div>
      );
  };

  const handleContactChange = (field: keyof typeof formData.contact, value: string) => {
     setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
    setIsSaved(false);
  }

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'packages', label: 'Packages' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
    { id: 'chat', label: 'Live Chat', icon: <MessageSquare size={14}/> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Nav */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
              H
            </div>
            <span className="font-bold text-gray-700">CMS Panel</span>
        </div>
        <div className="flex gap-3">
          <button onClick={() => navigate('/')} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">View Site</button>
          <button onClick={handleLogout} className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Website Content</h1>
            <p className="text-gray-500 text-sm">Manage your landing page content in real-time</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={handleReset}
              disabled={isResetting || isSaving}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResetting ? <Loader2 size={14} className="animate-spin"/> : <RotateCcw size={14}/>} 
              {isResetting ? 'Resetting...' : 'Reset Default'}
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving || isResetting}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg ${isSaved ? 'bg-green-500' : 'bg-pink-600 hover:bg-pink-700'} disabled:opacity-75 disabled:cursor-not-allowed`}
            >
               {isSaving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : isSaved ? (
                <Check size={16} />
              ) : (
                <Save size={16}/>
              )} 
              {isSaving ? 'Saving...' : (isSaved ? 'Saved!' : 'Save Changes')}
            </button>
          </div>
        </div>

        {/* Custom Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'border-pink-500 text-pink-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab.icon}
              {tab.label}
              {tab.id === 'chat' && sessions.reduce((acc, s) => acc + s.unreadCount, 0) > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full">
                      {sessions.reduce((acc, s) => acc + s.unreadCount, 0)}
                  </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === 'home' && renderHomeTab()}
        {activeTab === 'features' && renderFeaturesTab()}
        {activeTab === 'packages' && renderPackagesTab()}
        {activeTab === 'testimonials' && renderTestimonialsTab()}
        {activeTab === 'contact' && renderContactTab()}
        {activeTab === 'chat' && renderChatTab()}

      </main>
    </div>
  );
};

export default AdminDashboard;
