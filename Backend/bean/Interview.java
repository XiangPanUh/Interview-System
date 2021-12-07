package com.example.interview.bean;

import javax.persistence.*;
import java.util.Date;


@Entity
@Table(name = "I_INTERVIEW")
public class Interview {
    @Id
    @SequenceGenerator(name = "i_interview_seq_gen", sequenceName = "I_INTERVIEW_SEQ", allocationSize = 1)
    @GeneratedValue(generator="i_interview_seq_gen", strategy = GenerationType.AUTO)
    private int id;
    @Column
    private Date time;
    @Column
    private String candidate;
    @Column
    private String scheduler;
    @Column
    private String phone;
    @Column
    private String email;
    @Column
    private String comments;
    @Column
    private String status;
    @Column
    private String resume;


    public Interview() {
    }

    public Interview(int id, Date time, String candidate, String scheduler, String phone, String email, String comments, String status, String resume) {
        this.id = id;
        this.time = time;
        this.candidate = candidate;
        this.scheduler = scheduler;
        this.phone = phone;
        this.email = email;
        this.comments = comments;
        this.status = status;
        this.resume = resume;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getCandidate() {
        return candidate;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    public String getScheduler() {
        return scheduler;
    }

    public void setScheduler(String scheduler) {
        this.scheduler = scheduler;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getStatus() {
        return status;
    }

    public String getResume() {
        return resume;
    }

    public void setResume(String resume) {
        this.resume = resume;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Interview{" +
                "id=" + id +
                ", time=" + time +
                ", candidate='" + candidate + '\'' +
                ", scheduler='" + scheduler + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                ", comments='" + comments + '\'' +
                ", status='" + status + '\'' +
                ", resume='" + resume + '\'' +
                '}';
    }
}
