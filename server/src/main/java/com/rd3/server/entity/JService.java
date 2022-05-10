package com.rd3.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
public class JService {
  private String serviceId;
  private String serviceName;
  private String serviceOwner;
  private String remark;
  private Date createAt;
  private Date updateAt;
}
