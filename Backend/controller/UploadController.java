package com.example.interview.controller;

import com.example.interview.bean.Interview;
import com.example.interview.dao.InterviewDao;
import com.example.interview.http.Response;
import com.example.interview.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;


@RestController
@RequestMapping("/files")
public class UploadController {

    @Autowired
    FileService fileService;
    @Autowired
    InterviewDao interviewDao;

    @PostMapping("/upload/{id}") // //new annotation since 4.3
    public Response singleFileUpload(@RequestParam("file") MultipartFile file,@PathVariable Integer id) {
        fileService.singleFileUpload(file, id);
        return new Response(true);
    }

    @GetMapping("/{id}")
    public File getFileById(@PathVariable Integer id) {
        return fileService.getFileById(id);
    }

    @PostMapping("/import")
    public Response uploadExcel (@RequestParam("file") MultipartFile file) throws IOException{
        System.out.println(file);
        fileService.uploadExcel(file);
        return new Response(true);
    }

}
