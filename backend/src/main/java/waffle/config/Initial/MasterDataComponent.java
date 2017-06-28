package waffle.config.Initial;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import waffle.domain.config.WaffleVersion;
import waffle.domain.security.Authority;
import waffle.repository.config.WaffleVersionRepository;
import waffle.repository.security.AuthorityRepository;

@Slf4j
@Component
public class MasterDataComponent {

    public static final List<String> AUTHORITY_NAMES = Collections.unmodifiableList(Arrays.asList(
            "USER"));

    @Autowired
    private WaffleVersionRepository waffleVersionRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Transactional
    public void createMasterData() {
        List<WaffleVersion> versions = new ArrayList<>();
        CollectionUtils.addAll(versions, waffleVersionRepository.findAll());
        if (!versions.isEmpty()) {
            return;
        }

        log.info("create master data.");

        createWaffleVersion();
        createAuthorities();
    }

    private void createWaffleVersion() {
        WaffleVersion version = new WaffleVersion();
//        version.setVersion(buildProperties.getVersion());
        waffleVersionRepository.save(version);
    }

    private void createAuthorities() {
        List<Authority> authorities = new ArrayList<>();
        AUTHORITY_NAMES.forEach(
                (name) -> {
                    Authority authority = new Authority();
                    authority.setAuthorityName(name);
                    authorities.add(authority);
                });
        authorityRepository.save(authorities);
    }

}
