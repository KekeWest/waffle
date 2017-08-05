package waffle.service.shared.edit;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;

import waffle.config.Initial.HomeDirectoryComponent;

@Service
public class SpreadSheetStoreService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private SpreadSheetEditUsersService spreadSheetEditUsersService;

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    public void getSpreadSheet(String nodeId, Message<String> message) throws IOException {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(message);
        int userCount = spreadSheetEditUsersService.getUserCount(nodeId);
        if (userCount == 0) {
            return;
        } else if (userCount == 1) {
            sendSpreadSheet(nodeId, sha.getUser().getName());
        } else {
            requestSpreadSheet(nodeId, sha.getUser().getName());
        }
    }

    private void sendSpreadSheet(String nodeId, String userName) throws IOException {
        String spreadSheet = homeDirectoryComponent.getFile(nodeId);
        Map<String, Object> headers = new HashMap<>();
        headers.put("method", "getSpreadSheet");

        simpMessagingTemplate.convertAndSendToUser(
                userName,
                "/topic/shared-edit/control/" + nodeId,
                spreadSheet,
                headers);
    }

    private void requestSpreadSheet(String nodeId, String userName) {
        Set<String> userNames = spreadSheetEditUsersService.getUserNames(nodeId);
        int requestNum = RandomUtils.nextInt(0, userNames.size());

        Map<String, Object> headers = new HashMap<>();
        headers.put("method", "requestSpreadSheet");
        headers.put("requestUser", userName);

        simpMessagingTemplate.convertAndSendToUser(
                (String) userNames.toArray()[requestNum],
                "/topic/shared-edit/control/" + nodeId,
                null,
                headers);
    }

    public void relaySpreadSheet(String nodeId, Message<String> message) {
        String relayUser = (String) message.getHeaders().get("relayUser");
        if (relayUser == null) {
            return;
        }

        Map<String, Object> headers = new HashMap<>();
        headers.put("method", "getSpreadSheet");

        simpMessagingTemplate.convertAndSendToUser(
                relayUser,
                "/topic/shared-edit/control/" + nodeId,
                message.getPayload(),
                headers);
    }

}
