package waffle.service.files;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import waffle.exception.WaffleException;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class NodeNotFoundException extends WaffleException {

    private String nodeId;

}
