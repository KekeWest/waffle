package waffle.web.websocket.api.shared.edit;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonProcessingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessagingException;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
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
    public void join(@DestinationVariable String nodeId, Message<String> message) throws MessagingException, JsonProcessingException {
        spreadSheetEditUsersService.join(nodeId, message);
    }

    @MessageMapping("leave/{nodeId}")
    public void leave(@DestinationVariable String nodeId, Message<String> message) throws MessagingException, JsonProcessingException {
        spreadSheetEditUsersService.leave(nodeId, message);
    }

    @MessageMapping("get-spreadsheet/{nodeId}")
    public void getSpreatSheet(@DestinationVariable String nodeId, Message<String> message) throws IOException {
        spreadSheetStoreService.getSpreadSheet(nodeId, message);
    }

    @MessageMapping("relay-spreadsheet/{nodeId}")
    public void relaySpreadSheet(@DestinationVariable String nodeId, Message<String> message) {
        spreadSheetStoreService.relaySpreadSheet(nodeId, message);
    }

}
