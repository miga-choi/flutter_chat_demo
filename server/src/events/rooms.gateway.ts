import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'rooms',
  cors: {
    origin: '*',
  },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
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
}
