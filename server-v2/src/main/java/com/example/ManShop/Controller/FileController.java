package com.example.ManShop.Controller;



import com.example.ManShop.Service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.server.PathParam;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/file")
public class FileController {

    @Autowired
    private FileService fileService;

    @Autowired
    private ServletContext app;

    @Autowired
    private HttpServletRequest request;

    @GetMapping("{folder}/{file}")
    public ResponseEntity<byte[]> downdload(@PathVariable("folder") String folder, @PathVariable("file") String file){
        byte[] image =  fileService.read(folder, file);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("{folder}")
    public ResponseEntity<List<String>> upload(@PathVariable("folder") String folder, @PathParam("file")MultipartFile[] file){
        System.out.println(file);
        try{
            return  ResponseEntity.ok(fileService.save(folder, file));
        }catch(Exception  e) {
            System.out.println(e);
            return ResponseEntity.badRequest().build();
        }
    }


    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("{folder}/{file}")
    public void delete(@PathVariable("folder") String folder, @PathVariable("file") String file){
        fileService.delete(folder, file);
    }


    @GetMapping("getall/{folder}")
    public List<String> list(@PathVariable("folder") String folder){
        return fileService.list(folder);
    }

}
