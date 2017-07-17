package waffle.service.files;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.neo4j.ogm.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import waffle.config.Initial.HomeDirectoryComponent;
import waffle.domain.db.node.files.Area;
import waffle.domain.db.node.files.Directory;
import waffle.domain.db.node.files.File;
import waffle.domain.db.node.security.User;
import waffle.repository.files.DirectoryRepository;
import waffle.repository.security.UserRepository;

@Service
public class FilesService {

    @Autowired
    private HomeDirectoryComponent homeDirectoryComponent;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DirectoryRepository directoryRepository;

    @Autowired
    private Session session;

    public List<String> getAllAreaNames(Authentication authentication) {
        return getAllAreaNode(authentication.getName()).stream()
                .map(Area::getName)
                .collect(Collectors.toList());
    }

    public Set<Area> getAllAreaNode(String username) {
        User user = userRepository.findByName(username);
        if (user == null || user.getAreas() == null) {
            return new HashSet<>();
        }
        return user.getAreas();
    }

    public Directory getDirectoryByPath(String username, String areaname, List<String> dirNameChain) {
        StringBuilder querybr = new StringBuilder();
        HashMap<String, Object> parameters = new HashMap<>();
        parameters.put("username", username);
        parameters.put("areaname", areaname);
        querybr.append("MATCH (:User {name:{username}})-[:Member]->(:Area {name:{areaname}})");

        for (int i = 0; i < dirNameChain.size(); i++) {
            querybr.append("-[:Ownership]->(dir");
            querybr.append(i);
            querybr.append(":Directory {name:{dirname");
            querybr.append(i);
            querybr.append("}})");

            parameters.put("dirname" + String.valueOf(i), dirNameChain.get(i));
        }

        querybr.append(" RETURN dir");
        querybr.append(dirNameChain.size() - 1);
        querybr.append(".dirId");

        String dirId = session.queryForObject(String.class, querybr.toString(), parameters);
        if (dirId == null) {
            return null;
        }

        return directoryRepository.findOne(dirId);
    }

    private void nodeNameCheck(String name, Directory currentDir) {
        if (name.contains("/") || name.contains("\n")) {
            throw new InvalidNodeNameException();
        }

        Directory cdir = directoryRepository.findOne(currentDir.getDirId());
        if (cdir.getDirs() != null) {
            for (Directory dir : cdir.getDirs()) {
                if (name.equals(dir.getName())) {
                    throw new InvalidNodeNameException();
                }
            }
        }
        if (cdir.getFiles() != null) {
            for (File file : cdir.getFiles()) {
                if (name.equals(file.getName())) {
                    throw new InvalidNodeNameException();
                }
            }
        }
    }

    @Transactional
    public File createFile(String username, String areaname, String dirId, String filename, String fileBody) throws IOException {
        Directory dir = directoryRepository.getDirectoryByDirId(username, areaname, dirId);
        if (dir == null) {
            throw new NodeNotFoundException(dirId);
        }
        nodeNameCheck(filename, dir);

        File file = new File();
        file.setName(filename);
        dir.addFiles(file);
        directoryRepository.save(dir);
        homeDirectoryComponent.updateFile(file.getFileId(), fileBody);
        return file;
    }

    @Transactional
    public Directory createDirectory(String username, String areaname, String dirId, String dirname) {
        Directory dir = directoryRepository.getDirectoryByDirId(username, areaname, dirId);
        if (dir == null) {
            throw new NodeNotFoundException(dirId);
        }
        nodeNameCheck(dirname, dir);

        Directory newDir = new Directory();
        newDir.setName(dirname);
        dir.addDirectories(newDir);
        directoryRepository.save(dir);
        return newDir;
    }

}
