package ch.bbw.pmanagerbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class ManageuserController implements ApplicationRunner {

    @Autowired
    private ManageuserRepository manageUserRepository;

    @GetMapping("")  // http://localhost:8080
    public String helloWorld() {
        return "Hello World from Backend";
    }

    @GetMapping("manageusers")
    public List<Manageuser> getUsers() {
        System.out.println(manageUserRepository.findAll());
        return (List<Manageuser>) manageUserRepository.findAll();
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        System.out.println("App Runner...");
        manageUserRepository
                .save(new Manageuser(0, "www", "name", "woa123", "hallo"));
        manageUserRepository
                .findAll()
                .forEach(System.out::println);

    }

    @GetMapping("manageusers/{id}")
    public Manageuser getAUser(@PathVariable int id) {
        return new Manageuser(id, "www", "name", "woah" , "hallo");
    }
}
