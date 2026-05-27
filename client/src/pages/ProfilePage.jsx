import { useEffect, useState } from 'react'
import { vocabApi } from '../api/vocabApi'
import { useTheme } from '../components/ThemeProvider'
import { 
  Code, Flame, Star, Target, User, Settings, Volume2 
} from '../components/icons'

function ProfilePage({ user, onPageChange }) {
  const { theme, toggleTheme } = useTheme()
  const [totalWords, setTotalWords] = useState(0)
  const [recentItems, setRecentItems] = useState([])
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Use the google user info or fallback
  const userName = user?.name || 'K-Dict User'
  const userEmail = user?.email || 'user@kdict.dev'
  const userAvatar = user?.avatar_url || user?.picture || 'https://lh3.googleusercontent.com/a/default-user'
  
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true)
      try {
        const data = await vocabApi.getVocab({ page: 1, limit: 3 })
        if (data) {
          setTotalWords(data.pagination?.total || 0)
          setRecentItems(data.items || [])
        }
      } catch (err) {
        console.error('Error fetching vocab for profile stats:', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats()
  }, [])

  const handleEditAvatar = () => {
    alert('Ảnh đại diện được đồng bộ tự động từ tài khoản Google của bạn')
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

  // Calculate some stats based on total words
  const learnedWordsCount = Math.round(totalWords * 0.35)
  const accuracyRate = 92
  const currentStreak = 12

  // Week days height ratios for bar chart (just nice presets)
  const weekdays = [
    { label: 'T2', val: 15, heightClass: 'h-[40%]', active: false },
    { label: 'T3', val: 24, heightClass: 'h-[65%]', active: false },
    { label: 'T4', val: 32, heightClass: 'h-[85%]', active: true },
    { label: 'T5', val: 18, heightClass: 'h-[48%]', active: false },
    { label: 'T6', val: 20, heightClass: 'h-[52%]', active: false },
    { label: 'T7', val: 10, heightClass: 'h-[28%]', active: false },
    { label: 'CN', val: 5, heightClass: 'h-[15%]', active: false }
  ]

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8">
      {/* Page Header */}
      <div className="animate-fade-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <User className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-headline text-2xl font-semibold tracking-tight">
            Hồ sơ cá nhân
          </h2>
        </div>
        <p className="ml-[52px] max-w-3xl text-sm text-muted-foreground">
          Quản lý tài khoản và theo dõi tiến trình học tập tiếng Anh lập trình của bạn.
        </p>
      </div>

      {/* 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-slide-up" style={{ animationDelay: '100ms' }}>
        {/* Left Column: Profile Card & Settings */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Profile Card */}
          <div className="relative overflow-hidden rounded-2xl bg-card border border-primary/15 p-6 shadow-md transition-all duration-300 hover:border-primary/30">
            {/* Ambient Background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="relative mb-4 group">
                <img 
                  alt={userName} 
                  className="w-24 h-24 rounded-full border-2 border-primary/20 object-cover shadow-lg"
                  src={userAvatar}
                />
                <button 
                  onClick={handleEditAvatar}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-background border border-primary/15 rounded-full flex items-center justify-center hover:text-primary transition-all duration-200 hover:scale-105"
                  title="Thay đổi ảnh đại diện"
                >
                  <span className="text-xs font-semibold">✏️</span>
                </button>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-1">{userName}</h3>
              <p className="text-xs text-muted-foreground mb-4">{userEmail}</p>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Star className="h-3 w-3 text-primary" />
                <span className="text-xs font-semibold text-primary">Thành viên K-Dict</span>
              </div>
              
              <div className="w-full pt-4 border-t border-primary/10 flex items-center justify-between mt-2">
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                  🔗 Đã liên kết Google
                </div>
                <span className="text-emerald-500 text-xs font-semibold">✓ Đã xác thực</span>
              </div>
            </div>
          </div>

          {/* Quick Settings */}
          <div className="rounded-2xl bg-card border border-primary/15 p-6 shadow-md transition-all duration-300 hover:border-primary/30">
            <h3 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              Cài Đặt Nhanh
            </h3>
            <div className="flex flex-col gap-4">
              {/* Notification Toggle */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-primary/10">
                    🔔
                  </div>
                  <span className="text-sm font-medium text-foreground">Thông báo học tập</span>
                </div>
                <button 
                  onClick={() => setNotificationsEnabled(prev => !prev)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                    notificationsEnabled ? 'bg-primary' : 'bg-background border border-primary/25'
                  }`}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-background-card transition-transform duration-200 ${
                      notificationsEnabled ? 'translate-x-6 bg-[#0f131d]' : 'translate-x-1 bg-muted-foreground'
                    }`} 
                  />
                </button>
              </div>

              {/* Theme Toggle Switch */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-primary/10">
                    🌙
                  </div>
                  <span className="text-sm font-medium text-foreground">Giao diện tối</span>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                    theme === 'dark' ? 'bg-primary' : 'bg-background border border-primary/25'
                  }`}
                >
                  <span 
                    className={`inline-block h-4 w-4 transform rounded-full bg-background-card transition-transform duration-200 ${
                      theme === 'dark' ? 'translate-x-6 bg-[#0f131d]' : 'translate-x-1 bg-muted-foreground'
                    }`} 
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Statistics & Activities */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Stat Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <div className="rounded-2xl bg-card border border-primary/15 p-5 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-3 text-primary">
                <Code className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Tổng số từ đã lưu</p>
              <p className="text-2xl font-bold text-foreground leading-tight">
                {isLoading ? '...' : totalWords}
              </p>
            </div>
            
            {/* Stat Card 2 */}
            <div className="rounded-2xl bg-card border border-primary/15 p-5 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/25 mb-3 text-emerald-400">
                <Target className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Đã thuộc lòng</p>
              <p className="text-2xl font-bold text-foreground leading-tight">
                {isLoading ? '...' : learnedWordsCount}
              </p>
            </div>

            {/* Stat Card 3 */}
            <div className="rounded-2xl bg-card border border-primary/15 p-5 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/25 mb-3 text-amber-400">
                <Flame className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Chuỗi liên tục</p>
              <p className="text-2xl font-bold text-foreground leading-tight">
                {currentStreak} <span className="text-xs font-normal text-muted-foreground">ngày</span>
              </p>
            </div>

            {/* Stat Card 4 */}
            <div className="rounded-2xl bg-card border border-primary/15 p-5 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col relative overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/25 mb-3 text-purple-400">
                <Star className="h-4.5 w-4.5" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Độ chính xác</p>
              <p className="text-2xl font-bold text-foreground leading-tight">{accuracyRate}%</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weekly Activity Chart */}
            <div className="rounded-2xl bg-card border border-primary/15 p-6 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col h-[280px]">
              <h3 className="text-base font-semibold text-foreground mb-6">Hoạt động tuần này</h3>
              
              <div className="flex-1 flex items-end justify-between gap-2 px-2 mt-auto">
                {weekdays.map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                    <div 
                      className={`w-full rounded-t-md relative transition-all duration-300 ${
                        day.active 
                          ? 'bg-primary shadow-[0_0_12px_rgba(60,148,212,0.4)]' 
                          : 'bg-primary/20 group-hover:bg-primary/45'
                      } ${day.heightClass}`}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#161E2E] border border-primary/20 px-2 py-1 rounded text-[10px] text-foreground font-mono opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        {day.val} từ
                      </div>
                    </div>
                    <span className={`text-xs ${day.active ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Target Progress Circle */}
            <div className="rounded-2xl bg-card border border-primary/15 p-6 shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col items-center justify-center h-[280px]">
              <h3 className="w-full text-left text-base font-semibold text-foreground mb-4">Mục tiêu hàng ngày</h3>
              
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG Radial Ring */}
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle 
                    className="text-primary/5" 
                    cx="50" 
                    cy="50" 
                    fill="none" 
                    r="40" 
                    stroke="rgba(60, 148, 212, 0.1)" 
                    strokeWidth="8"
                  />
                  <circle 
                    className="text-primary transition-all duration-1000 ease-out" 
                    cx="50" 
                    cy="50" 
                    fill="none" 
                    r="40" 
                    stroke="currentColor" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="62.8" // 75% complete
                    strokeLinecap="round" 
                    strokeWidth="8"
                    style={{ filter: 'drop-shadow(0 0 4px rgba(60, 148, 212, 0.4))' }}
                  />
                </svg>
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-foreground leading-none">
                    75<span className="text-base font-normal">%</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">hoàn thành</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Đã đạt 30 / 40 từ vựng mục tiêu hôm nay
              </p>
            </div>
          </div>

          {/* Recent Words List */}
          <div className="rounded-2xl bg-card border border-primary/15 p-6 shadow-sm hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">Từ vựng mới lưu gần đây</h3>
              <button 
                onClick={() => onPageChange('dictionary')}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Xem tất cả
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {isLoading ? (
                <div className="py-6 text-center text-sm text-muted-foreground">Đang tải dữ liệu...</div>
              ) : recentItems.length > 0 ? (
                recentItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="group flex items-center justify-between p-4 rounded-xl bg-background/50 border border-primary/10 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/10 group-hover:bg-primary/20 shrink-0">
                        <Code className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">{item.text}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.meaning_vi}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={(e) => handleSpeak(e, item.text)}
                        className="w-8 h-8 rounded-full hover:bg-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                        title="Nghe phát âm"
                      >
                        <Volume2 className="h-3.5 w-3.5 text-primary" />
                      </button>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 border border-primary/10 text-primary uppercase">
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center border border-dashed border-primary/15 rounded-xl">
                  <p className="text-xs text-muted-foreground">Chưa có từ vựng nào trong sổ từ.</p>
                  <button 
                    onClick={() => onPageChange('analyze')}
                    className="mt-3 text-xs text-primary font-semibold hover:underline"
                  >
                    Phân tích văn bản để lưu từ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
