// ChatHeader — iOS-accurate WA and IG headers
export default function ChatHeader({ theme, contactName }) {
  return theme === 'wa' ? <WAHeader contactName={contactName} /> : <IGHeader contactName={contactName} />
}

/* ─────────────────────────────────────────
   WhatsApp iOS header
   Background: #075e54
   Layout: ← avatar  name/status  [video] [call] [⋮]
───────────────────────────────────────── */
function WAHeader({ contactName }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 12px 10px',
        background: '#075e54',
        fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Text, Roboto, sans-serif',
      }}
    >
      {/* Back chevron & unread count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', marginRight: '2px' }}>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="white">
          <path d="M11 1L2 10l9 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <span style={{ color: 'white', fontSize: '17px', fontWeight: '400', lineHeight: 1 }}>1</span>
      </div>

      {/* Avatar */}
      <div style={{
        width: '36px', height: '36px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #6ea085, #4a7c6a)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '15px', fontWeight: '600', color: 'white', flexShrink: 0,
      }}>
        {contactName.charAt(0).toUpperCase()}
      </div>

      {/* Name + status */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: 'white', fontSize: '16px', fontWeight: '600', lineHeight: 1.1, margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {contactName}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '12px', margin: 0, marginTop: '1px' }}>online</p>
      </div>

      {/* Right icons: video, call, ... */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0 }}>
        {/* Video */}
        <svg width="22" height="16" viewBox="0 0 22 16" fill="white">
          <path d="M14 2H2C1.45 2 1 2.45 1 3v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V9.5l4 4V2.5l-4 4V3c0-.55-.45-1-1-1z" />
        </svg>
        {/* Phone */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
        {/* Dots menu */}
        <svg width="4" height="18" viewBox="0 0 4 18" fill="white">
          <circle cx="2" cy="2" r="2" />
          <circle cx="2" cy="9" r="2" />
          <circle cx="2" cy="16" r="2" />
        </svg>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Instagram iOS DM header
   Background: #000
   Layout: ← avatar name "Active now"  [📹] [ℹ]
───────────────────────────────────────── */
function IGHeader({ contactName }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 16px 12px',
        background: '#000',
        borderBottom: '0.5px solid rgba(255,255,255,0.12)',
        fontFamily: '-apple-system, BlinkMacSystemFont, SF Pro Text, Inter, sans-serif',
      }}
    >
      {/* Back chevron */}
      <svg width="10" height="18" viewBox="0 0 10 18" fill="none" style={{ flexShrink: 0 }}>
        <path d="M9 1L1 9l8 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Avatar + gradient ring */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
          padding: '2px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            background: '#1c1c1e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '13px', fontWeight: '700', color: 'white',
          }}>
            {contactName.charAt(0).toUpperCase()}
          </div>
        </div>
        {/* Online dot */}
        <div style={{
          position: 'absolute', bottom: '0', right: '0',
          width: '10px', height: '10px', background: '#3ecf5b',
          borderRadius: '50%', border: '1.5px solid #000',
        }} />
      </div>

      {/* Name + active */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: 'white', fontSize: '14px', fontWeight: '600', margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {contactName}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0 }}>Active now</p>
      </div>

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
        {/* Video */}
        <svg width="24" height="18" viewBox="0 0 24 18" fill="white">
          <path d="M14 1H2C1.45 1 1 1.45 1 2v14c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V10l6 5V3l-6 5V2c0-.55-.45-1-1-1z" />
        </svg>
        {/* Info circle */}
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="10" stroke="white" strokeWidth="1.5" />
          <path d="M11 10v5M11 7.5v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
