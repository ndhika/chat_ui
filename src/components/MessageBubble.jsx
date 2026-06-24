// MessageBubble — iOS-accurate WA (2026) and IG (2026) chat bubbles
export default function MessageBubble({ theme, message, onDelete, isFirst, isLast }) {
  return theme === 'wa'
    ? <WABubble message={message} onDelete={onDelete} isFirst={isFirst} isLast={isLast} />
    : <IGBubble message={message} onDelete={onDelete} isFirst={isFirst} isLast={isLast} />
}

/* ─────────────────────────────────────────
   WhatsApp iOS bubble (2026 UI Kit)
   Sent:     #d9fdd3 (soft light green)
   Received: #ffffff (white)
   Corners:  20px+ rounded (softer modern look)
   Font:     SF Pro / Roboto, 15px
───────────────────────────────────────── */
function WABubble({ message, onDelete, isFirst, isLast }) {
  const { sender, text, isSent, time, status } = message

  const tailClass = isFirst ? (isSent ? 'bubble-tail-sent' : 'bubble-tail-received') : ''
  const brSent = isFirst ? '20px 4px 20px 20px' : '20px 20px 20px 20px'
  const brReceived = isFirst ? '4px 20px 20px 20px' : '20px 20px 20px 20px'
  const borderRadius = isSent ? brSent : brReceived

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
          className={`${isSent ? 'animate-sent' : 'animate-received'} ${tailClass}`}
          style={{
            background: isSent ? '#005c4b' : '#202c33',
            borderRadius: borderRadius,
            padding: '7px 10px 6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
            position: 'relative',
          }}
        >
          {/* Sender name (received only, group style) */}
          {!isSent && isFirst && (
            <p style={{
              color: '#53bdeb',
              fontSize: '12.5px',
              fontWeight: '600',
              marginBottom: '1px',
              fontFamily: 'var(--font-wa)',
            }}>{sender}</p>
          )}

          {/* Message */}
          <p style={{
            color: '#e9edef',
            fontSize: '15px',
            lineHeight: '1.35',
            fontFamily: 'var(--font-wa)',
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
            <span style={{ fontSize: '11px', color: '#8696a0', whiteSpace: 'nowrap' }}>
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
function IGBubble({ message, onDelete, isFirst, isLast }) {
  const { id, sender, text, isSent, time, status } = message

  let borderRadius = '22px'
  if (isSent) {
    if (isFirst && !isLast) borderRadius = '22px 22px 4px 22px'
    else if (!isFirst && !isLast) borderRadius = '22px 4px 4px 22px'
    else if (!isFirst && isLast) borderRadius = '22px 4px 22px 22px'
  } else {
    if (isFirst && !isLast) borderRadius = '22px 22px 22px 4px'
    else if (!isFirst && !isLast) borderRadius = '4px 22px 22px 4px'
    else if (!isFirst && isLast) borderRadius = '4px 22px 22px 22px'
  }

  const bgStyle = isSent ? {
    backgroundImage: 'linear-gradient(to top right, #3355ff, #8c2cfb, #d033a0)',
    backgroundAttachment: 'fixed',
  } : {
    background: '#262626'
  }

  return (
    <>
      {time && isFirst && (
        <div style={{ textAlign: 'center', margin: '16px 0 12px' }}>
          <span style={{ fontSize: '11.5px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>{time}</span>
        </div>
      )}
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
          <div style={{ width: '26px', flexShrink: 0, display: 'flex', alignItems: 'flex-end', marginBottom: '2px' }}>
            {isLast && (
              <div style={{
                width: '26px', height: '26px', borderRadius: '50%',
                background: '#2a2a2a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: '700', color: 'white',
              }}>
                {sender.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        )}

        <div style={{ position: 'relative' }}>
          <div
            className={isSent ? 'animate-sent' : 'animate-received'}
            style={{
              ...bgStyle,
              borderRadius: borderRadius,
              padding: '9px 14px',
            }}
          >
            <p style={{
              color: 'white',
              fontSize: '14.5px',
              lineHeight: '1.4',
              fontFamily: 'var(--font-ig)',
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

    </div>
    </>
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
