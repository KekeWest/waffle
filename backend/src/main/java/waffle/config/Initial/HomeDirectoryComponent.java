package waffle.config.Initial;

import java.io.File;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import waffle.config.properties.WaffleProperties;

@Slf4j
@Component
public class HomeDirectoryComponent {

    @Autowired
    private WaffleProperties waffleProperties;

    @Getter
    private String spreadSheetDir;

    public void init() {
        spreadSheetDir = waffleProperties.getHomeDir() + "/SpreadSheet/";
        checkHomeDirectoryExistence();
    }

    private void checkHomeDirectoryExistence() {
        File homeDirectory = new File(waffleProperties.getHomeDir());
        if (!homeDirectory.exists()) {
            try {
                homeDirectory.mkdirs();
                log.info("create home directory. (" + homeDirectory.getAbsolutePath() + ")");
            } catch (Exception e) {
                log.error("create home directory failed.", e);
                throw e;
            }
        }

        File spreadSheetDirectory = new File(spreadSheetDir);
        if (!spreadSheetDirectory.exists()) {
            try {
                spreadSheetDirectory.mkdirs();
                log.info("create spreadsheet directory. (" + spreadSheetDirectory.getAbsolutePath() + ")");
            } catch (Exception e) {
                log.error("create spreadsheet directory failed.", e);
                throw e;
            }
        }
    }

}
