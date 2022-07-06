package com.adwProject.Backend.secondary.entity;

import com.adwProject.Backend.secondary.entity.enums.Typology;
import lombok.*;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@ToString
@Table(name = "users", schema= "public")
public class User {                                                                     //The JPA Entity (Java Persistence API) are used for managing relational data in Java applications.

    @Id                                                                                 //Annotation to indicate that the string "code" is a primary key
    @Column(unique = true, name = "code", updatable = false, nullable = false)
    private String code;

    @Enumerated(EnumType.STRING)
    @Column(name = "typology", columnDefinition="text")
    private Typology typology;

    @Column(name = "active")
    private boolean active;

    @Column(name = "email")
    private String email;

    @Column(name = "pw")
    private String pw;
}
