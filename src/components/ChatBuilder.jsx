import { useState } from 'react'

export default function ChatBuilder({ theme, onAddMessage, messages, onDeleteMessage, contactName, setContactName }) {
  const [sender, setSender] = useState('')
  const [text, setText] = useState('')
  const [isSent, setIsSent] = useState(true)
  const [time, setTime] = useState('')

  const isWA = theme === 'wa'
  const accentColor = isWA ? '#00a884' : '#3797f0'
  const fontFamily = isWA ? 'var(--font-wa)' : 'var(--font-ig)'

  function handleSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    onAddMessage({
      sender: sender.trim() || (isSent ? 'Aku' : 'Mereka'),
      text: text.trim(),
      isSent,
      time: time || null,
    })
    setText('')
  }

  const inputClass = `w-full px-3 py-2 rounded-lg text-sm text-white placeholder-white/30 outline-none focus:ring-1 bg-white/5 border border-white/10 transition-all focus:border-white/30`
  const labelClass = `text-xs font-medium text-white/50 mb-1 block`

  return (
    <div
      className="flex flex-col h-full"
      style={{ fontFamily }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/10">
        <h2 className="text-white font-semibold text-base">✍️ Fake Chat Builder</h2>
        <p className="text-white/40 text-xs mt-0.5">Buat percakapan palsu</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">

        {/* Contact Name */}
        <div>
          <label className={labelClass}>Nama Kontak</label>
          <input
            className={inputClass}
            value={contactName}
            onChange={e => setContactName(e.target.value)}
            placeholder="Nama kontak di header..."
          />
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Add Message Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">Tambah Pesan</p>

          {/* Sender */}
          <div>
            <label className={labelClass}>Nama Pengirim</label>
            <input
              className={inputClass}
              value={sender}
              onChange={e => setSender(e.target.value)}
              placeholder={isSent ? 'Aku (default)' : 'Mereka (default)'}
            />
          </div>

          {/* Message text */}
          <div>
            <label className={labelClass}>Isi Pesan</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Ketik pesan di sini..."
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
          </div>

          {/* Sent / Received toggle */}
          <div>
            <label className={labelClass}>Posisi Bubble</label>
            <div className="flex rounded-lg overflow-hidden border border-white/10">
              <button
                type="button"
                onClick={() => setIsSent(true)}
                className={`flex-1 py-2 text-sm font-medium transition-all ${isSent
                    ? 'text-white shadow-inner'
                    : 'text-white/40 hover:text-white/70'
                  }`}
                style={isSent ? { background: accentColor } : { background: 'transparent' }}
              >
                ➤ Sent (kanan)
              </button>
              <button
                type="button"
                onClick={() => setIsSent(false)}
                className={`flex-1 py-2 text-sm font-medium transition-all ${!isSent
                    ? 'text-white shadow-inner bg-white/20'
                    : 'text-white/40 hover:text-white/70'
                  }`}
              >
                ← Received (kiri)
              </button>
            </div>
          </div>

          {/* Time */}
          <div>
            <label className={labelClass}>Waktu (opsional)</label>
            <input
              className={inputClass}
              type="time"
              value={time}
              onChange={e => setTime(e.target.value)}
              style={{ colorScheme: 'dark' }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all active:scale-95 hover:opacity-90"
            style={{ background: isWA ? 'linear-gradient(135deg, #00a884, #008f72)' : 'linear-gradient(135deg, #3797f0, #1a75d6)' }}
          >
            + Tambah Pesan
          </button>
        </form>

        {/* Message List */}
        {messages.length > 0 && (
          <>
            <div className="border-t border-white/10" />
            <div>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
                Pesan ({messages.length})
              </p>
              <div className="flex flex-col gap-1.5">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className="flex items-start gap-2 p-2.5 rounded-lg bg-white/5 border border-white/5 group hover:border-white/15 transition-all"
                  >
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 mt-0.5 ${msg.isSent
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-blue-500/20 text-blue-400'
                      }`}>
                      {msg.isSent ? '➤' : '←'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/70 text-[10px] font-medium truncate">{msg.sender}</p>
                      <p className="text-white/90 text-xs truncate mt-0.5">{msg.text}</p>
                    </div>
                    <button
                      onClick={() => onDeleteMessage(msg.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400/70 hover:text-red-400 text-xs px-1.5 py-0.5 rounded transition-all flex-shrink-0"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
