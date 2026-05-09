class WebSocketService {
  constructor() {
    this.ws = null
    this.reconnectTimeout = null
    this.onMessage = null
  }

  connect(userId, onMessage) {
    this.onMessage = onMessage
    this._connect(userId)
  }

  _connect(userId) {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
    const host = window.location.host
    const url = `${protocol}://${host}/ws?userId=${userId}`

    try {
      this.ws = new WebSocket(url)

      this.ws.onopen = () => {
        console.log('[WS] Connected')
        if (this.reconnectTimeout) {
          clearTimeout(this.reconnectTimeout)
          this.reconnectTimeout = null
        }
      }

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'new_appointment' && this.onMessage) {
            this.onMessage(data.payload)
          }
        } catch (e) {
          console.error('[WS] Parse error', e)
        }
      }

      this.ws.onclose = () => {
        console.log('[WS] Disconnected, reconnecting in 5s...')
        this.reconnectTimeout = setTimeout(() => this._connect(userId), 5000)
      }

      this.ws.onerror = (err) => {
        console.error('[WS] Error', err)
        this.ws.close()
      }
    } catch (e) {
      console.error('[WS] Failed to connect', e)
    }
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
    if (this.ws) {
      this.ws.onclose = null
      this.ws.close()
      this.ws = null
    }
  }

  send(data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }
}

export const wsService = new WebSocketService()