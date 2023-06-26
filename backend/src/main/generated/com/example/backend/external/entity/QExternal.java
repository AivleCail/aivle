package com.example.backend.external.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QExternal is a Querydsl query type for External
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExternal extends EntityPathBase<External> {

    private static final long serialVersionUID = 1293588830L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QExternal external = new QExternal("external");

    public final StringPath companyName = createString("companyName");

    public final StringPath externalAddress = createString("externalAddress");

    public final StringPath externalEnddate = createString("externalEnddate");

    public final DateTimePath<java.time.LocalDateTime> externalStartdate = createDateTime("externalStartdate", java.time.LocalDateTime.class);

    public final StringPath externalStatus = createString("externalStatus");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final com.example.backend.manager.entity.QManager manager;

    public final StringPath receiptContent = createString("receiptContent");

    public final DateTimePath<java.time.LocalDateTime> receiptDate = createDateTime("receiptDate", java.time.LocalDateTime.class);

    public QExternal(String variable) {
        this(External.class, forVariable(variable), INITS);
    }

    public QExternal(Path<? extends External> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QExternal(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QExternal(PathMetadata metadata, PathInits inits) {
        this(External.class, metadata, inits);
    }

    public QExternal(Class<? extends External> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.manager = inits.isInitialized("manager") ? new com.example.backend.manager.entity.QManager(forProperty("manager")) : null;
    }

}

