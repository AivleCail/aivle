package com.example.backend.article.controller;

import com.example.backend.article.dto.CommentRequestDto;
import com.example.backend.article.dto.CommentResponseDto;
import com.example.backend.article.dto.MessageDto;
import com.example.backend.article.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/list")
    public ResponseEntity<List<CommentResponseDto>> getComments(@RequestParam(name = "id") Long id) {
        return ResponseEntity.ok(commentService.getComment(id));
    }

    @PostMapping("/")
    public ResponseEntity<CommentResponseDto> postComment(@RequestBody CommentRequestDto request) {
        return ResponseEntity.ok(commentService.createComment(request.getId(), request.getText()));
    }

    @DeleteMapping("/one")
    public ResponseEntity<MessageDto> deleteComment(@RequestParam(name = "id") Long id) {
        commentService.removeComment(id);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
}
