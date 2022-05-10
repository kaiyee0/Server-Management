package com.rd3.server.controller.response;

public enum BaseResponseCode {
  SUCCESS("200"),
  INTERNAL_SERVER_ERROR("999");

  BaseResponseCode(String value) {
    this.value = value;
  }

  String value;

  public String getValue() {
    return value;
  }
}
