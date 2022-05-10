package com.rd3.server.controller.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SaveServiceRequest {
  @JsonProperty("service_name")
  private String serviceName;

  @JsonProperty("service_owner")
  private String serviceOwner;

  @JsonProperty("remark")
  private String remark;
}
