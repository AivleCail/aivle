package com.example.backend.voc.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVoc is a Querydsl query type for Voc
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVoc extends EntityPathBase<Voc> {

    private static final long serialVersionUID = -1061230226L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVoc voc = new QVoc("voc");

    public final StringPath customerAddress = createString("customerAddress");

    public final StringPath customerName = createString("customerName");

    public final StringPath customerPhone = createString("customerPhone");

    public final DateTimePath<java.time.LocalDateTime> date = createDateTime("date", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.backend.manager.entity.QManager manager;

    public final StringPath opinion = createString("opinion");

    public final StringPath percentage = createString("percentage");

    public final StringPath status = createString("status");

    public final StringPath statusDetail = createString("statusDetail");

    public final StringPath type = createString("type");

    public final StringPath vocEntire = createString("vocEntire");

    public QVoc(String variable) {
        this(Voc.class, forVariable(variable), INITS);
    }

    public QVoc(Path<? extends Voc> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVoc(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVoc(PathMetadata metadata, PathInits inits) {
        this(Voc.class, metadata, inits);
    }

    public QVoc(Class<? extends Voc> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.manager = inits.isInitialized("manager") ? new com.example.backend.manager.entity.QManager(forProperty("manager")) : null;
    }

}

