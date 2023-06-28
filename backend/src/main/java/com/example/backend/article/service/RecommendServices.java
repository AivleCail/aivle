package com.example.backend.article.service;


import com.example.backend.article.dto.RecommendsDTO;
import com.example.backend.article.entity.Article;
import com.example.backend.article.entity.Recommend;
import com.example.backend.article.repository.ArticleRepository;
import com.example.backend.article.repository.RecommendsRepository;
import com.example.backend.manager.entity.Manager;
import com.example.backend.manager.repository.ManagerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;



@Service
@RequiredArgsConstructor
public class RecommendServices {

    private final RecommendsRepository recommendsRepository;
    private final ManagerRepository managerRepository;
    private final ArticleRepository articleRepository;

    @Transactional
    public void insert(RecommendsDTO recommendsDTO) {

        Manager manager = managerRepository.findById(recommendsDTO.getManagerId())
                .orElseThrow(() -> new NotFoundException("Could not found member id : " + recommendsDTO.getManagerId()));

        Article article = articleRepository.findById(recommendsDTO.getArticleId())
                .orElseThrow(() -> new NotFoundException("Could not found board id : " + recommendsDTO.getManagerId()));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            throw new RuntimeException("Recommendation not found for the given user and article.");
        } else {
            Recommend existingRecommend = recommendsRepository.findByManagerAndArticle(manager, article);
            if (existingRecommend != null) {
                //recommendsRepository.delete(existingRecommend);
                //article.setLikeCount(article.getLikeCount() - 1);
                //article.setLikeCount(recommendsDTO.getLikeCount());
                return ;
            } else {
                Recommend recommend = Recommend.builder()
                        .article(article)
                        .manager(manager)
                        .counts(1)
                        .build();

                recommendsRepository.save(recommend);
                //article.setLikeCount(article.getLikeCount() + 1);
                article.setLikeCount(recommendsDTO.getLikeCount());
            }
        }


    }

    @Transactional
    public void delete(RecommendsDTO recommendsDTO) {

        Manager manager = managerRepository.findById(recommendsDTO.getManagerId())
                .orElseThrow(() -> new NotFoundException("Could not found member id : " + recommendsDTO.getManagerId()));

        Article article = articleRepository.findById(recommendsDTO.getArticleId())
                .orElseThrow(() -> new NotFoundException("Could not found board id : " + recommendsDTO.getManagerId()));


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            throw new RuntimeException("Recommendation not found for the given user and article.");
        } else {
            Recommend existingRecommend = recommendsRepository.findByManagerAndArticle(manager, article);
            if (existingRecommend != null) {
                recommendsRepository.delete(existingRecommend);
                //article.setLikeCount(article.getLikeCount() - 1);
                article.setLikeCount(recommendsDTO.getLikeCount());
            } else {
                throw new RuntimeException("Recommendation not found for the given user and article.");
            }
        }
    }
    @Transactional
    public boolean hasRecommendation(Long managerId, Long articleId){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
            throw new RuntimeException("Recommendation not found for the given user and article.");
        }
        return  recommendsRepository.findArticleId(managerId, articleId);
    }
}
