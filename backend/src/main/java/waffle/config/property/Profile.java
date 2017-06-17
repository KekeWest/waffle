package waffle.config.property;

import lombok.Getter;

public enum Profile {

    PRODUCTION("production"),

    LOCAL_TEST("local-test");

    @Getter
    private final String name;

    private Profile(String name) {
        this.name = name;
    }

}
