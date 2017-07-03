package waffle.config.Initial;

import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;

import org.apache.commons.collections4.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import waffle.domain.db.node.config.WaffleVersion;
import waffle.domain.db.node.security.Authority;
import waffle.domain.db.node.security.User;
import waffle.repository.config.WaffleVersionRepository;
import waffle.repository.security.AuthorityRepository;
import waffle.repository.security.UserRepository;
import waffle.security.AuthorityType;

@Slf4j
@Component
public class MasterDataComponent {

    @Autowired
    private WaffleVersionRepository waffleVersionRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private UserRepository userRepository;

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
        createAdminUser();
    }

    private void createWaffleVersion() {
        WaffleVersion version = new WaffleVersion();
//        version.setVersion(buildProperties.getVersion());
        waffleVersionRepository.save(version);
    }

    private void createAuthorities() {
        List<Authority> authorities = new ArrayList<>();

        for (AuthorityType authorityType : AuthorityType.values()) {
            Authority authority = new Authority();
            authority.setAuthorityType(authorityType);
            authorities.add(authority);
        }

        authorityRepository.save(authorities);
    }

    private void createAdminUser() {
        User user = new User();
        user.setName("admin");
        user.setPassword("admin");
        user.addAuthorities(authorityRepository.findByAuthorityType(AuthorityType.ROLE_ADMIN));
        userRepository.save(user);
    }

}
