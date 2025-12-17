package org.mah.gestionFactures.controllers;

import java.util.Map;

import org.mah.gestionFactures.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailTestController {

    @Autowired
    private EmailService emailService;

    @CrossOrigin
    @GetMapping("/test-email/{email}")
    public String sendTestEmail(@PathVariable String email) {
        emailService.sendEmail(
                email,
                "Test Email from Spring Boot",
                "If you see this, the email system works!"
        );
        return "Email sent to: " + email;
    }
    @CrossOrigin
    @PostMapping("/send-email")
    public String sendEmail(@RequestBody Map<String, String> payload) {

        String to = payload.get("to");           // recipient email
        String subject = payload.get("subject"); // custom subject
        String body = payload.get("body");       // custom body

        emailService.sendEmail(to, subject, body);

        return "Email sent to: " + to;
    }


}
