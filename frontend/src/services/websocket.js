import { Client } from '@stomp/stompjs'

class WebSocketService {

  constructor() {
    this.client = null
  }

  connect(userId, onMessage) {

    this.client = new Client({

      brokerURL: 'ws://localhost:8080/ws',

      reconnectDelay: 5000,

      debug: (str) => {
        console.log('[STOMP]', str)
      },

      onConnect: () => {

        console.log('[WS] CONNECTED')

    this.client.subscribe(
      `/topic/barber/${userId}`,
      (message) => {

        console.log('[WS] MESSAGE')
        console.log(message.body)

        const data = JSON.parse(message.body)

        console.log('[WS] PARSED')
        console.log(data)

        onMessage(data)
      }
    )
      },

      onStompError: (frame) => {

        console.error('[STOMP ERROR]')
        console.error(frame)
      },

      onWebSocketError: (error) => {

        console.error('[WS ERROR]')
        console.error(error)
      }
    })

    this.client.activate()
  }

  disconnect() {

    if (this.client) {
      this.client.deactivate()
    }
  }
}

export const wsService = new WebSocketService()