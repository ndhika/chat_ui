import { useState } from 'react'
import ChatWindow from './components/ChatWindow'
import ChatBuilder from './components/ChatBuilder'
import ThemeToggle from './components/ThemeToggle'
import { useMessages } from './hooks/useMessages'
import { sampleMessagesWA, sampleMessagesIG } from './data/sampleMessages'

export default function App() {
  const [theme, setTheme] = useState('wa')
  const [contactNameWA, setContactNameWA] = useState('Budi')
  const [contactNameIG, setContactNameIG] = useState('rina_xyz')

  const wa = useMessages(sampleMessagesWA)
  const ig = useMessages(sampleMessagesIG)

  const active = theme === 'wa' ? wa : ig
  const contactName = theme === 'wa' ? contactNameWA : contactNameIG
  const setContactName = theme === 'wa' ? setContactNameWA : setContactNameIG

  function handleThemeChange(newTheme) {
    setTheme(newTheme)
  }

  return (
    <div
      className="flex flex-col h-screen w-screen overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0d0d0f 0%, #111318 50%, #0d0f14 100%)' }}
    >
      {/* ===== TOP BAR ===== */}
      <div className="flex items-center justify-between px-8 py-4 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-lg"
            style={{
              background: theme === 'wa'
                ? 'linear-gradient(135deg, #00a884, #008f72)'
                : 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)'
            }}
          >
            {theme === 'wa' ? '💬' : '📸'}
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm leading-none">Fake Chat Maker</h1>
            <p className="text-white/30 text-xs mt-0.5">Bikin percakapan palsu</p>
          </div>
        </div>

        <ThemeToggle theme={theme} onChange={handleThemeChange} />

        <div className="flex items-center gap-3">
          <button
            onClick={() => active.resetMessages([])}
            className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-red-400 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 transition-all"
          >
            🗑 Clear All
          </button>
          <button
            onClick={() =>
              active.resetMessages(theme === 'wa' ? sampleMessagesWA : sampleMessagesIG)
            }
            className="px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/10 border border-white/10 transition-all"
          >
            ↩ Reset Sample
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left: Builder panel */}
        <div className="w-80 flex-shrink-0 border-r border-white/5 overflow-y-auto">
          <ChatBuilder
            theme={theme}
            messages={active.messages}
            onAddMessage={active.addMessage}
            onDeleteMessage={active.deleteMessage}
            contactName={contactName}
            setContactName={setContactName}
          />
        </div>

        {/* Center: Phone preview */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className="relative">
            {/* Glow effect behind phone */}
            <div
              className="absolute inset-0 blur-3xl opacity-20 rounded-full scale-75 -z-10"
              style={{
                background: theme === 'wa'
                  ? 'radial-gradient(circle, #00a884 0%, transparent 70%)'
                  : 'radial-gradient(circle, #3797f0 0%, #833ab4 50%, transparent 80%)'
              }}
            />
            <ChatWindow
              theme={theme}
              messages={active.messages}
              onDeleteMessage={active.deleteMessage}
              contactName={contactName}
              setContactName={setContactName}
            />
          </div>
        </div>

        {/* Right: Info / tips panel */}
        <div className="w-64 flex-shrink-0 border-l border-white/5 p-5 flex flex-col gap-4">
          <div>
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">💡 Tips</p>
            <div className="flex flex-col gap-2.5">
              {[
                { icon: '✏️', text: 'Hover pesan untuk hapus' },
                { icon: '👤', text: 'Ganti nama kontak di panel kiri' },
                { icon: '⌨️', text: 'Enter untuk kirim pesan cepat' },
                { icon: '↩', text: 'Reset Sample untuk muat ulang contoh' },
                { icon: '🎨', text: 'Toggle WA/IG untuk ganti tema' },
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-sm flex-shrink-0">{tip.icon}</span>
                  <p className="text-white/40 text-xs leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/5 pt-4">
            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">🎨 Theme</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#00a884]" />
                <span className="text-white/40 text-xs">WA — Font Roboto</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3797f0]" />
                <span className="text-white/40 text-xs">IG — Font Inter</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
