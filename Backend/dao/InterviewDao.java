package com.example.interview.dao;

import com.example.interview.bean.Interview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterviewDao extends JpaRepository<Interview, Integer> {

}
