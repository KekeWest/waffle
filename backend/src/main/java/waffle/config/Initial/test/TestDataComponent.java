package waffle.config.Initial.test;

import java.util.Arrays;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import waffle.domain.files.AreaNode;
import waffle.domain.files.DirectoryNode;
import waffle.domain.files.FileNode;
import waffle.domain.security.Authority;
import waffle.domain.security.User;
import waffle.repository.files.AreaNodeRepository;
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
    private AreaNodeRepository areaNodeRepository;

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
        DirectoryNode directory1 = new DirectoryNode();
        directory1.setName("directory1");
        FileNode file1 = new FileNode();
        file1.setName("file1");
        FileNode file2 = new FileNode();
        file2.setName("file2");
        directory1.addFiles(file1, file2);

        DirectoryNode directory2 = new DirectoryNode();
        directory2.setName("directory2");
        FileNode file3 = new FileNode();
        file3.setName("file3");
        FileNode file4 = new FileNode();
        file4.setName("file4");
        directory2.addFiles(file3, file4);

        DirectoryNode directory3 = new DirectoryNode();
        directory3.setName("directory3");
        directory3.addDirectories(directory1, directory2);

        AreaNode testArea = new AreaNode();
        testArea.setName("testArea");
        testArea.addDirectory(directory3);
        userRepository.findAll().forEach((user) -> {
            testArea.addUsers(user);
        });

        areaNodeRepository.save(testArea);
    }

}
