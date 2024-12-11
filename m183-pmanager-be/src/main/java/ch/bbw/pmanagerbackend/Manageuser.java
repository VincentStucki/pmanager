package ch.bbw.pmanagerbackend;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Manageuser<T> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String website;
    private String username;
    private String password;
    private String remarks;
}
