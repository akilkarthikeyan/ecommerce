package com.example.ecommerce.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR)
public class MissingDataException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public MissingDataException(String message) {
        super(message);
    }
}