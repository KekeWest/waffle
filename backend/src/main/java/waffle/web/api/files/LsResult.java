package waffle.web.api.files;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
public class LsResult implements Serializable {

    List<Node> nodes = new ArrayList<>();

    @Builder
    @Data
    public static class Node implements Serializable {

        private String name;

        private String type;

    }

}
