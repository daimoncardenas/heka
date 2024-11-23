import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
  transports: ['websocket'],
  cors: {
    origin: '*', // Configura los orígenes permitidos según tus necesidades
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() 
  server: Server;


  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
    console.log(`Mensaje recibido: ${payload}`);
  }

  
/*   sendProductCreatedNotification(product: any) {
    this.server.emit('productCreated', product);
  } */
}
