import { useState } from 'react'
import { 
  Dumbbell, Star, Target, Flame, AlertTriangle, Volume2 
} from '../components/icons'

function ExercisesPage() {
  // 1. Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const quizOptions = [
    { id: 0, text: 'Khai báo một biến có thể thay đổi kiểu dữ liệu.' },
    { id: 1, text: 'Khai báo một hằng số, giá trị không thể gán lại sau khi khởi tạo.', isCorrect: true },
    { id: 2, text: 'Khai báo một biến toàn cục trong mọi scope.' }
  ]

  const handleQuizSelect = (id) => {
    if (quizSubmitted) return
    setSelectedQuizOption(id)
    setQuizSubmitted(true)
  }

  const handleResetQuiz = () => {
    setSelectedQuizOption(null)
    setQuizSubmitted(false)
  }

  // 2. Flashcard State
  const flashcards = [
    { word: 'Asynchronous', meaning: 'Bất đồng bộ', description: 'Hoạt động không đồng bộ/không đồng thời, cho phép các tác vụ khác chạy nền mà không bị chặn.', phonetic: '/eɪˈsɪŋkrənəs/' },
    { word: 'Middleware', meaning: 'Phần mềm trung gian', description: 'Phần mềm nằm giữa hệ điều hành và các ứng dụng, hoặc giữa các thành phần phần mềm để xử lý yêu cầu.', phonetic: '/ˈmɪdlwɛər/' },
    { word: 'Concurrency', meaning: 'Đồng thời', description: 'Khả năng chạy nhiều tác vụ hoặc luồng thực thi trong cùng một khoảng thời gian trùng lặp.', phonetic: '/kənˈkʌrənsi/' }
  ]
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [learnedCount, setLearnedCount] = useState(3)

  const handleFlipCard = () => {
    setIsFlipped(prev => !prev)
  }

  const handleMarkAsLearned = () => {
    setIsFlipped(false)
    setLearnedCount(prev => prev + 1)
    setTimeout(() => {
      setCurrentCardIndex((prev) => (prev + 1) % flashcards.length)
    }, 200)
  }

  // 3. Code Practice State
  const [codeAnswer, setCodeAnswer] = useState('')
  const [codeStatus, setCodeStatus] = useState(null) // 'correct', 'incorrect', null

  const handleCodeCheck = () => {
    const trimmed = codeAnswer.trim().toLowerCase()
    if (trimmed === 'name' || trimmed === 'id') {
      setCodeStatus('correct')
    } else {
      setCodeStatus('incorrect')
    }
  }

  const handleResetCode = () => {
    setCodeAnswer('')
    setCodeStatus(null)
  }

  const handleSpeak = (e, text) => {
    e.stopPropagation()
    if (!text?.trim()) return
    if (!window.speechSynthesis) {
      alert('Trình duyệt không hỗ trợ phát âm')
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    window.speechSynthesis.speak(utterance)
  }

  // Weak vocabulary items trigger "Luyện lại"
  const handleRelearn = (word) => {
    const foundIndex = flashcards.findIndex(f => f.word.toLowerCase() === word.toLowerCase())
    if (foundIndex !== -1) {
      setCurrentCardIndex(foundIndex)
      setIsFlipped(false)
      // Scroll to flashcard section
      const element = document.getElementById('flashcard-section')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* Page Header */}
      <div className="animate-fade-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Dumbbell className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-headline text-2xl font-semibold tracking-tight">
            Bài tập hàng ngày
          </h2>
        </div>
        <p className="ml-[52px] max-w-3xl text-sm text-muted-foreground">
          Nâng cao kỹ năng từ vựng tiếng Anh lập trình của bạn qua các thử thách tương tác thực tế.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-slide-up" style={{ animationDelay: '100ms' }}>
        
        {/* Left/Center Canvas: Exercises (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Quiz Card */}
          <section className="bg-card border border-primary/15 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-primary/25 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors"></div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                ✏️ Câu Hỏi Trắc Nghiệm
              </h2>
              <span className="bg-primary/10 border border-primary/15 px-2.5 py-0.5 rounded text-[11px] text-primary font-semibold">
                JS Basics
              </span>
            </div>
            
            <h3 className="text-base font-bold text-foreground mb-6">
              Biến 'const' trong JavaScript có nghĩa là gì?
            </h3>
            
            <div className="flex flex-col gap-3">
              {quizOptions.map((opt) => {
                let btnStyle = 'border-primary/15 hover:bg-primary/5 text-muted-foreground'
                let checkDot = 'border-primary/30'

                if (selectedQuizOption === opt.id) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-primary/10 border-primary text-primary shadow-[0_0_12px_rgba(60,148,212,0.15)]'
                    checkDot = 'border-primary bg-primary'
                  } else {
                    btnStyle = 'bg-red-500/10 border-red-500/40 text-red-400'
                    checkDot = 'border-red-500 bg-red-500'
                  }
                } else if (quizSubmitted && opt.isCorrect) {
                  // highlight correct answer if wrong answer was chosen
                  btnStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                  checkDot = 'border-emerald-500 bg-emerald-500'
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleQuizSelect(opt.id)}
                    disabled={quizSubmitted}
                    className={`w-full text-left border rounded-xl p-4 transition-all duration-200 flex items-center gap-3 text-sm font-medium ${btnStyle}`}
                  >
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${checkDot}`}>
                      {((selectedQuizOption === opt.id) || (quizSubmitted && opt.isCorrect)) && (
                        <div className="w-1.5 h-1.5 rounded-full bg-background" />
                      )}
                    </div>
                    {opt.text}
                  </button>
                )
              })}
            </div>

            {quizSubmitted && (
              <div className="mt-4 pt-4 border-t border-primary/10 flex justify-between items-center animate-fade-in">
                <span className="text-xs font-semibold">
                  {selectedQuizOption === 1 
                    ? '🎉 Chính xác! Bạn nhận được +10 XP' 
                    : '❌ Rất tiếc, hãy xem lại lý thuyết hằng số nhé!'
                  }
                </span>
                <button 
                  onClick={handleResetQuiz}
                  className="text-xs text-primary font-bold hover:underline"
                >
                  Luyện tập lại
                </button>
              </div>
            )}
          </section>

          {/* Bento Lower Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Flashcard Block */}
            <section id="flashcard-section" className="bg-card border border-primary/15 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-primary/25 flex flex-col min-h-[300px]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  📇 Thẻ Từ Ghi Nhớ
                </h2>
                <div className="bg-primary/10 border border-primary/20 text-primary px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
                  🔍 {learnedCount}/10 từ
                </div>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center py-4 text-center">
                {isFlipped ? (
                  <div className="animate-flip-y">
                    <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">Ý NGHĨA</p>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {flashcards[currentCardIndex].meaning}
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-[220px]">
                      {flashcards[currentCardIndex].description}
                    </p>
                  </div>
                ) : (
                  <div className="animate-flip-y">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <h3 className="text-2xl font-extrabold text-primary tracking-tight">
                        {flashcards[currentCardIndex].word}
                      </h3>
                      <button 
                        onClick={(e) => handleSpeak(e, flashcards[currentCardIndex].word)}
                        className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="h-4.5 w-4.5 text-primary" />
                      </button>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground tracking-wide">
                      {flashcards[currentCardIndex].phonetic}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-auto pt-4 border-t border-primary/10">
                <button
                  onClick={handleFlipCard}
                  className="border border-primary/15 text-muted-foreground hover:text-primary hover:border-primary px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  🔄 Lật thẻ
                </button>
                <button
                  onClick={handleMarkAsLearned}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-3 py-2.5 rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-primary/10"
                >
                  ✓ Đã thuộc
                </button>
              </div>
            </section>

            {/* Code Practice Panel */}
            <section className="bg-card border border-primary/15 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-primary/25 flex flex-col min-h-[300px]">
              <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1">
                💻 Luyện Tập Code
              </h2>
              <p className="text-xs text-muted-foreground mb-4">
                Điền từ đúng để khai báo thuộc tính đối tượng.
              </p>
              
              <div className="bg-[#0a0e18] rounded-xl p-5 border border-primary/10 font-mono text-xs leading-relaxed overflow-x-auto relative mb-4 flex-1 flex flex-col justify-center">
                <div className="absolute top-2 right-2 text-primary/30 text-[10px] font-bold">
                  javascript
                </div>
                <div>
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-blue-300">user</span>{' '}
                  <span className="text-foreground">=</span>{' '}
                  <span className="text-foreground">{'{'}</span>
                </div>
                <div className="pl-4">
                  <input
                    type="text"
                    value={codeAnswer}
                    onChange={(e) => setCodeAnswer(e.target.value)}
                    disabled={codeStatus === 'correct'}
                    className="bg-primary/5 border-b-2 border-primary/25 text-primary font-mono focus:border-primary focus:outline-none w-14 text-center rounded-t-sm py-0.5 text-xs transition-all"
                    placeholder="____"
                  />
                  <span className="text-foreground">:</span>{' '}
                  <span className="text-amber-300">"Hoàng Minh"</span>
                  <span className="text-foreground">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-blue-300">role</span>
                  <span className="text-foreground">:</span>{' '}
                  <span className="text-amber-300">"Developer"</span>
                </div>
                <div>
                  <span className="text-foreground">{'}'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-primary/10">
                <span className="text-[11px] font-medium">
                  {codeStatus === 'correct' && '🎉 Đúng rồi! +15 XP'}
                  {codeStatus === 'incorrect' && '❌ Chưa đúng, thử: name'}
                </span>
                
                {codeStatus === 'correct' ? (
                  <button 
                    onClick={handleResetCode}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Làm lại
                  </button>
                ) : (
                  <button
                    onClick={handleCodeCheck}
                    className="text-xs text-primary font-bold hover:underline flex items-center gap-1.5"
                  >
                    Kiểm tra kết quả →
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Right Sidebar: Widgets (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Progress Widget */}
          <div className="bg-card border border-primary/15 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-6">
              Tiến Độ Của Bạn
            </h3>
            
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
              {/* Progress Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  fill="none" 
                  r="40" 
                  stroke="rgba(60, 148, 212, 0.05)" 
                  strokeWidth="8"
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  fill="none" 
                  r="40" 
                  stroke="#3C94D4" 
                  strokeDasharray="251.2" 
                  strokeDashoffset="62.8" 
                  strokeLinecap="round" 
                  strokeWidth="8"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(60, 148, 212, 0.4))' }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-foreground">75%</span>
                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">Mục tiêu ngày</span>
              </div>
            </div>
          </div>

          {/* Stats Metrics */}
          <div className="bg-card border border-primary/15 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-1">
              Chỉ Số Học Tập
            </h3>
            
            <div className="flex flex-col gap-3">
              {/* Stat 1 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-primary/10">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-muted-foreground">XP Hiện Tại</span>
                </div>
                <span className="text-sm font-bold text-foreground">1,250</span>
              </div>
              
              {/* Stat 2 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-primary/10">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-muted-foreground">Độ Chính Xác</span>
                </div>
                <span className="text-sm font-bold text-foreground">92%</span>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-primary/10">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span className="text-xs text-muted-foreground">Chuỗi Liên Tục</span>
                </div>
                <span className="text-sm font-bold text-foreground">12 ngày</span>
              </div>
            </div>
          </div>

          {/* Weak Words Panel */}
          <div className="bg-card border border-primary/15 rounded-2xl p-6 shadow-sm flex flex-col">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 mb-4 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              Từ Vựng Hay Quên
            </h3>
            
            <ul className="flex flex-col gap-3">
              <li className="flex items-center justify-between group py-1.5 border-b border-primary/5">
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate">Middleware</span>
                  <span className="text-[10px] text-muted-foreground font-mono">/ˈmɪdlwɛər/</span>
                </div>
                <button 
                  onClick={() => handleRelearn('Middleware')}
                  className="opacity-0 group-hover:opacity-100 border border-primary/20 hover:border-primary text-[10px] font-bold text-primary px-2.5 py-1 rounded-lg transition-all duration-200 shrink-0"
                >
                  Luyện lại
                </button>
              </li>
              
              <li className="flex items-center justify-between group py-1.5 border-b border-primary/5">
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate">Concurrency</span>
                  <span className="text-[10px] text-muted-foreground font-mono">/kənˈkʌrənsi/</span>
                </div>
                <button 
                  onClick={() => handleRelearn('Concurrency')}
                  className="opacity-0 group-hover:opacity-100 border border-primary/20 hover:border-primary text-[10px] font-bold text-primary px-2.5 py-1 rounded-lg transition-all duration-200 shrink-0"
                >
                  Luyện lại
                </button>
              </li>

              <li className="flex items-center justify-between group py-1.5">
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate">Asynchronous</span>
                  <span className="text-[10px] text-muted-foreground font-mono">/eɪˈsɪŋkrənəs/</span>
                </div>
                <button 
                  onClick={() => handleRelearn('Asynchronous')}
                  className="opacity-0 group-hover:opacity-100 border border-primary/20 hover:border-primary text-[10px] font-bold text-primary px-2.5 py-1 rounded-lg transition-all duration-200 shrink-0"
                >
                  Luyện lại
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ExercisesPage
