package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Student {
    private Integer id;
    private String name;
    private String dob;
    private String indexnumber;
    private String phoneNumber;
}
