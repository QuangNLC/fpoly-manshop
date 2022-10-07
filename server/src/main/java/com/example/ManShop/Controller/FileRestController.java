package com.example.ManShop.Controller;



import com.example.ManShop.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/file")
public class FileRestController {

    final
    FileService fileService;

    final
    ServletContext app;


    final
    HttpServletRequest request;

    public FileRestController(FileService fileService, ServletContext app, HttpServletRequest request) {
        this.fileService = fileService;
        this.app = app;
        this.request = request;
    }

    @GetMapping("{folder}/{file}")
    public ResponseEntity<byte[]> downdload(@PathVariable("folder") String folder, @PathVariable("file") String file){
        byte[] image =  fileService.read(folder, file);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }


    @PostMapping("{folder}")
    public List<String> upload(@PathVariable("folder") String folder, @PathParam("file")MultipartFile[] file){
        return  fileService.save(folder, file);
    }



    @DeleteMapping("{folder}/{file}")
    public void delete(@PathVariable("folder") String folder, @PathVariable("file") String file){
        fileService.delete(folder, file);
    }


    @GetMapping("getall/{folder}")
    public List<String> list(@PathVariable("folder") String folder){
        return fileService.list(folder);
    }

}
