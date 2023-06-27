package com.example.backend.article.repository;


import com.example.backend.article.entity.Article;
import com.example.backend.article.entity.Recommend;
import com.example.backend.manager.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RecommendsRepository extends JpaRepository<Recommend, Long> {
    Recommend findByManagerAndArticle(Manager manager, Article article);

    // 매니저 아이디와 게시글이 같은게 있는지 있으면 T
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Recommend r WHERE r.manager.id = :managerId and r.article.id = :articleId")
    boolean findArticleId(@Param("managerId") Long managerId ,@Param("articleId") Long articleId);



}
