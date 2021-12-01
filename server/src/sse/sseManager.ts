/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response } from 'express'

const clients: Map<string, { id: string; response: Response }> = new Map()

export const deleteClient = (clientId: string) => {
  clients.delete(clientId)
}
export const initializeSSE = (request: Request, response: Response, next) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  }
  const { id } = request.params
  response.writeHead(200, headers)

  const data = `data: connected\n\n`

  response.write(data)
  clients.set(id, { id, response })
  console.log(clients)

  request.on('close', () => {
    console.log(`${id} Connection closed`)
    deleteClient(id)
  })
}

export const sendSSE = (id: string, message: any): void => {
  const client = clients.get(id)
  console.log(client)
  const { type } = message
  if (client) {
    client.response.write(`type: ${type}\n`)
    client.response.write(`data: ${JSON.stringify(message)}\n\n`)
  }
}

export const sendSSEToAll = (message: any) => {
  const { type } = message
  clients.forEach((client) => {
    client.response.write(`type: ${type}\n`)
    client.response.write(`data: ${JSON.stringify(message)}\n\n`)
  })
}
