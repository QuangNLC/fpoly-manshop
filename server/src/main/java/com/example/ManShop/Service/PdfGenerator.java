package com.example.ManShop.Service;

import com.example.ManShop.DTOS.BillResponse;

import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.CMYKColor;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;

public class PdfGenerator {
    public List<BillResponse> generate(List<BillResponse> billResponseList,
                                       HttpServletResponse response) throws DocumentException, IOException {
        Document document = new Document(PageSize.A5);
        PdfWriter.getInstance(document, response.getOutputStream());
        document.open();

        Font fontTitle = FontFactory.getFont(FontFactory.TIMES_ITALIC);
        fontTitle.setSize(30);

        Paragraph paragraph1 = new Paragraph("Hoá Đơn Bán Hàng", fontTitle);
        paragraph1.setAlignment(Paragraph.ALIGN_CENTER);
        document.add(paragraph1);

        PdfPTable table = new PdfPTable(6);
        table.setWidthPercentage(100f);
        table.setWidths(new int[]{3, 3, 3, 3, 3, 3});
        table.setSpacingBefore(5);

        PdfPCell cell = new PdfPCell();
        cell.setBackgroundColor(CMYKColor.gray);
        cell.setPadding(5);
        Font font = FontFactory.getFont(FontFactory.TIMES);
        font.setColor(CMYKColor.BLACK);
        cell.setPhrase(new Phrase("Họ Và Tên", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Số Điện Thoại", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Tên Sản Phẩm", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Tổng Giá", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Số Lượng", font));
        table.addCell(cell);
        cell.setPhrase(new Phrase("Ngày", font));
        table.addCell(cell);

        for (BillResponse bill : billResponseList) {
            table.addCell(bill.getUsers().getFullname());
            table.addCell(bill.getUsers().getPhone());
            table.addCell(bill.getProduct().getName());
            table.addCell(String.valueOf(bill.getOrderDetail().getTotal_price()));
            table.addCell(String.valueOf(bill.getOrderDetail().getQuantity()));
            table.addCell(String.valueOf(bill.getOrder().getOrder_date()));
        }
        document.add(table);
        document.close();
        return billResponseList;
    }
}
