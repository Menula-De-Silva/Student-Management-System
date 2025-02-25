package edu.icet.controller;

import edu.icet.dto.Student;
import edu.icet.service.StudentService;
import edu.icet.service.impl.StudentServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@RequiredArgsConstructor
@CrossOrigin
public class StudentController {

    final StudentService service;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addStudent(@RequestBody Student student){
        service.addStudent(student);
        System.out.println(student);
    }

    @GetMapping("/get-all")
    public List<Student> getAll(){
        return service.getAll();
    }

    @DeleteMapping("delete/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteStudent(@PathVariable Integer id){
        service.deleteStudent(id);
        System.out.println("Student "+id+" Deleted");
    }

    @PutMapping("/update-student")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateStudent(@RequestBody Student student){
        service.updateStudent(student);
    }

    @GetMapping("search-by-id/{id}")
    public Student searchById(@PathVariable Integer id){
        return service.searchById(id);
    }

    @GetMapping("search-by-name/{name}")
    public List<Student> searchByName(@PathVariable String name){
        return service.searchByName(name);
    }
}
