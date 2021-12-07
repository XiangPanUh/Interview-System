package com.example.interview.service;

import com.example.interview.bean.Interview;
import com.example.interview.dao.InterviewDao;
import com.example.interview.http.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class InterviewService {
    @Autowired
    private InterviewDao interviewDao;

    public List<Interview> getInterviews() {
        return interviewDao.findAll();
    }
    public Response addInterview(Interview interview) {
        Interview i = interview;
        i.setStatus("Pending");
        Date date = new Date();
        String oldDate = i.getTime().toString();
        try {
            date = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(oldDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        i.setTime(date);
        interviewDao.save(i);
        return new Response(true);
    }

    public Response updateInterview(Interview interview) {
        try {
            Interview i = interviewDao.findById(interview.getId()).get();
            if (interview.equals(i)) {
                return new Response(false);
            } else {
                interviewDao.save(interview);
            }
            return new Response(true);
        } catch (Exception e) {
            return new Response(false);
        }
    }

    public Map<String,Integer> getStatus() {
        Map<String, Integer> map = new HashMap<>();
        int i = 1;
        interviewDao.findAll().stream().forEach(a -> {
            if (!map.containsKey(a.getStatus())) {
                map.put(a.getStatus(), i);
            } else {
                int j = map.get(a.getStatus());
                map.put(a.getStatus(), j+1);
            }
        });
        return map;
    }

    public Map<String,Double> getBar() {
            Map<String, Double> map = new HashMap<>();

            try{
        List<Interview> passList = interviewDao.findAll();
        int total = passList.size();
        passList.stream().filter(p-> p.getStatus().equals("Pass")).collect(Collectors.toList());
        double i =1;
        passList.stream().forEach(a -> {
            if (!map.containsKey(a.getScheduler())) {
                map.put(a.getScheduler(), i);
            } else {
                double j = map.get(a.getScheduler());
                map.put(a.getScheduler(), (j + 1));
            }
        });
        map.put("Taylor", (double) (Math.round(map.get("Taylor")/total*100)));
        map.put("Robert", (double) (Math.round((map.get("Robert")/total)*100)));
        map.put("Gregory", (double) (Math.round((map.get("Gregory")/total)*100)));
        map.put("Peter", (double) (Math.round((map.get("Peter")/total)*100)));

        }
        catch (Exception e ) {

        }
        return map;
    }
}
