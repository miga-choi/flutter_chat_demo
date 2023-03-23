import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('msg')
  async getMessage(@MessageBody() data_: string): Promise<void> {
    console.log('data => ', data_);
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  async handleConnection(client_: Socket, ...args_: any[]) {
    console.log(`handleConnection => `, client_.id);
    client_.emit('fromServer', 'OK');
    for await (const arg of args_) {
      console.log('arg => ', arg);
    }
  }

  async handleDisconnect(client_: Socket) {
    console.log(`handleDisconnect => `, client_.id);
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
