package com.example.ManShop.Controller;

import com.example.ManShop.DTOS.BillResponse;
import com.example.ManShop.Service.BillService;
import com.example.ManShop.Service.PdfGenerator;
import com.lowagie.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/bill")
@RequiredArgsConstructor
public class BillController {
    private final BillService billService;

    @GetMapping("/{id}")
    public ResponseEntity<List<BillResponse>> getBill(@PathVariable("id") Integer id, HttpServletResponse response)
            throws DocumentException, IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd:HH:mm:ss");
        String currentDateTime = dateFormat.format(new Date());
        String headerKey = "Content-Disposition";
        String headerValue = "attachment; filename=bill_" + currentDateTime + ".pdf";
        response.setHeader(headerKey, headerValue);
        List<BillResponse> pdfResponses = billService.getBill(id);
        PdfGenerator generator = new PdfGenerator();
        return ResponseEntity.ok(generator.generate(pdfResponses, response));
    }
}
