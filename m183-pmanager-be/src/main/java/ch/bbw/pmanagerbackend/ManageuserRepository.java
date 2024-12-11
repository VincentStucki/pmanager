package ch.bbw.pmanagerbackend;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageuserRepository extends CrudRepository<Manageuser, Integer> {
}
