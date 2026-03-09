import { useEffect, useRef, forwardRef } from 'react'
import ChatHeader from './ChatHeader'
import MessageBubble from './MessageBubble'

// ── iPhone Status Bar (SF Symbols accurate — no Dynamic Island) ──
function iOSStatusBar() {
  return (
    <div
      style={{
        height: '44px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: '8px',
        paddingLeft: '26px',
        paddingRight: '20px',
        flexShrink: 0,
      }}
    >
      {/* Time - left side */}
      <span style={{
        color: 'white',
        fontSize: '15px',
        fontWeight: '600',
        fontFamily: '-apple-system, "SF Pro Display", BlinkMacSystemFont, sans-serif',
        letterSpacing: '0.2px',
        lineHeight: 1,
      }}>9:41</span>

      {/* Right side icons: Signal + WiFi + Battery */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Cellular Signal — iOS SF Symbols style (4 bars, increasing height) */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
          <rect x="0" y="7.5" width="3" height="3.5" rx="1" fill="white" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" fill="white" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="white" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" fill="white" />
        </svg>

        {/* WiFi — iOS SF Symbols style (3-tier fan) */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 9.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" fill="white" />
          <path d="M4.8 8.2a3.8 3.8 0 015.4 0" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M2.4 5.8a7 7 0 0110.2 0" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M0.2 3.4a10 10 0 0114.6 0" stroke="white" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>

        {/* Battery — iOS style outline with fill, no percentage */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          {/* Battery body */}
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke="white" strokeWidth="1.2" fill="none" opacity="0.4" />
          {/* Battery fill */}
          <rect x="2" y="2" width="18" height="8" rx="1.5" fill="white" />
          {/* Battery cap/nub */}
          <path d="M24 4v4a2 2 0 000-4z" fill="white" opacity="0.5" />
        </svg>
      </div>
    </div>
  )
}

function WAInputBar() {
  return (
    <div className="absolute bottom-6 left-0 right-0 px-3 z-10 flex flex-col gap-2">
      <div
        className="flex flex-row items-end gap-2 px-1 py-1 rounded-[26px] shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-2xl"
        style={{
          background: 'rgba(30, 30, 32, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Plus — iOS circle-plus style */}
        <button className="w-9 h-9 flex items-center justify-center flex-shrink-0 mb-0.5 ml-1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#007aff" strokeWidth="1.5" />
            <path d="M12 7v10M7 12h10" stroke="#007aff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Text Area (simulated) */}
        <div className="flex-1 flex items-center min-h-[36px] bg-[rgba(255,255,255,0.08)] rounded-[18px] px-3 py-1.5 mb-1 border border-[rgba(255,255,255,0.03)]">
          <span className="text-[#8e8e93] text-[15px] flex-1 select-none font-[-apple-system]">Message</span>
          {/* Emoji — WA iOS smiley face (thinner, cleaner) */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9.5" stroke="#8e8e93" strokeWidth="1.3" />
            <circle cx="9" cy="10.5" r="1.1" fill="#8e8e93" />
            <circle cx="15" cy="10.5" r="1.1" fill="#8e8e93" />
            <path d="M8.5 14.5c.8 1.6 2 2.5 3.5 2.5s2.7-.9 3.5-2.5" stroke="#8e8e93" strokeWidth="1.2" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Camera + Mic Cluster */}
        <div className="flex items-center gap-1 mb-1 mr-1">
          {/* Camera — WA iOS compact filled */}
          <button className="w-8 h-8 flex items-center justify-center">
            <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
              <path d="M3 4h2.5L7 2h8l1.5 2H19a2 2 0 012 2v10a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="#007aff" strokeWidth="1.4" fill="none" />
              <circle cx="11" cy="10" r="3.5" stroke="#007aff" strokeWidth="1.4" fill="none" />
            </svg>
          </button>
          {/* Mic — WA green circle */}
          <button className="w-9 h-9 bg-[#25d366] rounded-full flex items-center justify-center shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Instagram iOS DM bottom bar (2026 Modern Style) ──
function IGInputBar() {
  return (
    <div className="absolute bottom-6 left-0 right-0 px-3 z-10">
      <div className="flex items-center gap-2 px-1 py-1 bg-[#1c1c1e] rounded-full border border-white/10 shadow-lg">
        {/* Camera — IG gradient circle with camera lens */}
        <button className="w-[38px] h-[38px] rounded-full flex items-center justify-center flex-shrink-0 ml-0.5"
          style={{ background: 'linear-gradient(135deg, #5B51D8, #833AB4)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M3 5h2.586l1.707-1.707A1 1 0 018 3h8a1 1 0 01.707.293L18.414 5H21a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V7a2 2 0 012-2z" stroke="white" strokeWidth="1.5" fill="none" />
            <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="1.5" fill="none" />
          </svg>
        </button>

        {/* Text input */}
        <div className="flex-1 flex items-center px-3 py-2">
          <span className="text-white/40 text-[14px] flex-1 select-none font-[-apple-system]">Message...</span>
        </div>

        {/* Mic — IG outline style */}
        <button className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 11a7 7 0 0014 0" strokeLinecap="round" />
            <path d="M12 19v3m-3 0h6" strokeLinecap="round" />
          </svg>
        </button>

        {/* Heart — IG like button */}
        <button className="w-8 h-8 flex items-center justify-center">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Plus circle — IG sticker/attachment */}
        <button className="w-8 h-8 flex items-center justify-center mr-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <circle cx="12" cy="12" r="9.5" />
            <path d="M12 8v8M8 12h8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const ChatWindow = forwardRef(function ChatWindow({ theme, messages, onDeleteMessage, contactName, setContactName }, ref) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const isWA = theme === 'wa'

  return (
    /* ── Outer wrapper: the "desk" area that contains the phone ── */
    <div className="phone-container">

      {/* Ambient glow */}
      <div
        className="phone-glow absolute blur-[80px] opacity-25 rounded-full pointer-events-none"
        style={{
          width: '340px',
          height: '340px',
          background: isWA
            ? 'radial-gradient(circle, #1DA87F 0%, transparent 70%)'
            : 'radial-gradient(circle, #5B51D8 30%, #833ab4 70%, transparent 100%)',
        }}
      />

      {/* ── iPhone 15 Pro frame ── */}
      <div className="phone-frame">
        {/* Side buttons (left) */}
        <div className="phone-hw-btn" style={{
          position: 'absolute', left: '-3px', top: '110px',
          width: '3px', height: '32px', background: '#2a2a2a', borderRadius: '2px 0 0 2px'
        }} />
        <div className="phone-hw-btn" style={{
          position: 'absolute', left: '-3px', top: '155px',
          width: '3px', height: '64px', background: '#2a2a2a', borderRadius: '2px 0 0 2px'
        }} />
        <div className="phone-hw-btn" style={{
          position: 'absolute', left: '-3px', top: '230px',
          width: '3px', height: '64px', background: '#2a2a2a', borderRadius: '2px 0 0 2px'
        }} />
        {/* Power button (right) */}
        <div className="phone-hw-btn" style={{
          position: 'absolute', right: '-3px', top: '165px',
          width: '3px', height: '90px', background: '#2a2a2a', borderRadius: '0 2px 2px 0'
        }} />

        {/* Screen area */}
        <div
          ref={ref}
          className="phone-screen"
          style={{
            position: 'absolute',
            inset: '6px',
            borderRadius: '48px',
            overflow: 'hidden',
            background: isWA ? '#efeae2' : '#000',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* ── iOS Status Bar (No Dynamic Island) ── */}
          <div style={{
            background: isWA ? '#1DA87F' : '#000',
            flexShrink: 0,
            zIndex: 10,
          }}>
            {iOSStatusBar()}
          </div>

          {/* ── Chat Header ── */}
          <div style={{ background: isWA ? '#1DA87F' : '#000', flexShrink: 0 }}>
            <ChatHeader theme={theme} contactName={contactName} setContactName={setContactName} />
          </div>

          {/* ── Messages ── */}
          <div
            className={`flex-1 overflow-y-auto ${isWA ? 'wa-wallpaper' : 'bg-black'}`}
            style={{ padding: '8px 8px 80px' }}
          >
            {messages.length === 0 ? (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p style={{ color: isWA ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.25)', fontSize: '13px' }}>
                  Belum ada pesan
                </p>
              </div>
            ) : (
              messages.map(msg => (
                <MessageBubble key={msg.id} theme={theme} message={msg} onDelete={onDeleteMessage} />
              ))
            )}
            <div ref={bottomRef} />
          </div>

          {/* ── Input Bar ── */}
          {isWA ? <WAInputBar /> : <IGInputBar />}

          {/* iOS Home Indicator */}
          <div style={{
            position: 'absolute',
            bottom: '0', left: '0', right: '0',
            height: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 20,
            background: isWA ? 'linear-gradient(to top, rgba(239,234,226,0.9), transparent)' : 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
          }}>
            <div style={{
              width: '130px', height: '5px',
              background: isWA ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.4)',
              borderRadius: '3px',
              marginTop: '10px'
            }} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default ChatWindow
