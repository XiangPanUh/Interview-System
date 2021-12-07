package com.example.interview.service;

import com.example.interview.bean.Interview;
import com.example.interview.dao.InterviewDao;
import com.example.interview.http.Response;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.*;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Service
public class FileService {
    @Autowired
    InterviewDao interviewDao;
    private static String UPLOADED_FOLDER = "C://Users//xiang//OneDrive//Desktop//Training//Interview-Back//resume//";

    public Response singleFileUpload(MultipartFile file, Integer id) {
        if (file.isEmpty()) {
            return new Response(false);
        }
        try {
            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());

            Interview interview = interviewDao.findById(id).get();
            interview.setResume(file.getOriginalFilename());
            interviewDao.save(interview);
            Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return new Response(true);
    }

    public File getFileById(Integer id) {
        String path = interviewDao.findById(id).get().getResume();
        File file = new File(path);
        return file;
    }

//    @Async
    public Response uploadExcel(MultipartFile file) throws IOException{
        if (file.isEmpty()) {
            return new Response(false);
        }
        XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream());
        XSSFSheet worksheet = workbook.getSheetAt(0);

        for (int i =1; i < worksheet.getPhysicalNumberOfRows(); i++) {
            Interview temp = new Interview();
            XSSFRow row = worksheet.getRow(i);

            String time = row.getCell(1).getStringCellValue();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy.mm.dd - HH:mm", Locale.US);
            Date d1 = null;
            try {
                d1 = sdf.parse(time);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            temp.setTime(d1);
//            temp.setTime((Date)row.getCell(1).getDateCellValue());
            temp.setCandidate((String)row.getCell(2).getStringCellValue());
            temp.setScheduler((String)row.getCell(3).getStringCellValue());
            String str = NumberToTextConverter.toText(row.getCell(4).getNumericCellValue());
            temp.setPhone(str);
            if(row.getCell(5) != null) {
                temp.setEmail((String)row.getCell(5).getStringCellValue());
            }
            if(row.getCell(6) != null) {
                temp.setComments((String)row.getCell(6).getStringCellValue());
            }
            temp.setStatus((String)row.getCell(7).getStringCellValue());
            interviewDao.save(temp);
        }
        return new Response(true);
    }
}
