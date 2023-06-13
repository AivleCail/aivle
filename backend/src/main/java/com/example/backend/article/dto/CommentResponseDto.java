package com.example.backend.article.dto;

import com.example.backend.article.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponseDto {
    private long commentId;
    private String managerName;
    private String commentText;
    private Long createdAt;
    private boolean isWritten;

    public static CommentResponseDto of(Comment comment, boolean bool) {
        return CommentResponseDto.builder()
                .commentId(comment.getId())
                .managerName(comment.getManager().getName())
                .commentText(comment.getText())
                .createdAt(Timestamp.valueOf(comment.getCreatedAt()).getTime())
                .isWritten(bool)
                .build();
    }
}
