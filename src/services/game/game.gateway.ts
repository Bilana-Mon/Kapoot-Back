import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway()
export class GameGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('question')
    handleQuestion(@MessageBody() question:string): void {
        this.server.emit('question', question);
    }
}