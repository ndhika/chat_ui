import { useEffect, useRef } from 'react'
import ChatHeader from './ChatHeader'
import MessageBubble from './MessageBubble'

// WhatsApp iOS bottom input bar (2026 Liquid Glass Floating Style)
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
        {/* Plus Button */}
        <button className="w-9 h-9 flex items-center justify-center flex-shrink-0 mb-0.5 ml-1">
          <svg className="w-[28px] h-[28px] text-[#007aff]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        {/* Text Area (simulated) */}
        <div className="flex-1 flex items-center min-h-[36px] bg-[rgba(255,255,255,0.08)] rounded-[18px] px-3 py-1.5 mb-1 border border-[rgba(255,255,255,0.03)]">
          <span className="text-[#8e8e93] text-[15px] flex-1 select-none font-[-apple-system]">Message</span>
          <svg className="w-[22px] h-[22px] text-[#8e8e93] opacity-80" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm3.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75z" />
          </svg>
        </div>

        {/* Camera / Mic Cluster */}
        <div className="flex items-center gap-1 mb-1 mr-1">
          <button className="w-8 h-8 flex items-center justify-center">
            <svg className="w-[24px] h-[24px] text-[#007aff]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
          </button>
          <button className="w-9 h-9 bg-[#25d366] rounded-full flex items-center justify-center shadow-sm">
            <svg className="w-[20px] h-[20px] text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// Instagram iOS DM bottom bar (2025 Modern Style)
function IGInputBar() {
  return (
    <div className="absolute bottom-6 left-0 right-0 px-3 z-10">
      <div className="flex items-center gap-2 px-1 py-1 bg-[#1c1c1e] rounded-full border border-white/10 shadow-lg">
        {/* Camera */}
        <button className="w-[38px] h-[38px] bg-[#0095f6] rounded-full flex items-center justify-center flex-shrink-0 ml-0.5">
          <svg className="w-[20px] h-[20px] text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 15.2A3.2 3.2 0 0 1 8.8 12 3.2 3.2 0 0 1 12 8.8 3.2 3.2 0 0 1 15.2 12 3.2 3.2 0 0 1 12 15.2M12 7a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5A5 5 0 0 0 12 7M2 4h3.5L7 2h10l1.5 2H22a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          </svg>
        </button>

        {/* Text input */}
        <div className="flex-1 flex items-center px-3 py-2">
          <span className="text-white/40 text-[14px] flex-1 select-none font-[-apple-system]">Message...</span>
        </div>

        {/* Mic */}
        <button className="w-8 h-8 flex items-center justify-center">
          <svg className="w-[22px] h-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        </button>

        {/* Sticker + */}
        <button className="w-8 h-8 flex items-center justify-center mr-1">
          <svg className="w-[22px] h-[22px] text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function ChatWindow({ theme, messages, onDeleteMessage, contactName, setContactName }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const isWA = theme === 'wa'

  return (
    /* ── Outer wrapper: the "desk" area that contains the phone ── */
    <div className="relative flex items-center justify-center" style={{ height: '780px' }}>

      {/* Ambient glow */}
      <div
        className="absolute blur-[80px] opacity-25 rounded-full pointer-events-none"
        style={{
          width: '340px',
          height: '340px',
          background: isWA
            ? 'radial-gradient(circle, #00a884 0%, transparent 70%)'
            : 'radial-gradient(circle, #3797f0 30%, #833ab4 70%, transparent 100%)',
        }}
      />

      {/* ── iPhone 15 Pro frame ── */}
      <div
        style={{
          width: '393px',
          height: '754px',
          borderRadius: '54px',
          background: '#1a1a1a',
          boxShadow: `
            0 0 0 1px #3a3a3a,
            0 0 0 3px #1a1a1a,
            0 0 0 4px #4a4a4a,
            0 35px 80px rgba(0,0,0,0.9),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Side buttons (left) */}
        <div style={{
          position: 'absolute', left: '-3px', top: '110px',
          width: '3px', height: '32px', background: '#2a2a2a', borderRadius: '2px 0 0 2px'
        }} />
        <div style={{
          position: 'absolute', left: '-3px', top: '155px',
          width: '3px', height: '64px', background: '#2a2a2a', borderRadius: '2px 0 0 2px'
        }} />
        <div style={{
          position: 'absolute', left: '-3px', top: '230px',
          width: '3px', height: '64px', background: '#2a2a2a', borderRadius: '2px 0 0 2px'
        }} />
        {/* Power button (right) */}
        <div style={{
          position: 'absolute', right: '-3px', top: '165px',
          width: '3px', height: '90px', background: '#2a2a2a', borderRadius: '0 2px 2px 0'
        }} />

        {/* Screen area */}
        <div
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
          {/* ── iOS Status Bar ── */}
          <div
            style={{
              height: '54px',
              background: isWA ? '#075e54' : '#000',
              display: 'flex',
              alignItems: 'flex-end',
              paddingBottom: '8px',
              paddingLeft: '20px',
              paddingRight: '20px',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            {/* Dynamic Island */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '34px',
              background: '#000',
              borderRadius: '20px',
              zIndex: 10,
            }} />

            {/* Time - left */}
            <span style={{
              color: 'white',
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Display, sans-serif',
              letterSpacing: '-0.3px',
            }}>9:41</span>

            {/* Right icons */}
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {/* Signal */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="white">
                <rect x="0" y="4" width="3" height="8" rx="1" />
                <rect x="4.5" y="3" width="3" height="9" rx="1" />
                <rect x="9" y="1.5" width="3" height="10.5" rx="1" />
                <rect x="13.5" y="0" width="3" height="12" rx="1" />
              </svg>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="white">
                <path d="M8 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                <path d="M3.5 6.5a6.5 6.5 0 019 0" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" />
                <path d="M1 4a10 10 0 0114 0" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" />
              </svg>
              {/* Battery */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <div style={{
                  width: '25px', height: '12px', border: '1.5px solid white', borderRadius: '3px',
                  padding: '2px', display: 'flex', alignItems: 'center',
                }}>
                  <div style={{ width: '80%', height: '100%', background: 'white', borderRadius: '1px' }} />
                </div>
                <div style={{ width: '2px', height: '5px', background: 'white', borderRadius: '0 1px 1px 0', marginLeft: '-1px' }} />
              </div>
            </div>
          </div>

          {/* ── Chat Header ── */}
          <div style={{ background: isWA ? '#075e54' : '#000', flexShrink: 0 }}>
            <ChatHeader theme={theme} contactName={contactName} setContactName={setContactName} />
          </div>

          {/* ── Messages ── */}
          <div
            className={`flex-1 overflow-y-auto ${isWA ? 'wa-wallpaper' : 'bg-black'}`}
            style={{ padding: '8px 8px 80px' }} // Added bottom padding to avoid floating bar
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
}
