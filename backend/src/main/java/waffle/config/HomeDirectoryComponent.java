package waffle.config;

import java.io.File;

import javax.annotation.PostConstruct;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import waffle.config.properties.WaffleProperties;

@Slf4j
@Component
public class HomeDirectoryComponent {

    @Autowired
    private WaffleProperties waffleProperties;

    private String spreadSheetDir;

    @PostConstruct
    private void init() {
        spreadSheetDir = waffleProperties.getHomeDir() + "/SpreadSheet/";
        checkHomeDirectoryExistence();
    }

    private void checkHomeDirectoryExistence() {
        File homeDirectory = new File(waffleProperties.getHomeDir());
        if (!homeDirectory.exists()) {
            try {
                homeDirectory.mkdirs();
                if (log.isDebugEnabled()) {
                    log.debug("create home directory.");
                }
            } catch (Exception e) {
                log.error("create home directory failed.", e);
                throw e;
            }
        }

        File spreadSheetDirectory = new File(spreadSheetDir);
        if (!spreadSheetDirectory.exists()) {
            try {
                spreadSheetDirectory.mkdirs();
                if (log.isDebugEnabled()) {
                    log.debug("create spreadsheet directory.");
                }
            } catch (Exception e) {
                log.error("create spreadsheet directory failed.", e);
                throw e;
            }
        }
    }

}
