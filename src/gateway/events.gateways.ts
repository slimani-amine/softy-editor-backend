/* eslint-disable  */
import { JwtService } from '@nestjs/jwt';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { joinRoomDto } from './dto/join-room-dto.dto';

@WebSocketGateway(4040, { transports: ['websocket'] })
export class GlobalEventsGateWay {
  private connctedClients = new Map<string, Socket>();

  constructor(private readonly JwtService: JwtService) {}

  handleConnection(client: Socket) {
    console.log(client.handshake.headers.token);

    const token =
      client.handshake.headers.token || client.handshake.query.token;
    try {
      const ValidClient = this.JwtService.verify(String(token), {
        secret: process.env.AUTH_JWT_SECRET,
      });
      if (!ValidClient) {
        client.disconnect(true);
      } else {
        const ExistingClientConnected = this.connctedClients.get(
          ValidClient.id,
        );
        if (ExistingClientConnected) {
          ExistingClientConnected.disconnect(true);
        }
        this.connctedClients.set(ValidClient.id, client);
      }
    } catch (error) {
      console.error('JWT verification error:', error.message);
    }
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, roomId: joinRoomDto) {
    console.log(roomId);
    client.join(roomId?.toString());
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket, roomId: joinRoomDto) {
    client.leave(roomId.toString());
  }

  handleDisconnect(client: Socket) {
    client.disconnect(true);
  }
  @SubscribeMessage('send-changes')
  handleSendChanges(client: Socket, { data, documentId }) {
    console.log('CHANGE');
    client.to(documentId).emit('receive-changes', data, documentId);
  }
}
