package com.adwProject.Backend.dto;

import com.adwProject.Backend.entity.enums.Typology;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.Value;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Setter
@Getter
@Builder
@Value
public class UserInput {
    private String code;
    @Enumerated(EnumType.STRING)
    @Column(length = 3)
    private Typology typology;
    private boolean active;
    private String email;
    private String pw;
}
