package waffle.web.websocket.api.shared.edit;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;

import waffle.service.shared.edit.SpreadSheetEditUsersService;
import waffle.service.shared.edit.SpreadSheetStoreService;

@Controller
@MessageMapping("shared-edit")
public class SharedEditController {

    @Autowired
    private SpreadSheetEditUsersService spreadSheetEditUsersService;

    @Autowired
    private SpreadSheetStoreService spreadSheetStoreService;

    @MessageMapping("join/{nodeId}")
    public void join(@DestinationVariable String nodeId, Message<byte[]> message) throws MessagingException, JsonProcessingException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        spreadSheetEditUsersService.join(
                nodeId,
                sha.getSessionId(),
                sha.getUser().getName());
    }

    @MessageMapping("get-spreadsheet/{nodeId}")
    public void getSpreatSheet(@DestinationVariable String nodeId, Message<byte[]> message) throws IOException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        spreadSheetStoreService.getSpreadSheet(
                nodeId,
                sha.getUser().getName());
    }

    @MessageMapping("relay-spreadsheet/{nodeId}")
    public void relaySpreadSheet(@DestinationVariable String nodeId, Message<String> message) {
        spreadSheetStoreService.relaySpreadSheet(
                nodeId,
                (String) message.getHeaders().get("relayUser"),
                message.getPayload());
    }

}
