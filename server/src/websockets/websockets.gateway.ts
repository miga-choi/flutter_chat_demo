import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway(80, { namespace: 'message' })
export class WebSocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  handleConnection(client: any, ...args: any[]) {
    console.log(`Client Connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client Disconnected: ${client.id}`);
  }
}
