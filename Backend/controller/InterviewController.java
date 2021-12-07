package com.example.interview.controller;

import com.example.interview.bean.Interview;
import com.example.interview.http.Response;
import com.example.interview.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.PreUpdate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/interviews")
public class InterviewController {
    @Autowired
    private InterviewService interviewService;


    @GetMapping
    public List<Interview> getInterviews () {
        return interviewService.getInterviews();
    }

    @PostMapping
    public Response addInterview(@RequestBody Interview interview) {
        interviewService.addInterview(interview);
        return new Response(true);
    }
    @PostMapping("/update")
    public Response updateInterview(@RequestBody Interview interview) {
        interviewService.updateInterview(interview);
        return new Response(true);
    }
    @GetMapping("/status")
    public Map<String, Integer> getStatus() {
        return interviewService.getStatus();
    }
    @GetMapping("/bar")
    public Map<String,Double> getBar() {
        return interviewService.getBar();
    }
}
