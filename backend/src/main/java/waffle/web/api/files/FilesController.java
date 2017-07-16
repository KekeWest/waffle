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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import waffle.domain.db.node.files.Area;
import waffle.domain.db.node.files.Directory;
import waffle.domain.db.node.files.File;
import waffle.service.files.FilesService;
import waffle.web.api.files.response.AllAreas;
import waffle.web.api.files.response.Ls;
import waffle.web.api.files.response.NewNode;
import waffle.web.api.files.response.Node;

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
    public Ls ls(@RequestParam String areaname, @RequestParam String path, Authentication authentication) {
        ArrayList<String> dirNameChain = new ArrayList<>(Arrays.asList(StringUtils.split(path, "/")));
        dirNameChain.removeIf((dirname) -> {
            return dirname.equals("");
        });
        dirNameChain.add(0, Directory.ROOT_NAME);

        Directory dir = filesService.getDirectoryByPath(authentication.getName(), areaname, dirNameChain);

        Ls ls = new Ls();
        if (dir.getDirs() != null) {
            dir.getDirs().forEach((d) -> ls.getChildNodes().add(Node.fromDirectory(d)));
        }
        if (dir.getFiles() != null) {
            dir.getFiles().forEach((f) -> ls.getChildNodes().add(Node.fromFile(f)));
        }
        ls.setCurrentNode(Node.fromDirectory(dir));

        return ls;
    }

    @PutMapping("/new/spread-sheet")
    public NewNode newSpreadSheet(Authentication authentication, @RequestParam String areaname, @RequestParam String dirId,
            @RequestParam String filename, @RequestBody String fileBody) {
        File newFile = filesService.createNewFile(authentication.getName(), areaname, dirId, filename, fileBody);
        return NewNode.builder().newNode(Node.fromFile(newFile)).build();
    }

}
