package com.rd3.server.controller.response;

public enum BaseResponseMsg {
  SUCCESS("Success"),
  INTERNAL_SERVER_ERROR("internal server error");

  BaseResponseMsg(String value) {
    this.value = value;
  }

  String value;

  public String getValue() {
    return value;
  }
}
