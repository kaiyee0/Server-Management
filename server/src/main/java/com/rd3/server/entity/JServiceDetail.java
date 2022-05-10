package com.rd3.server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class JServiceDetail {
  private String serviceId;
  private String serviceName;
  private String serviceOwner;
  private String remark;
  private Date createAt;
  private Date updateAt;
  private List<JServer> serverList;
}
