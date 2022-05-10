package com.rd3.server.repository.po;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ServicePO {
  private String serviceId;
  private String serviceName;
  private String serviceOwner;
  private String remark;
  private boolean isDelete;
  private Date createAt;
  private Date updateAt;
}
