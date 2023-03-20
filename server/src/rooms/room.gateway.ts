import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'rooms',
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('msg')
  async getMessage(@MessageBody() data_: string): Promise<void> {
    console.log('data => ', data_);
  }

  async handleConnection(client_: Socket, ...args_: any[]) {
    console.log(`[rooms] handleConnection => `, client_.id);
    client_.emit('[rooms] fromServer', 'OK');
  }

  async handleDisconnect(client_: Socket) {
    console.log(`[rooms] handleDisconnect => `, client_.id);
  }
}
