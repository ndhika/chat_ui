// ChatHeader — iOS-accurate WA (2026) and IG (2026) headers
export default function ChatHeader({ theme, contactName }) {
  return theme === 'wa' ? <WAHeader contactName={contactName} /> : <IGHeader contactName={contactName} />
}

/* ─────────────────────────────────────────
   WhatsApp iOS header (2026 UI Kit)
   Background: #1DA87F (modern teal green)
   Layout: ← avatar  name/status  [video] [call]
───────────────────────────────────────── */
function WAHeader({ contactName }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px 10px',
        background: '#1DA87F',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Roboto, sans-serif',
      }}
    >
      {/* Back chevron — iOS SF Symbols style (thinner, with badge count) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginRight: '2px' }}>
        <svg width="11" height="19" viewBox="0 0 11 19" fill="none">
          <path d="M9.5 1.5L1.5 9.5l8 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ color: 'white', fontSize: '17px', fontWeight: '400', lineHeight: 1, marginLeft: '2px' }}>1</span>
      </div>

      {/* Avatar */}
      <div style={{
        width: '38px', height: '38px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #85d6b5, #5aad8f)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '16px', fontWeight: '600', color: 'white', flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
      }}>
        {contactName.charAt(0).toUpperCase()}
      </div>

      {/* Name + status */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: 'white', fontSize: '17px', fontWeight: '600', lineHeight: 1.15, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {contactName}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', margin: 0, marginTop: '1px' }}>online</p>
      </div>

      {/* Right icons: video, call — WA iOS accurate */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexShrink: 0 }}>
        {/* Video Call — WA iOS style: rounded rect camera with filled triangle */}
        <svg width="24" height="17" viewBox="0 0 24 17" fill="none">
          <rect x="0.5" y="0.5" width="15" height="16" rx="3" stroke="white" strokeWidth="1.5" fill="none" />
          <path d="M18 5.5l5-3v12l-5-3V5.5z" fill="white" />
        </svg>
        {/* Phone Call — iOS SF Symbols phone.fill */}
        <svg width="19" height="19" viewBox="0 0 24 24" fill="white">
          <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 4 3 4.24 3 5c0 9.39 7.61 17 17 17 .71 0 1-.6 1-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
        </svg>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Instagram iOS DM header (2026 UI Kit)
   Background: #000
   Layout: ← avatar name "Active now"  [📞] [📹]
───────────────────────────────────────── */
function IGHeader({ contactName }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '8px 16px 12px',
        background: '#000',
        borderBottom: '0.5px solid rgba(255,255,255,0.1)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", Inter, sans-serif',
      }}
    >
      {/* Back chevron — IG iOS style */}
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" style={{ flexShrink: 0 }}>
        <path d="M9 1L1 9l8 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Avatar + gradient ring (IG story ring) */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
          padding: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: '#000',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', fontWeight: '700', color: 'white',
          }}>
            {contactName.charAt(0).toUpperCase()}
          </div>
        </div>
        {/* Online dot */}
        <div style={{
          position: 'absolute', bottom: '0', right: '0',
          width: '10px', height: '10px', background: '#3ecf5b',
          borderRadius: '50%', border: '2px solid #000',
        }} />
      </div>

      {/* Name + active */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: 'white', fontSize: '15px', fontWeight: '600', margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {contactName}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '12px', margin: 0, marginTop: '1px' }}>Active now</p>
      </div>

      {/* Right icons — IG DM accurate: phone (outline) + video (outline) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
        {/* Phone — IG outline style */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* Video — IG outline style (rect + triangle) */}
        <svg width="24" height="17" viewBox="0 0 24 17" fill="none">
          <rect x="0.5" y="0.5" width="15" height="16" rx="3" stroke="white" strokeWidth="1.5" />
          <path d="M18 5.5l5-3v12l-5-3V5.5z" stroke="white" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
