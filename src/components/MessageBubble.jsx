// MessageBubble — iOS-accurate WA (2026) and IG (2026) chat bubbles
export default function MessageBubble({ theme, message, onDelete }) {
  return theme === 'wa'
    ? <WABubble message={message} onDelete={onDelete} />
    : <IGBubble message={message} onDelete={onDelete} />
}

/* ─────────────────────────────────────────
   WhatsApp iOS bubble (2026 UI Kit)
   Sent:     #d9fdd3 (soft light green)
   Received: #ffffff (white)
   Corners:  20px+ rounded (softer modern look)
   Font:     SF Pro / Roboto, 15px
───────────────────────────────────────── */
function WABubble({ message, onDelete }) {
  const { sender, text, isSent, time, status } = message

  return (
    <div
      className="group"
      style={{
        display: 'flex',
        justifyContent: isSent ? 'flex-end' : 'flex-start',
        marginBottom: '2px',
        padding: '1px 4px',
      }}
    >
      <div style={{ position: 'relative', maxWidth: '72%' }}>
        <div
          className={isSent ? 'animate-sent' : 'animate-received'}
          style={{
            background: isSent ? '#d9fdd3' : '#ffffff',
            borderRadius: isSent ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            padding: '7px 10px 6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
            position: 'relative',
          }}
        >
          {/* Sender name (received only, group style) */}
          {!isSent && (
            <p style={{
              color: '#1DA87F',
              fontSize: '12.5px',
              fontWeight: '600',
              marginBottom: '1px',
              fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            }}>{sender}</p>
          )}

          {/* Message */}
          <p style={{
            color: '#111b21',
            fontSize: '15px',
            lineHeight: '1.35',
            fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            paddingRight: '44px',
          }}>{text}</p>

          {/* Time + tick */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '3px',
            justifyContent: 'flex-end',
            position: 'absolute', bottom: '5px', right: '8px',
          }}>
            <span style={{ fontSize: '11px', color: isSent ? '#667781' : '#8696a0', whiteSpace: 'nowrap' }}>
              {time}
            </span>
            {isSent && <WATick status={status} />}
          </div>
        </div>

        {/* Delete button on hover */}
        <button
          onClick={() => onDelete(message.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            position: 'absolute', top: '-6px',
            right: isSent ? '-6px' : 'auto',
            left: isSent ? 'auto' : '-6px',
            width: '18px', height: '18px',
            background: '#ff3b30', borderRadius: '50%',
            color: 'white', fontSize: '12px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            border: 'none', cursor: 'pointer', zIndex: 10,
            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
          }}
        >×</button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Instagram iOS DM bubble (2026 UI Kit)
   Sent:     Purple gradient (#5B51D8 → #833AB4)
   Received: #262626 (dark grey)
   Corners:  22px rounded (pill-like)
   Font:     SF Pro / Inter, 14.5px
───────────────────────────────────────── */
function IGBubble({ message, onDelete }) {
  const { sender, text, isSent, time, status } = message

  return (
    <div
      className="group"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isSent ? 'flex-end' : 'flex-start',
        marginBottom: '3px',
        padding: '1px 6px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', maxWidth: '75%' }}>
        {/* Avatar — received only */}
        {!isSent && (
          <div style={{
            width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
            padding: '1.5px', marginBottom: '2px',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: '#1c1c1e',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '9px', fontWeight: '700', color: 'white',
            }}>
              {sender.charAt(0).toUpperCase()}
            </div>
          </div>
        )}

        <div style={{ position: 'relative' }}>
          <div
            className={isSent ? 'animate-sent' : 'animate-received'}
            style={{
              background: isSent
                ? 'linear-gradient(135deg, #5B51D8, #833AB4)'
                : '#262626',
              borderRadius: '22px',
              padding: '9px 14px',
            }}
          >
            <p style={{
              color: 'white',
              fontSize: '14.5px',
              lineHeight: '1.4',
              fontFamily: '-apple-system, BlinkMacSystemFont, Inter, sans-serif',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}>{text}</p>
          </div>

          {/* Delete */}
          <button
            onClick={() => onDelete(message.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            style={{
              position: 'absolute', top: '-6px',
              right: isSent ? '-6px' : 'auto',
              left: isSent ? 'auto' : '-6px',
              width: '18px', height: '18px',
              background: '#ff3b30', borderRadius: '50%',
              color: 'white', fontSize: '12px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              border: 'none', cursor: 'pointer', zIndex: 10,
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >×</button>
        </div>
      </div>

      {/* Time + seen — below bubble */}
      <div style={{ marginTop: '2px', padding: '0 4px' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>
          {time}{isSent && status === 'read' ? ' · Seen' : ''}
        </span>
      </div>
    </div>
  )
}

/* WA double tick SVG */
function WATick({ status }) {
  const color = status === 'read' ? '#53bdeb' : 'rgba(100,100,100,0.6)'
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
      {status === 'sent' ? (
        <path d="M1 5.5L5.5 10L15 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <>
          <path d="M1 5.5L5.5 10L15 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 5.5L8.5 10L18 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  )
}
