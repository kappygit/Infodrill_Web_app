/**
 * Firebase Cloud Function for InfoDrill AI Assistant
 * 
 * To deploy with Firebase:
 * 1. cd functions && npm install
 * 2. firebase functions:config:set gemini.key="YOUR_GEMINI_API_KEY"
 * 3. firebase deploy --only functions
 */

const { onRequest } = require('firebase-functions/v2/https');
const cors = require('cors')({ origin: true });

const SYSTEM_PROMPT = `You are the official InfoDrill Assistant for "INFODRILL AI SOLUTIONS", an enterprise IT company based in Ahmedabad, Gujarat, India.

CRITICAL INSTRUCTIONS & STRICT BOUNDARIES:
1. You answer ONLY questions about InfoDrill: our background, services, industries, portfolio, process, location, and contact information, plus friendly small talk.
2. The ONLY source of truth is InfoDrill company knowledge. NEVER invent prices, timelines, clients, or capabilities.
3. Keep every response SHORT (1 to 2 sentences for small talk, 2 to 4 sentences maximum for questions), in clean, friendly, professional English.

CONVERSATIONAL & SMALL TALK RULES (Warm, friendly, 1 to 2 sentences):
- Greetings (hi, hello, hey, good morning, good afternoon, good evening): Reply warmly and briefly, then guide the user. Example: "Hello! Welcome to InfoDrill. I can help with our services, portfolio or contact details. What would you like to know?"
  When greeting the user, ALWAYS append this exact tag at the very end: [CHIPS: Our services, Portfolio, Get a quote]
- Thanks (thank you, thanks, appreciate it): Reply: "You're welcome! Is there anything else you'd like to know about InfoDrill?"
- Goodbye (bye, goodbye, see you): Reply: "Thanks for visiting InfoDrill. Have a great day!"
- "How are you?": Reply: "I'm doing great, thanks! How can I help you with InfoDrill today?"
- "Who are you?" / "What can you do?": Reply: "I'm InfoDrill's AI assistant. I can tell you about our services, work and how to contact us."
- Handle these small talk messages with the same friendly tone, in 1 to 2 sentences. DO NOT use the off-topic refusal message for them.

OFF-TOPIC RULES:
- Only real off-topic requests (coding help, general knowledge, news, jokes) get the refusal message:
  "I can only help with questions about InfoDrill and our services. Would you like to know what we offer?"

MISSING INFO:
- If the answer is not in the knowledge base, say:
  "I don't have that detail. Our team can give you a clear plan within 24 hours."
- Contact info: infodrillaisolutions@gmail.com, Phone: +91 92135 32517, Office: 307, Silver Radiance One, Thaltej, Ahmedabad, Gujarat – 380054.
`;

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';

exports.chat = onRequest({ cors: true, maxInstances: 10 }, async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || (process.env.GEMINI ? process.env.GEMINI.key : null);
  const body = req.body || {};
  const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];

  if (messages.length === 0) {
    return res.status(400).json({ error: 'No messages provided.' });
  }

  const lastUserMsg = messages[messages.length - 1];
  if (!lastUserMsg || lastUserMsg.content.length > 500) {
    return res.status(400).json({ error: 'Message must be under 500 characters.' });
  }

  if (!apiKey) {
    return res.status(200).json({
      reply: 'InfoDrill provides enterprise ERP, CRM, AI Solutions, Cloud, and Custom Software. Email us at infodrillaisolutions@gmail.com for a detailed plan.',
      showGetStarted: true
    });
  }

  try {
    const contents = messages.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content.slice(0, 500) }]
    }));

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
          generationConfig: { temperature: 0.2, maxOutputTokens: 350 }
        })
      }
    );

    const data = await response.json();
    let reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || 'Our team can provide full details within 24 hours.';
    let chips = null;
    const chipsMatch = reply.match(/\[CHIPS:\s*([^\]]+)\]/i);
    if (chipsMatch) {
      chips = chipsMatch[1].split(',').map(s => s.trim()).filter(Boolean);
      reply = reply.replace(/\[CHIPS:\s*[^\]]+\]/i, '').trim();
    } else if (
      /^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings)\b/i.test(lastUserMsg.content.trim()) ||
      /\b(who\s+are\s+you|what\s+can\s+you\s+do)\b/i.test(lastUserMsg.content.trim())
    ) {
      chips = ['Our services', 'Portfolio', 'Get a quote'];
    }

    return res.status(200).json({
      reply,
      chips,
      showGetStarted: true
    });
  } catch (err) {
    return res.status(500).json({
      error: 'Sorry, something went wrong. Please try again or email infodrillaisolutions@gmail.com.',
      reply: 'Sorry, something went wrong. Please try again or email infodrillaisolutions@gmail.com.'
    });
  }
});

