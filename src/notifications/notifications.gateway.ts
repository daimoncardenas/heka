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

@WebSocketGateway({
  cors: {
    origin: '*', // Configura los orígenes permitidos según tus necesidades
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() 
  server: Server;


  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
    console.log(`Message received: ${payload}`);
  }

  
  sendProductCreatedNotification(product: any) {
    console.log('Emitting productCreated event');
    this.server.emit('productCreated', product);
  }
}
