package waffle.security;

import java.io.Serializable;
import java.util.List;

import lombok.Data;

@Data
public class LoggedIn implements Serializable {

    private boolean active;

    private List<String> authorities;

}
