import React, { useEffect, useState } from 'react';
import {
  DefenseMessage,
  InternshipTask
} from '../types';
import {
  Bot,
  User,
  Send,
  CheckCircle2,
  ArrowRight,
  Timer,
  Eye,
  ShieldCheck
} from 'lucide-react';

interface Stage8ExplanationProps {
  task: InternshipTask;
  onDefenseComplete: () => void;
  lang: 'en' | 'ru';
}

const QUESTIONS_RU = [
  'Объясните ключевое решение, которое вы приняли при выполнении этой задачи. Почему вы выбрали именно такой подход?',
  'Представьте, что объём входных данных увеличился в 100 раз. Что в вашем решении может стать проблемой и что вы измените?',
  'Какой крайний случай может привести к ошибке в вашем решении и как вы бы его обработали?'
];

const QUESTIONS_EN = [
  'Explain the key decision you made while solving this task. Why did you choose this approach?',
  'Imagine the input data becomes 100 times larger. What could become a problem in your solution and what would you change?',
  'What edge case could cause your solution to fail, and how would you handle it?'
];

export const Stage8Explanation: React.FC<Stage8ExplanationProps> = ({
                                                                      task,
                                                                      onDefenseComplete,
                                                                      lang
                                                                    }) => {
  const questions = lang === 'ru' ? QUESTIONS_RU : QUESTIONS_EN;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [inputText, setInputText] = useState('');
  const [timeLeft, setTimeLeft] = useState(45);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [verified, setVerified] = useState(false);
  const [focusChanges, setFocusChanges] = useState(0);

  const createAiMessage = (text: string, id: string): DefenseMessage => ({
    id,
    sender: 'ai',
    text,
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
  });

  const [messages, setMessages] = useState<DefenseMessage[]>([
    createAiMessage(questions[0], 'question-0')
  ]);

  // 45-second timer for each verification question
  useEffect(() => {
    if (verified || isAiThinking) return;

    if (timeLeft <= 0) return;

    const timer = window.setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [timeLeft, verified, isAiThinking]);

  // Track leaving the verification tab/window
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !verified) {
        setFocusChanges((prev) => prev + 1);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [verified]);

  const handleSubmit = () => {
    const answer = inputText.trim();

    if (!answer || timeLeft <= 0 || verified || isAiThinking) {
      return;
    }

    const studentMessage: DefenseMessage = {
      id: `answer-${questionIndex}-${Date.now()}`,
      sender: 'student',
      text: answer,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    setMessages((prev) => [...prev, studentMessage]);
    setInputText('');
    setIsAiThinking(true);

    window.setTimeout(() => {
      const nextIndex = questionIndex + 1;

      if (nextIndex < questions.length) {
        const nextQuestion = createAiMessage(
            questions[nextIndex],
            `question-${nextIndex}`
        );

        setMessages((prev) => [...prev, nextQuestion]);
        setQuestionIndex(nextIndex);
        setTimeLeft(45);
        setIsAiThinking(false);
      } else {
        const verifiedMessage = createAiMessage(
            lang === 'ru'
                ? 'Live Verification завершена. Ответы сохранены как доказательства понимания решения.'
                : 'Live Verification completed. Your answers were recorded as evidence of solution understanding.',
            `verified-${Date.now()}`
        );

        setMessages((prev) => [...prev, verifiedMessage]);
        setVerified(true);
        setIsAiThinking(false);
      }
    }, 900);
  };

  const timerCritical = timeLeft <= 10;

  return (
      <div
          className="max-w-3xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6 select-none"
          onCopy={(e) => e.preventDefault()}
          onCut={(e) => e.preventDefault()}
          onContextMenu={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              {lang === 'ru' ? 'Шаг 8' : 'Step 8'}
            </span>

              <span className="text-slate-600">·</span>

              <span className="text-xs font-mono text-slate-400">
              Live Verification
            </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'ru' ? 'Защита решения' : 'Solution Defense'}
            </h2>

            <p className="text-xs text-slate-500 mt-2">
              {lang === 'ru'
                  ? 'Короткая проверка понимания выполненной работы.'
                  : 'A short verification of your understanding of the submitted work.'}
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Verification Active</span>
          </div>
        </div>

        {/* Verification telemetry */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl bg-[#0e1118] border border-white/[0.08] p-3">
            <div className="text-[10px] uppercase tracking-wider font-mono text-slate-500 mb-1">
              {lang === 'ru' ? 'Вопрос' : 'Question'}
            </div>

            <div className="text-sm font-bold text-white">
              {verified ? '3 / 3' : `${questionIndex + 1} / 3`}
            </div>
          </div>

          <div className="rounded-2xl bg-[#0e1118] border border-white/[0.08] p-3">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono text-slate-500 mb-1">
              <Timer className="w-3 h-3" />
              {lang === 'ru' ? 'Время' : 'Time'}
            </div>

            <div
                className={`text-sm font-bold font-mono ${
                    timerCritical && !verified
                        ? 'text-red-400'
                        : 'text-cyan-400'
                }`}
            >
              {verified ? 'DONE' : `00:${String(timeLeft).padStart(2, '0')}`}
            </div>
          </div>

          <div className="rounded-2xl bg-[#0e1118] border border-white/[0.08] p-3">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider font-mono text-slate-500 mb-1">
              <Eye className="w-3 h-3" />
              Focus
            </div>

            <div className="text-sm font-bold text-white">
              {focusChanges}
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-5 sm:p-6 space-y-4">
          <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';

              return (
                  <div
                      key={msg.id}
                      className={`flex gap-3 text-left ${
                          isAi ? 'justify-start' : 'justify-end'
                      }`}
                  >
                    {isAi && (
                        <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                          <Bot className="w-4 h-4" />
                        </div>
                    )}

                    <div
                        className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                            isAi
                                ? 'bg-white/[0.03] border border-white/[0.08] text-slate-200'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
                        }`}
                    >
                      <p>{msg.text}</p>

                      <span
                          className={`block text-[10px] font-mono mt-1 ${
                              isAi ? 'text-slate-500' : 'text-blue-200'
                          }`}
                      >
                    {msg.timestamp}
                  </span>
                    </div>

                    {!isAi && (
                        <div className="w-7 h-7 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4" />
                        </div>
                    )}
                  </div>
              );
            })}

            {isAiThinking && (
                <div className="flex gap-3 text-left">
                  <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <span>
                  {lang === 'ru'
                      ? 'AI анализирует ответ...'
                      : 'AI evaluating reasoning...'}
                </span>
                  </div>
                </div>
            )}
          </div>

          <div className="pt-3 border-t border-white/[0.06]">
            {!verified ? (
                <div className="space-y-3">
                  {timeLeft === 0 && (
                      <div className="text-xs font-mono text-red-400">
                        {lang === 'ru'
                            ? 'Время истекло. Ответ заблокирован.'
                            : 'Time expired. Answer locked.'}
                      </div>
                  )}

                  <div className="flex items-center gap-2">
                <textarea
                    id="verification-answer"
                    name="verificationAnswer"
                    value={inputText}
                    disabled={timeLeft === 0 || isAiThinking}
                    onChange={(e) => setInputText(e.target.value)}
                    onPaste={(e) => e.preventDefault()}
                    placeholder={
                      lang === 'ru'
                          ? 'Объясните своими словами...'
                          : 'Explain in your own words...'
                    }
                    className="flex-1 min-h-[82px] resize-none px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 disabled:opacity-40"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                />

                    <button
                        type="button"
                        disabled={
                            !inputText.trim() ||
                            timeLeft === 0 ||
                            isAiThinking
                        }
                        onClick={handleSubmit}
                        className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Submit verification answer"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-600">
                <span>
                  {lang === 'ru'
                      ? 'Вставка и копирование отключены'
                      : 'Copy and paste disabled'}
                </span>

                    <span>
                  {lang === 'ru'
                      ? `Смена вкладки: ${focusChanges}`
                      : `Focus changes: ${focusChanges}`}
                </span>
                  </div>
                </div>
            ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />

                    <span>
                  {lang === 'ru'
                      ? 'Live Verification завершена · 3 ответа сохранены'
                      : 'Live Verification complete · 3 answers recorded'}
                </span>
                  </div>

                  <button
                      type="button"
                      onClick={onDefenseComplete}
                      className="px-4 py-2 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                  >
                <span>
                  {lang === 'ru'
                      ? 'К доказательствам'
                      : 'View Evidence'}
                </span>

                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};