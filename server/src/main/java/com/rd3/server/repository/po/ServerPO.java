package com.rd3.server.repository.po;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ServerPO {
  private String serviceId;
  private String serverId;
  private String serverUrl;
  private String serverEnv;
  private Integer serverType;
  private String loginAccount;
  private String loginPassword;
  private String loginProtocol;
  private String remark;
  private boolean isDelete;
  private Date createAt;
  private Date updateAt;
}
