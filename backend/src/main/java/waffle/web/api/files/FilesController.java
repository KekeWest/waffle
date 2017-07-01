package waffle.web.api.files;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import waffle.service.AreaService;

@RestController
@RequestMapping("/api/files")
@PreAuthorize("isAuthenticated()")
public class FilesController {

    @Autowired
    private AreaService areaService;

    @GetMapping("/all-areas")
    public AllAreas getAllAreas(Authentication authentication) {
        return new AllAreas(areaService.getAllAreaNames(authentication));
    }

}
