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
  namespace: '/rooms',
  cors: { origin: '*' },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client_: any, ...args_: any[]) {
    console.log('connect to RoomsGateway');
    // console.log(client_);
  }

  handleDisconnect(client_: any) {
    console.log('disconnect from RoomsGateway');
    // console.log(client_);
  }

  // @SubscribeMessage('room.join')
  // joinChatRoom(client: Socket, roomId: string) {
  //   client.join(roomId);
  // }

  // @SubscribeMessage('room.leave')
  // leaveChatRoom(client: Socket, roomId: string) {
  //   client.leave(roomId);
  // }

  @SubscribeMessage('msg')
  async getMessage(@MessageBody() data_: string): Promise<void> {
    console.log('[rooms] data => ', data_);
  }

  @SubscribeMessage('rooms_test')
  async getRoomsMessage(@MessageBody() data_: string): Promise<void> {
    console.log('[rooms] rooms_test => ', data_);
  }
}
