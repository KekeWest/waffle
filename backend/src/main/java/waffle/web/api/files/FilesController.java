package waffle.web.api.files;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import waffle.domain.db.node.files.Area;
import waffle.domain.db.node.files.Directory;
import waffle.service.FilesService;

@RestController
@RequestMapping("/api/files")
@PreAuthorize("isAuthenticated()")
public class FilesController {

    @Autowired
    private FilesService filesService;

    @GetMapping("/all-areas")
    public AllAreas getAllAreas(Authentication authentication) {
        List<String> areaNames = filesService.getAllAreaNode(authentication.getName()).stream()
                .map(Area::getName)
                .collect(Collectors.toList());

        return new AllAreas(areaNames);
    }

    @GetMapping("/ls")
    public LsResult ls(@RequestParam String areaname, @RequestParam String path, Authentication authentication) {
        ArrayList<String> dirNameChain = new ArrayList<>(Arrays.asList(StringUtils.split(path, "/")));
        dirNameChain.removeIf((dirname) -> {
            return dirname.equals("");
        });
        dirNameChain.add(0, Directory.ROOT_NAME);

        Directory dir = filesService.getDirectoryByPath(authentication.getName(), areaname, dirNameChain);

        LsResult lsResult = new LsResult();
        if (dir.getDirs() != null) {
            dir.getDirs().forEach(
                    (d) -> {
                        lsResult.getNodes().add(
                                LsResult.Node.builder()
                                        .name(d.getName())
                                        .type("directory")
                                        .updateDateTime(d.getUpdateDateTime())
                                        .createDateTime(d.getCreateDateTime())
                                        .build());
                    });
        }
        if (dir.getFiles() != null) {
            dir.getFiles().forEach(
                    (f) -> {
                        lsResult.getNodes().add(
                                LsResult.Node.builder()
                                        .name(f.getName())
                                        .type("file")
                                        .updateDateTime(f.getUpdateDateTime())
                                        .createDateTime(f.getCreateDateTime())
                                        .build());
                    });
        }

        return lsResult;
    }

}
