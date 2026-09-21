"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, ArrowRight, Trophy, Info } from "lucide-react"
import { QuizQuestion } from "@/lib/dsa-course-data"

interface QuizComponentProps {
    questions: QuizQuestion[]
    onComplete: (score: number) => void
}

export default function QuizComponent({ questions, onComplete }: QuizComponentProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [score, setScore] = useState(0)
    const [showResults, setShowResults] = useState(false)

    const currentQuestion = questions[currentStep]

    const handleOptionSelect = (index: number) => {
        if (isSubmitted) return
        setSelectedOption(index)
    }

    const handleSubmit = () => {
        if (selectedOption === null || isSubmitted) return
        
        const correct = selectedOption === currentQuestion.correctAnswer
        if (correct) setScore(prev => prev + 1)
        setIsSubmitted(true)
    }

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1)
            setSelectedOption(null)
            setIsSubmitted(false)
        } else {
            setShowResults(true)
            onComplete(score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0))
        }
    }

    if (showResults) {
        const finalScore = score
        const percentage = (finalScore / questions.length) * 100

        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-8 text-center space-y-6 bg-white/5 border border-white/10 rounded-2xl"
            >
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                    <Trophy size={40} />
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-mono tracking-tight uppercase">Quiz Complete</h3>
                    <p className="text-white/60 font-mono text-sm leading-relaxed">
                        Your Score: <span className="text-primary font-bold">{percentage}%</span>
                    </p>
                </div>
                <div className="w-full max-w-xs bg-white/10 h-2 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className="h-full bg-primary"
                    />
                </div>
                <p className="text-white/70 font-mono text-xs max-w-[250px]">
                    {percentage === 100 
                        ? "Great job! You answered every question correctly." 
                        : "Quiz finished. Review the lesson to improve your understanding."}
                </p>
            </motion.div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Progress Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 rounded bg-accent/10 border border-accent/30 text-[10px] font-mono font-bold text-accent uppercase tracking-widest">
                        Assessment {currentStep + 1}/{questions.length}
                    </div>
                </div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    Time: --:--
                </div>
            </div>

            {/* Question */}
            <div className="space-y-4">
                <h4 className="text-lg font-bold text-white leading-snug">
                    {currentQuestion.question}
                </h4>

                <div className="grid gap-3">
                    {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === idx
                        const isCorrect = isSubmitted && idx === currentQuestion.correctAnswer
                        const isWrong = isSubmitted && isSelected && idx !== currentQuestion.correctAnswer

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(idx)}
                                disabled={isSubmitted}
                                className={`
                                    w-full p-4 rounded-xl border text-left transition-all duration-200 group relative overflow-hidden
                                    ${isSelected && !isSubmitted ? "bg-accent/10 border-accent/50 text-accent ring-1 ring-accent/20" : 
                                      isCorrect ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-400 font-semibold" :
                                      isWrong ? "bg-rose-500/10 border-rose-500/50 text-rose-400" :
                                      "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20"}
                                `}
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <span className="font-medium">{option}</span>
                                    {isCorrect && <CheckCircle2 size={18} />}
                                    {isWrong && <XCircle size={18} />}
                                </div>
                                {isSelected && !isSubmitted && (
                                    <motion.div 
                                        layoutId="quiz-active"
                                        className="absolute inset-0 bg-accent/5"
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Feedback & Actions */}
            <AnimatePresence mode="wait">
                {isSubmitted ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-2"
                    >
                        <div className="flex items-center gap-2 text-blue-400 font-mono text-[10px] uppercase font-bold tracking-widest">
                            <Info size={12} />
                            Explanation
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed italic">
                            {currentQuestion.explanation}
                        </p>
                        <button
                            onClick={handleNext}
                            className="mt-4 w-full py-3 rounded-xl bg-primary hover:bg-primary-active text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
                        >
                            {currentStep === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                            <ArrowRight size={18} />
                        </button>
                    </motion.div>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={selectedOption === null}
                        className={`
                            w-full py-4 rounded-xl font-bold font-mono uppercase tracking-wider transition-all cursor-pointer
                            ${selectedOption !== null 
                                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                                : "bg-white/5 text-white/20 cursor-not-allowed"}
                        `}
                    >
                        Submit Answer
                    </button>
                )}
            </AnimatePresence>
        </div>
    )
}
