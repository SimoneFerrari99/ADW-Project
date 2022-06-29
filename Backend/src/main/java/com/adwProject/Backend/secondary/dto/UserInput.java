package com.adwProject.Backend.secondary.dto;

import com.adwProject.Backend.secondary.entity.enums.Typology;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Setter
@Getter
//@Builder
//@Value
public class UserInput {
    @Enumerated(EnumType.STRING)
    @Column(length = 3)
    private Typology typology;
    private boolean active;
    private String email;
    private String pw;
}
