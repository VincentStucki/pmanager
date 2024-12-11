package ch.bbw.pmanagerbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PManagerBackendApplication {

    @Autowired
    private ManageuserRepository manageUserRepository;

    public static void main(String[] args) {
        SpringApplication.run(PManagerBackendApplication.class, args);
    }

}
