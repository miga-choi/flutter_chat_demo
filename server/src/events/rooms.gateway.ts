import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'room',
  cors: {
    origin: '*',
  },
})
export class RoomsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleConnection(client_: any, ...args_: any[]) {
    console.log(client_);
  }

  handleDisconnect(client_: any) {
    console.log(client_);
  }

  @SubscribeMessage('room.join')
  joinChatRoom(client: Socket, roomId: string) {
    client.join(roomId);
  }

  @SubscribeMessage('room.leave')
  leaveChatRoom(client: Socket, roomId: string) {
    client.leave(roomId);
  }
}
