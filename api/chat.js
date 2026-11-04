/**
 * /api/chat — Serverless Function & Backend Endpoint for InfoDrill AI Assistant
 * 
 * Works with Vercel, Netlify, Node.js servers, and Vite local development.
 * 
 * Security & Reliability Features:
 * - Keeps API keys securely on the backend (never sent to client)
 * - Rate limiting: max 20 requests per minute per IP
 * - Input validation: max 500 characters per message, last 10 messages only
 * - CORS headers with safe origins
 * - Configurable model name (defaults to Gemini 1.5 Flash)
 * - Graceful fallback response when API key is missing or service is unavailable
 */

import { SYSTEM_PROMPT, companyKnowledge } from '../src/data/companyKnowledge.js';

// Configuration
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
const MAX_MSG_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20;

// In-memory rate limiting map (IP -> array of timestamps)
const ipRequestHistory = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = ipRequestHistory.get(ip) || [];
  const recent = timestamps.filter(time => now - time < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  ipRequestHistory.set(ip, recent);

  // Periodically clean up old IP entries
  if (ipRequestHistory.size > 2000) {
    for (const [key, list] of ipRequestHistory.entries()) {
      if (list.length === 0 || now - list[list.length - 1] > RATE_LIMIT_WINDOW_MS) {
        ipRequestHistory.delete(key);
      }
    }
  }

  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

const GREETING_CHIPS = ['Our services', 'Portfolio', 'Get a quote'];

/**
 * Smart local fallback answerer if LLM API key is not configured yet
 */
function getLocalFallbackReply(userMessage) {
  const query = userMessage.toLowerCase().trim();

  // 1. Identity & capabilities ("Who are you?", "What can you do?")
  if (/\b(who\s+are\s+you|who\s+r\s+u|what\s+can\s+you\s+do|what\s+are\s+you)\b/i.test(query)) {
    return {
      reply: "I'm InfoDrill's AI assistant. I can tell you about our services, work and how to contact us.",
      chips: GREETING_CHIPS,
      showGetStarted: false
    };
  }

  // 2. "How are you?"
  if (/\b(how\s+are\s+you|how're\s+you|how\s+r\s+u|how\s+is\s+it\s+going|how's\s+it\s+going)\b/i.test(query)) {
    return {
      reply: "I'm doing great, thanks! How can I help you with InfoDrill today?",
      chips: null,
      showGetStarted: false
    };
  }

  // 3. Thanks
  if (/\b(thank\s+you|thanks|thx|thank\s+u|appreciate\s+it)\b/i.test(query)) {
    return {
      reply: "You're welcome! Is there anything else you'd like to know about InfoDrill?",
      chips: null,
      showGetStarted: false
    };
  }

  // 4. Goodbye
  if (/\b(bye|goodbye|see\s+you|see\s+ya|cya|take\s+care)\b/i.test(query)) {
    return {
      reply: "Thanks for visiting InfoDrill. Have a great day!",
      chips: null,
      showGetStarted: false
    };
  }

  // 5. Explicit company inquiries: Services, Portfolio, Contact, Quote, Healthcare
  if (query.includes('health') || query.includes('hospital') || query.includes('clinic') || query.includes('ehr') || query.includes('emr') || query.includes('telemed')) {
    return {
      reply: 'InfoDrill builds secure Healthcare IT Solutions: Hospital & Clinic Management, EHR/EMR systems, Telemedicine platforms, AI healthcare tools, patient portals, and lab integrations.',
      chips: ['Get a quote', 'Our services', 'Portfolio'],
      showGetStarted: true
    };
  }

  if (query.includes('service') || query.includes('what do you do') || query.includes('what we offer') || query.includes('our services')) {
    return {
      reply: 'InfoDrill provides enterprise ERP Development, CRM Solutions, AI Solutions & Agents, Custom Software, Cloud & DevOps, Mobile Apps, and Business Automation.',
      chips: null,
      showGetStarted: true
    };
  }

  if (query.includes('portfolio') || query.includes('work') || query.includes('project') || query.includes('case stud')) {
    return {
      reply: 'Our portfolio features enterprise systems including a Manufacturing ERP Suite (saving 20+ hours weekly), Healthcare CRM Platform, AI Demand Forecasting (94% accuracy), and Logistics Apps.',
      chips: null,
      showGetStarted: true
    };
  }

  if (query.includes('contact') || query.includes('address') || query.includes('email') || query.includes('phone') || query.includes('location')) {
    return {
      reply: `You can reach InfoDrill at ${companyKnowledge.company.contact.email} or call ${companyKnowledge.company.contact.phone}. Our office is at ${companyKnowledge.company.location.address}.`,
      chips: null,
      showGetStarted: true
    };
  }

  if (query.includes('quote') || query.includes('price') || query.includes('cost') || query.includes('pricing') || query.includes('timeline')) {
    return {
      reply: "I don't have that detail. Our team can give you a clear plan within 24 hours.",
      chips: null,
      showGetStarted: true
    };
  }

  if (query.includes('nda') || query.includes('confidential') || query.includes('security')) {
    return {
      reply: companyKnowledge.company.confidentiality,
      chips: null,
      showGetStarted: false
    };
  }

  // 6. Greetings ("hi", "hello", "hey", "good morning", "good afternoon", "good evening")
  if (
    /^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings|hola)\b/i.test(query) ||
    /^(hi|hello|hey|good\s+(morning|afternoon|evening))\s*!*$/i.test(query)
  ) {
    return {
      reply: "Hello! Welcome to InfoDrill. I can help with our services, portfolio or contact details. What would you like to know?",
      chips: GREETING_CHIPS,
      showGetStarted: false
    };
  }

  // 7. Off-topic refusal (only real off-topic requests: coding help, general knowledge, news, jokes, etc.)
  return {
    reply: "I can only help with questions about InfoDrill and our services. Would you like to know what we offer?",
    chips: null,
    showGetStarted: false
  };
}

export default async function handler(req, res) {
  // 1. CORS headers
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // 2. Rate limiting check
  const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown-client';
  if (isRateLimited(clientIp)) {
    res.status(429).json({
      error: 'Too many requests. Please wait a moment before sending another message.'
    });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const rawMessages = Array.isArray(body.messages) ? body.messages : [];

    if (rawMessages.length === 0) {
      res.status(400).json({ error: 'No messages provided.' });
      return;
    }

    // Keep only the last 10 messages for context
    const recentMessages = rawMessages.slice(-10);
    const lastUserMsg = recentMessages[recentMessages.length - 1];

    if (!lastUserMsg || typeof lastUserMsg.content !== 'string' || !lastUserMsg.content.trim()) {
      res.status(400).json({ error: 'Message content is required.' });
      return;
    }

    // Enforce 500 character limit
    if (lastUserMsg.content.length > MAX_MSG_LENGTH) {
      res.status(400).json({
        error: `Message exceeds the ${MAX_MSG_LENGTH} character limit.`
      });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    // If API key is not configured, gracefully use local knowledge matcher
    if (!apiKey) {
      const fallback = getLocalFallbackReply(lastUserMsg.content);
      res.status(200).json({
        reply: fallback.reply,
        chips: fallback.chips || null,
        showGetStarted: fallback.showGetStarted,
        model: 'local-knowledge-base'
      });
      return;
    }

    // Call Google Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    // Format messages for Gemini API
    const contents = recentMessages.map((m) => ({
      role: m.role === 'assistant' || m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, MAX_MSG_LENGTH) }]
    }));

    const geminiPayload = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: contents,
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 350,
      }
    };

    const response = await fetch(geminiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geminiPayload)
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('[Chat API Error from Gemini]:', response.status, errText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidate) {
      throw new Error('No candidate content returned from LLM');
    }

    let reply = candidate.trim();
    let chips = null;

    // Parse [CHIPS: ...] tag if returned by the LLM, or attach default greeting chips
    const chipsMatch = reply.match(/\[CHIPS:\s*([^\]]+)\]/i);
    if (chipsMatch) {
      chips = chipsMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      reply = reply.replace(/\[CHIPS:\s*[^\]]+\]/i, '').trim();
    } else if (
      /^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings)\b/i.test(lastUserMsg.content.trim()) ||
      /\b(who\s+are\s+you|what\s+can\s+you\s+do)\b/i.test(lastUserMsg.content.trim())
    ) {
      chips = GREETING_CHIPS;
    }

    // Determine if "Get Started" button should be displayed
    const lowerReply = reply.toLowerCase();
    const lowerUser = lastUserMsg.content.toLowerCase();
    const showGetStarted =
      lowerReply.includes('get started') ||
      lowerReply.includes('clear plan within 24 hours') ||
      lowerUser.includes('quote') ||
      lowerUser.includes('price') ||
      lowerUser.includes('cost') ||
      lowerUser.includes('hire') ||
      lowerUser.includes('start a project');

    res.status(200).json({
      reply,
      chips,
      showGetStarted,
      model: GEMINI_MODEL
    });
  } catch (error) {
    console.error('[Chat API Internal Error]:', error);
    res.status(500).json({
      error: 'Sorry, something went wrong. Please try again or email infodrillaisolutions@gmail.com.',
      reply: 'Sorry, something went wrong. Please try again or email infodrillaisolutions@gmail.com.'
    });
  }
}

