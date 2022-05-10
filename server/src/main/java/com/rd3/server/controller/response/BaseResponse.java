package com.rd3.server.controller.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import reactor.core.publisher.Mono;

@Data
public class BaseResponse<T> {
  @JsonProperty("Result")
  private String code;

  @JsonProperty("Message")
  private String msg;

  @JsonProperty("ResultObject")
  private T payload;

  public static <T> BaseResponse<T> successStatus() {
    BaseResponse<T> response = new BaseResponse<T>();
    response.setCode(BaseResponseCode.SUCCESS.getValue());
    response.setMsg(BaseResponseMsg.SUCCESS.getValue());
    return response;
  }

  public static <T> Mono<BaseResponse<T>> withData(T data) {
    BaseResponse<T> response = new BaseResponse<T>();
    response.setCode(BaseResponseCode.SUCCESS.getValue());
    response.setMsg(BaseResponseMsg.SUCCESS.getValue());
    response.setPayload(data);
    return Mono.just(response);
  }

  //  public static <T> BaseResponse<T> withData(T data) {
  //    BaseResponse<T> response = new BaseResponse<T>();
  //    response.setCode(BaseResponseCode.SUCCESS.getValue());
  //    response.setMsg(BaseResponseMsg.SUCCESS.getValue());
  //    response.setPayload(data);
  //    return response;
  //  }

  public static <T> BaseResponse<T> failure(String code, String msg) {
    BaseResponse<T> response = new BaseResponse<T>();
    response.setCode(code);
    response.setMsg(msg);
    return response;
  }
}
