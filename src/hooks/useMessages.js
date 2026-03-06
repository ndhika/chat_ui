import { useState, useCallback } from 'react'

let nextId = 100

export function useMessages(initialMessages) {
  const [messages, setMessages] = useState(initialMessages)

  const addMessage = useCallback(({ sender, text, isSent, time }) => {
    const now = time || new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    setMessages(prev => [
      ...prev,
      { id: nextId++, sender, text, isSent, time: now, status: 'sent' }
    ])
  }, [])

  const deleteMessage = useCallback((id) => {
    setMessages(prev => prev.filter(m => m.id !== id))
  }, [])

  const resetMessages = useCallback((msgs) => {
    setMessages(msgs)
  }, [])

  return { messages, addMessage, deleteMessage, resetMessages }
}
