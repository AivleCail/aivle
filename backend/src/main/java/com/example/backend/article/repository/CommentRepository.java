package com.example.backend.article.repository;

import com.example.backend.article.entity.Article;
import com.example.backend.article.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByArticle(Article article);
}
