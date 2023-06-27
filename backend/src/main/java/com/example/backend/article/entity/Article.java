package com.example.backend.article.entity;

import com.example.backend.manager.entity.Manager;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long id;

    @Column(name = "article_title", nullable = false)
    private String title;

    @Column(name = "article_body", nullable = false, columnDefinition = "TEXT")
    private String body;

    @Column(name = "article_category")
    private String category;

    @Column(name = "count")
    @ColumnDefault("0")
    private int count;

    @CreationTimestamp
    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @UpdateTimestamp
    @Column
    private LocalDateTime updatedAt = LocalDateTime.now();

    @OneToMany(mappedBy = "article")
    private List<Comment> comments = new ArrayList<>();

    @ColumnDefault("0")
    @Column(name = "like_count")
    private int likeCount;        //총 추천숫자


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id")
    private Manager manager;

    public static Article createArticle (String title, String body, String category, Manager manager) {
        Article article = new Article();
        article.title = title;
        article.body = body;
        article.category = category;
        article.manager = manager;

        return article;
    }

    public static Article changeArticle (Article article, String title, String body, String category) {
        article.title = title;
        article.body = body;
        article.category = category;

        return article;
    }

}