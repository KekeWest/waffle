package waffle.config.Initial.test;

import java.util.Arrays;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import waffle.domain.db.node.files.Area;
import waffle.domain.db.node.files.Directory;
import waffle.domain.db.node.files.File;
import waffle.domain.db.node.security.Authority;
import waffle.domain.db.node.security.User;
import waffle.repository.files.AreaRepository;
import waffle.repository.security.AuthorityRepository;
import waffle.repository.security.UserRepository;
import waffle.security.AuthorityType;

@Slf4j
@Component
public class TestDataComponent {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthorityRepository authorityRepository;

    @Autowired
    private AreaRepository areaNodeRepository;

    @Transactional
    public void createTestData() {
        log.info("create test data.");

        createUsers();
        createFiles();
    }

    private void createUsers() {

        Authority authority = authorityRepository.findByAuthorityType(AuthorityType.ROLE_USER);

        User user1 = new User();
        user1.setName("user1");
        user1.setPassword("pass");
        user1.addAuthorities(authority);

        User user2 = new User();
        user2.setName("user2");
        user2.setPassword("pass");
        user2.addAuthorities(authority);

        userRepository.save(Arrays.asList(user1, user2));
    }

    private void createFiles() {
        Directory directory1 = new Directory();
        directory1.setName("directory1");
        File file1 = new File();
        file1.setName("file1");
        File file2 = new File();
        file2.setName("file2");
        directory1.addFiles(file1, file2);

        Directory directory2 = new Directory();
        directory2.setName("directory2");
        File file3 = new File();
        file3.setName("file3");
        File file4 = new File();
        file4.setName("file4");
        directory2.addFiles(file3, file4);

        Directory directory3 = new Directory();
        directory3.setName(Directory.ROOT_NAME);
        directory3.addDirectories(directory1, directory2);

        Area testArea = new Area();
        testArea.setName("testArea");
        testArea.addDirectory(directory3);
        userRepository.findAll().forEach((user) -> {
            testArea.addUsers(user);
        });

        areaNodeRepository.save(testArea);
    }

}
