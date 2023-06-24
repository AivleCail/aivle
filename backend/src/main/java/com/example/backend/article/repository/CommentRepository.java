package com.example.backend.article.repository;

import com.example.backend.article.entity.Article;
import com.example.backend.article.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findAllByArticle(Article article);

    // Query문을 통해 articleId에 따른 댓글 전체 삭제
    @Modifying
    @Query("DELETE FROM Comment c WHERE c.article.id = :articleId")
    void deleteAllByArticleId(@Param("articleId") Long articleId);

}
