package waffle.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import waffle.domain.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByName(String name);

}
