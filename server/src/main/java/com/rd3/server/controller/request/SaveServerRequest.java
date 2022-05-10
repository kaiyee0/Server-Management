package com.rd3.server.controller.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveServerRequest {
  @JsonProperty("service_id")
  private String serviceId;

  @JsonProperty("server_url")
  private String serverUrl;

  @JsonProperty("server_env")
  private String serverEnv;

  @JsonProperty("server_type")
  private Integer serverType;

  @JsonProperty("login_account")
  private String loginAccount;

  @JsonProperty("login_password")
  private String loginPassword;

  @JsonProperty("login_protocol")
  private String loginProtocol;

  @JsonProperty("remark")
  private String remark;
}
