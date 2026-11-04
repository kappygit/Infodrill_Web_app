import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  ArrowRight,
  RotateCcw,
  ChevronDown,
  Loader2
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { useModal } from '@/context/ModalContext';
import { Logo } from '@/components/ui/Logo';
import './CompanyChatbot.css';

const SESSION_STORAGE_KEY = 'infodrill_chat_history';
const MAX_INPUT_CHARS = 500;
const COUNTER_THRESHOLD = 400;

const INITIAL_BOT_MESSAGE = {
  id: 'init-msg',
  role: 'assistant',
  content: "Hi! I can tell you about InfoDrill's services, work and how to contact us. What would you like to know?",
  timestamp: Date.now()
};

const QUICK_REPLY_CHIPS = [
  'What services do you offer?',
  'Show your portfolio',
  'How can I contact you?',
  'Get a quote'
];

export function CompanyChatbot() {
  const { openGetStartedModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const [typingStatusText, setTypingStatusText] = useState('Thinking...');
  
  // Typewriter state for smooth streaming effect
  const [activeTypingId, setActiveTypingId] = useState(null);
  const [visibleWordsCount, setVisibleWordsCount] = useState(0);

  // Scroll tracking state
  const [showScrollBottomBtn, setShowScrollBottomBtn] = useState(false);

  // Initialize messages from sessionStorage or fallback to initial welcome message
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[Chatbot]: Could not load saved history from sessionStorage', e);
    }
    return [INITIAL_BOT_MESSAGE];
  });

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatWindowRef = useRef(null);
  const isNearBottomRef = useRef(true);
  const typewriterTimerRef = useRef(null);
  const statusTimerRef = useRef(null);

  // Detect user preference for reduced motion
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  // Has user sent any message yet? (Chips hide once user sends their first message)
  const hasUserSentMessage = messages.some((m) => m.role === 'user');

  // Save conversation to sessionStorage whenever messages change
  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('[Chatbot]: Could not save history to sessionStorage', e);
    }
  }, [messages]);

  // Check if user is scrolled near bottom (within 80px)
  const checkScrollPosition = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const distanceToBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const near = distanceToBottom <= 80;
    isNearBottomRef.current = near;
    setShowScrollBottomBtn(!near);
  }, []);

  // Scroll to bottom smoothly (or instant)
  const scrollToBottom = useCallback((behavior = 'smooth') => {
    const el = messagesContainerRef.current;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior
      });
      isNearBottomRef.current = true;
      setShowScrollBottomBtn(false);
    }
  }, []);

  // Auto-scroll on chat open or when typing starts if near bottom
  useEffect(() => {
    if (isOpen) {
      scrollToBottom('instant');
    }
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (isOpen && isNearBottomRef.current) {
      scrollToBottom('smooth');
    }
  }, [messages, isWaitingForResponse, isOpen, scrollToBottom]);

  // Typewriter effect handler
  useEffect(() => {
    if (!activeTypingId) {
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
      return;
    }

    const targetMsg = messages.find((m) => m.id === activeTypingId);
    if (!targetMsg) {
      setActiveTypingId(null);
      return;
    }

    const words = targetMsg.content.split(' ');
    const totalWords = words.length;

    // If reduced motion or 1 word, finish immediately
    if (prefersReducedMotion || totalWords <= 1) {
      setVisibleWordsCount(totalWords);
      setActiveTypingId(null);
      if (isNearBottomRef.current) scrollToBottom('smooth');
      return;
    }

    typewriterTimerRef.current = setInterval(() => {
      setVisibleWordsCount((prev) => {
        const next = prev + 1;
        if (next >= totalWords) {
          clearInterval(typewriterTimerRef.current);
          typewriterTimerRef.current = null;
          setActiveTypingId(null);
          return totalWords;
        }
        return next;
      });

      if (isNearBottomRef.current) {
        scrollToBottom('smooth');
      }
    }, 25); // ~25ms per word as specified

    return () => {
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
    };
  }, [activeTypingId, messages, prefersReducedMotion, scrollToBottom]);

  // Skip typewriter when user clicks the typing message
  const handleSkipTypewriter = useCallback((msgId) => {
    if (activeTypingId === msgId) {
      if (typewriterTimerRef.current) {
        clearInterval(typewriterTimerRef.current);
        typewriterTimerRef.current = null;
      }
      const targetMsg = messages.find((m) => m.id === msgId);
      if (targetMsg) {
        const totalWords = targetMsg.content.split(' ').length;
        setVisibleWordsCount(totalWords);
      }
      setActiveTypingId(null);
      if (isNearBottomRef.current) {
        scrollToBottom('smooth');
      }
    }
  }, [activeTypingId, messages, scrollToBottom]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key to close chat
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll on mobile while chat is open
  useEffect(() => {
    if (!isOpen) return;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobile) {
      const origOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = origOverflow;
      };
    }
  }, [isOpen]);

  // Direct wheel scroll isolation: turns mouse wheel anywhere over the chatbot into
  // smooth scrolling of messages while preventing the main page behind from scrolling
  useEffect(() => {
    if (!isOpen) return;

    const windowEl = chatWindowRef.current;
    const containerEl = messagesContainerRef.current;
    if (!windowEl || !containerEl) return;

    const handleWheel = (e) => {
      e.stopPropagation();
      e.preventDefault();

      if (e.deltaY < 0) {
        // User is scrolling UP -> unlock auto-scroll
        isNearBottomRef.current = false;
        setShowScrollBottomBtn(true);
      }

      containerEl.scrollTop += e.deltaY;

      const distanceToBottom = containerEl.scrollHeight - containerEl.scrollTop - containerEl.clientHeight;
      const near = distanceToBottom <= 80;
      isNearBottomRef.current = near;
      setShowScrollBottomBtn(!near);
    };

    windowEl.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      windowEl.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  // Send message flow
  const handleSendMessage = async (textToSend) => {
    const rawText = typeof textToSend === 'string' ? textToSend : inputMessage;
    const text = rawText.trim().slice(0, MAX_INPUT_CHARS);
    if (!text || isWaitingForResponse) return;

    // 1. Show user bubble IMMEDIATELY & clear input
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now()
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsWaitingForResponse(true);
    setTypingStatusText('Thinking...');

    // Switch status text to "Checking our services..." after 1.5 seconds
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => {
      setTypingStatusText('Checking our services...');
    }, 1500);

    // Scroll down to show user's sent message immediately
    scrollToBottom('smooth');

    try {
      // Send last 10 messages to /api/chat with a minimum 800ms natural feel delay
      const [response] = await Promise.all([
        fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: updatedMessages.slice(-10).map((m) => ({
              role: m.role,
              content: m.content
            }))
          })
        }),
        new Promise((resolve) => setTimeout(resolve, 800)) // Keep typing indicator visible at least 800ms
      ]);

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      const data = await response.json();
      const botReply =
        data.reply ||
        "I don't have that detail. Our team can give you a clear plan within 24 hours.";

      const botMsgId = `bot-${Date.now()}`;
      const botMsg = {
        id: botMsgId,
        role: 'assistant',
        content: botReply,
        showGetStarted: Boolean(data.showGetStarted),
        chips: Array.isArray(data.chips) && data.chips.length > 0 ? data.chips : null,
        timestamp: Date.now()
      };

      setMessages((prev) => [...prev, botMsg]);

      // Initialize typewriter for the new bot reply
      if (!prefersReducedMotion) {
        setVisibleWordsCount(1);
        setActiveTypingId(botMsgId);
      }
    } catch (err) {
      console.error('[Chatbot Send Error]:', err);
      // Fallback response with "Get Started" button
      const fallbackId = `bot-err-${Date.now()}`;
      const fallbackMsg = {
        id: fallbackId,
        role: 'assistant',
        content:
          "I don't have that detail right now. Our team can give you a clear plan within 24 hours.",
        showGetStarted: true,
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      if (!prefersReducedMotion) {
        setVisibleWordsCount(1);
        setActiveTypingId(fallbackId);
      }
    } finally {
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
      setIsWaitingForResponse(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    if (typewriterTimerRef.current) clearInterval(typewriterTimerRef.current);
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    setActiveTypingId(null);
    setIsWaitingForResponse(false);
    const freshHistory = [INITIAL_BOT_MESSAGE];
    setMessages(freshHistory);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(freshHistory));
    } catch {}
    setInputMessage('');
  };

  return (
    <>
      {/* Floating Launch Button (Bottom Right) */}
      <button
        type="button"
        className="chatbot-floating-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close InfoDrill Assistant' : 'Open InfoDrill Assistant Chat'}
        aria-expanded={isOpen}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={24} strokeWidth={2.4} />
            </motion.div>
          ) : (
            <motion.div
              key="chat-icon"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageSquare size={24} strokeWidth={2.2} />
              <span className="chatbot-trigger-status" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            className="chatbot-window"
            role="dialog"
            aria-modal="false"
            aria-label="InfoDrill Assistant Conversation"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card className="chatbot-card">
              {/* Header (fixed at top): logo in 40px rounded box, gap-3, title, green dot, reset & close */}
              <CardHeader className="chatbot-header">
                <div className="chatbot-header-left">
                  <div className="chatbot-avatar-wrap">
                    <Logo height={22} light={false} showText={false} />
                  </div>
                  <div className="chatbot-header-meta">
                    <CardTitle className="chatbot-header-title">
                      InfoDrill Assistant
                    </CardTitle>
                    <div className="chatbot-status-row">
                      <span className="chatbot-online-dot" aria-hidden="true" />
                      <span className="chatbot-status-text">Online • AI Teammate</span>
                    </div>
                  </div>
                </div>

                <div className="chatbot-header-actions">
                  <button
                    type="button"
                    className="chatbot-icon-btn"
                    onClick={handleResetChat}
                    title="Reset conversation"
                    aria-label="Reset conversation"
                  >
                    <RotateCcw size={15} />
                  </button>
                  <button
                    type="button"
                    className="chatbot-icon-btn"
                    onClick={() => setIsOpen(false)}
                    title="Close chat"
                    aria-label="Close chat"
                  >
                    <X size={17} strokeWidth={2.4} />
                  </button>
                </div>
              </CardHeader>

              {/* Messages Area (flex-1, min-h-0, plain div with overflow-y-auto overscroll-contain px-4 py-3) */}
              <div className="chatbot-messages-wrapper">
                <div
                  ref={messagesContainerRef}
                  className="chatbot-messages-container"
                  onScroll={checkScrollPosition}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                >
                  {messages.map((msg, index) => {
                    const isBot = msg.role === 'assistant';
                    const isTypewriting = activeTypingId === msg.id;
                    const words = msg.content.split(' ');
                    const displayedText = isTypewriting
                      ? words.slice(0, visibleWordsCount).join(' ')
                      : msg.content;

                    return (
                      <div
                        key={msg.id || index}
                        className={`chatbot-message-row chatbot-message-row--${isBot ? 'assistant' : 'user'}`}
                      >
                        {/* Small Bot Avatar on the Left for Bot Bubbles */}
                        {isBot && (
                          <div className="chatbot-msg-bot-avatar" aria-hidden="true">
                            <Logo height={16} light={false} showText={false} />
                          </div>
                        )}

                        <div
                          className={`chatbot-bubble chatbot-bubble--${isBot ? 'assistant' : 'user'} ${isTypewriting ? 'cursor-pointer select-none' : ''}`}
                          onClick={() => isTypewriting && handleSkipTypewriter(msg.id)}
                          title={isTypewriting ? 'Click to show full message' : undefined}
                        >
                          <p className="m-0 whitespace-pre-wrap">
                            {displayedText}
                            {isTypewriting && (
                              <span className="chatbot-blinking-cursor" aria-hidden="true">
                                |
                              </span>
                            )}
                          </p>

                          {/* "Get Started" CTA Button inside Bot Message */}
                          {isBot && msg.showGetStarted && !isTypewriting && (
                            <button
                              type="button"
                              className="chatbot-msg-cta-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                openGetStartedModal();
                              }}
                            >
                              <span>Get Started</span>
                              <ArrowRight size={13} strokeWidth={2.6} />
                            </button>
                          )}

                          {/* Quick Reply Chips under the first bot welcome message or after greetings */}
                          {isBot && !isTypewriting && (
                            index === 0 && !hasUserSentMessage ? (
                              <div className="chatbot-quick-chips-wrap">
                                {QUICK_REPLY_CHIPS.map((chip) => (
                                  <button
                                    key={chip}
                                    type="button"
                                    className="chatbot-quick-chip"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSendMessage(chip);
                                    }}
                                    disabled={isWaitingForResponse}
                                  >
                                    {chip}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              msg.chips && index === messages.length - 1 ? (
                                <div className="chatbot-quick-chips-wrap">
                                  {msg.chips.map((chip) => (
                                    <button
                                      key={chip}
                                      type="button"
                                      className="chatbot-quick-chip"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSendMessage(chip);
                                      }}
                                      disabled={isWaitingForResponse}
                                    >
                                      {chip}
                                    </button>
                                  ))}
                                </div>
                              ) : null
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing Indicator (3 Bouncing Dots + Dynamic Status Text) */}
                  {isWaitingForResponse && (
                    <div className="chatbot-message-row chatbot-message-row--assistant">
                      <div className="chatbot-msg-bot-avatar" aria-hidden="true">
                        <Logo height={16} light={false} showText={false} />
                      </div>
                      <div className="chatbot-typing-container">
                        <div className="chatbot-typing-bubble" aria-label="Assistant is thinking...">
                          <span className="chatbot-typing-dot" />
                          <span className="chatbot-typing-dot" />
                          <span className="chatbot-typing-dot" />
                        </div>
                        <span className="chatbot-typing-status-label">{typingStatusText}</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Floating "Scroll to latest" button when user scrolls up */}
                <AnimatePresence>
                  {showScrollBottomBtn && (
                    <motion.button
                      type="button"
                      className="chatbot-scroll-bottom-btn"
                      onClick={() => scrollToBottom('smooth')}
                      aria-label="Scroll to latest message"
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ChevronDown size={16} strokeWidth={2.4} />
                      <span>Latest</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Input Bar (fixed at the BOTTOM, top border, padding, rounded input, send button) */}
              <div className="chatbot-footer-input-bar">
                <div className="chatbot-input-wrapper">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    placeholder="Ask a question about InfoDrill..."
                    value={inputMessage}
                    maxLength={MAX_INPUT_CHARS}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isWaitingForResponse}
                    className="chatbot-input-field"
                    aria-label="Your message"
                  />
                  {inputMessage.length >= COUNTER_THRESHOLD && (
                    <span className="chatbot-char-counter">
                      {inputMessage.length}/{MAX_INPUT_CHARS}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  className="chatbot-send-btn"
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isWaitingForResponse}
                  aria-label="Send message"
                >
                  {isWaitingForResponse ? (
                    <Loader2 size={16} className="chatbot-send-spinner" />
                  ) : (
                    <Send size={15} />
                  )}
                </button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CompanyChatbot;
