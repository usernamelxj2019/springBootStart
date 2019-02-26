package com.zxy.common.base.entity;

import java.io.Serializable;

public class BaseEntity implements Serializable {

    private static final long serialVersionUID = 5041542099086992101L;
    private String id = null;
    private Long createTime = null;

    public BaseEntity() {
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Long getCreateTime() {
        return this.createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }
}
