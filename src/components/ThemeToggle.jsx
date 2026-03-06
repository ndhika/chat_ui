// ThemeToggle — Switch between WA and IG
export default function ThemeToggle({ theme, onChange }) {
  return (
    <div className="flex items-center gap-2 bg-white/10 rounded-full p-1">
      <button
        onClick={() => onChange('wa')}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${theme === 'wa'
            ? 'bg-[#00a884] text-white shadow-lg shadow-[#00a884]/30'
            : 'text-white/60 hover:text-white'
          }`}
      >
        <span>💬</span> WhatsApp
      </button>
      <button
        onClick={() => onChange('ig')}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${theme === 'ig'
            ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-lg'
            : 'text-white/60 hover:text-white'
          }`}
      >
        <span>📸</span> Instagram
      </button>
    </div>
  )
}
