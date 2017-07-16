package waffle.config.neo4j.eventlistener;

import java.time.LocalDateTime;

import org.neo4j.ogm.session.event.Event;
import org.neo4j.ogm.session.event.EventListenerAdapter;

import waffle.domain.db.node.files.Node;

public class NodeEventListener extends EventListenerAdapter {

    @Override
    public void onPreSave(Event event) {
        if (!Node.class.isAssignableFrom(event.getObject().getClass())) {
            return;
        }
        Node entity = (Node) event.getObject();
        LocalDateTime now = LocalDateTime.now();
        if (entity.getCreateDateTime() == null) {
            entity.setCreateDateTime(now);
        }
        entity.setUpdateDateTime(now);
    }

}
