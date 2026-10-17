import React, { useState, useRef, useEffect } from 'react';
import { Equipment } from '../types/equipment';
import { StorageService } from '../services/storageService';
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw, BookOpen } from 'lucide-react';

interface AiLabAssistantProps {
  equipment: Equipment;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  references?: string[];
  safetyNotice?: boolean;
}

export const AiLabAssistant: React.FC<AiLabAssistantProps> = ({ equipment }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your LABLENS verified AI assistant for the **${equipment.name}** (${equipment.assetCode}). I have reviewed this equipment's verified laboratory manual and safety protocols. What would you like to understand about its operation, terminals, or safety limits?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      references: [equipment.labManualReference?.manualTitle || 'AIT Verified Lab Specifications']
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const suggestedQuestions = [
    `What is the most critical safety rule for ${equipment.shortName}?`,
    `Explain the working principle in simple student terms.`,
    `Why is my output waveform or reading behaving erratically?`,
    `Which lab experiment in our syllabus uses this?`
  ];

  const handleSend = async (userQuestion?: string) => {
    const query = userQuestion || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!userQuestion) setInput('');
    setIsLoading(true);

    try {
      const apiKey = StorageService.getGeminiApiKey();

      if (apiKey && apiKey.length > 10) {
        // Live Gemini Model call with grounded equipment system prompt
        const systemPrompt = `You are the verified college laboratory assistant for ${equipment.name} (Asset: ${equipment.assetCode}) at AIT Pune.
Rely strictly on this verified equipment data:
- Purpose: ${equipment.overview}
- How it works: ${equipment.howItWorks}
- Safety Precautions: ${equipment.safetyPrecautions.map(s => s.text).join('; ')}
- Pinouts / Terminals: ${equipment.pinoutAndConnections?.pins.map(p => `${p.name} (${p.description})`).join('; ') || 'N/A'}
- Common Mistakes: ${equipment.commonMistakes.map(m => `${m.mistake} -> Fix: ${m.fix}`).join('; ')}
- Syllabus Manual: ${equipment.labManualReference?.manualTitle} (${equipment.labManualReference?.experimentName})

Rules:
1. Provide accurate, concise, student-friendly engineering explanations.
2. If the user asks about an unverified or unknown wire configuration, advise them to consult their lab supervisor (Dr. P. B. Karandikar / Lab In-Charge) before switching on power.
3. Highlight any critical electrical safety risks in bold.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: `${systemPrompt}\n\nStudent asks: "${query}"` }]
                }
              ],
              generationConfig: { temperature: 0.2 }
            })
          }
        );

        if (!response.ok) {
          throw new Error('Gemini API call failed with status ' + response.status);
        }

        const data = await response.json();
        const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

        const assistantMsg: Message = {
          id: 'asst-' + Date.now(),
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          references: [equipment.labManualReference?.manualTitle || 'AIT Lab Manual']
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        // Intelligent Local Grounded Response fallback
        await new Promise(r => setTimeout(r, 750));
        let responseText = '';
        let isSafety = false;

        const qLower = query.toLowerCase();
        if (qLower.includes('safety') || qLower.includes('danger') || qLower.includes('shock') || qLower.includes('burn')) {
          const crit = equipment.safetyPrecautions[0];
          responseText = `**CRITICAL SAFETY DIRECTIVE:**\n${crit.text}\n\n*Rationale:* ${crit.rationale || 'Protects against electrical shock and component destruction.'}\n\n*Always inspect your connections with the lab assistant before flipping the main power switch!*`;
          isSafety = true;
        } else if (qLower.includes('working') || qLower.includes('how it works') || qLower.includes('principle')) {
          responseText = `**Working Principle of ${equipment.shortName}:**\n\n${equipment.howItWorks}\n\n*Key takeaway:* This ensures rapid, calibrated measurements within the specified limits of ${equipment.technicalSpecs[0]?.property || 'rated bandwidth'}.`;
        } else if (qLower.includes('terminal') || qLower.includes('pin') || qLower.includes('connect')) {
          const pinInfo = equipment.pinoutAndConnections?.pins.slice(0, 3).map(p => `• **${p.name}:** ${p.description} (${p.voltageLevel || 'Standard rating'})`).join('\n') || 'Check the Connections tab for detailed pin descriptions.';
          responseText = `**Terminal & Connection Overview:**\n\n${pinInfo}\n\n*Rule of thumb:* Never connect ground terminals to live AC points. Keep lead lengths as short as possible to reduce noise pickup.`;
        } else if (qLower.includes('mistake') || qLower.includes('wrong') || qLower.includes('erratic') || qLower.includes('noise')) {
          const common = equipment.commonMistakes[0];
          responseText = `**Most Frequent Student Mistake:**\n\n"${common.mistake}"\n\n**Consequence:** ${common.consequence}\n\n**The Fix:** ${common.fix}`;
        } else if (qLower.includes('manual') || qLower.includes('experiment') || qLower.includes('syllabus')) {
          responseText = `This equipment is cataloged under **${equipment.labManualReference?.manualTitle}**.\n\n• **Experiment:** ${equipment.labManualReference?.experimentNumber} — ${equipment.labManualReference?.experimentName}\n• **Reference Section:** ${equipment.labManualReference?.pageReference}\n• **Course:** ${equipment.labManualReference?.courseCode}`;
        } else {
          responseText = `Regarding **${equipment.name}**: ${equipment.overview}\n\nTo operate correctly, follow the standard 5-step checklist in the "How to Use" tab. Always verify voltages remain within the rated ${equipment.technicalSpecs[0]?.value || 'rated'} ${equipment.technicalSpecs[0]?.unit || 'range'}. If in doubt, ask your lab assistant (${equipment.verifiedBy}) before continuing.`;
        }

        const assistantMsg: Message = {
          id: 'asst-' + Date.now(),
          sender: 'assistant',
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          references: [equipment.labManualReference?.manualTitle || 'AIT Lab Manual'],
          safetyNotice: isSafety
        };
        setMessages(prev => [...prev, assistantMsg]);
      }
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          sender: 'assistant',
          text: `I encountered an issue retrieving the live answer: ${err.message}. However, based on the localized lab record for ${equipment.name}, please refer to section "${equipment.labManualReference?.pageReference}" of the verified lab manual or consult your lab instructor.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          safetyNotice: true
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-lab-900/60 rounded-xl border border-lab-border overflow-hidden">
      {/* Header */}
      <div className="p-3.5 border-b border-lab-border bg-lab-900/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lab-accent/15 border border-lab-accent/30 flex items-center justify-center text-lab-accent">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              LABLENS Grounded Assistant
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Verified
              </span>
            </h4>
            <div className="text-[11px] text-slate-400 font-mono">
              Context: {equipment.shortName}
            </div>
          </div>
        </div>
        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5 text-lab-accent" />
          <span>Manual-Grounded</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                m.sender === 'user'
                  ? 'bg-lab-accent/20 text-lab-accent border border-lab-accent/40'
                  : m.safetyNotice
                  ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                  : 'bg-lab-800 text-slate-300 border border-lab-border'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-lab-accent/15 text-slate-100 border border-lab-accent/30 rounded-tr-none'
                  : m.safetyNotice
                  ? 'bg-red-950/40 text-red-100 border border-red-500/30 rounded-tl-none'
                  : 'bg-lab-850/90 text-slate-200 border border-lab-border/80 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>

              {m.references && m.references.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <BookOpen className="w-3 h-3 text-lab-accent" />
                  <span>Ref: {m.references[0]}</span>
                </div>
              )}

              <div className="text-[9px] text-slate-500 text-right mt-1 font-mono">
                {m.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-lab-800 border border-lab-border flex items-center justify-center text-lab-accent animate-pulse">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="p-3 rounded-2xl bg-lab-850 text-xs text-slate-400 border border-lab-border rounded-tl-none flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-lab-accent" />
              <span>Analyzing verified laboratory manual and safety notes...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      <div className="p-2 bg-lab-950/60 border-t border-lab-border/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-lab-800/80 hover:bg-lab-700/80 text-slate-300 hover:text-white border border-lab-border whitespace-nowrap transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="p-3 bg-lab-900 border-t border-lab-border flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask about ${equipment.shortName} pinout, operation, or safety...`}
          className="flex-1 bg-lab-950 border border-lab-border rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-lab-accent font-sans"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || isLoading}
          className="px-3 py-2 rounded-lg bg-lab-accent/20 hover:bg-lab-accent/30 text-lab-accent border border-lab-accent/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
