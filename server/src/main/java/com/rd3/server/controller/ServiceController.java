package com.rd3.server.controller;

import com.rd3.server.controller.request.SaveServiceRequest;
import com.rd3.server.controller.response.BaseResponse;
import com.rd3.server.controller.response.BaseResponseCode;
import com.rd3.server.controller.response.BaseResponseMsg;
import com.rd3.server.entity.JService;
import com.rd3.server.entity.JServiceDetail;
import com.rd3.server.service.ServiceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/service")
public class ServiceController {
  private final ServiceService serviceService;

  @PostMapping("/save")
  private Mono<BaseResponse<String>> save(@RequestBody SaveServiceRequest request) {
    return serviceService.saveService(request).then(Mono.just(BaseResponse.successStatus()));
  }

  @PostMapping("/update/{uid}")
  private Mono<BaseResponse<String>> update(
      @PathVariable String uid, @RequestBody SaveServiceRequest request) {
    return serviceService.updateService(uid, request).then(Mono.just(BaseResponse.successStatus()));
  }

  @PostMapping("/archive/{uid}")
  private Mono<BaseResponse<String>> delete(@PathVariable String uid) {
    return serviceService.deleteService(uid).then(Mono.just(BaseResponse.successStatus()));
  }

  @GetMapping("")
  private Mono<Object> index() {
    return serviceService
        .getAllService()
        .collectList()
        .map(
            jServices -> {
              log.info(jServices.toString());
              BaseResponse<Object> response = new BaseResponse<>();
              response.setCode(BaseResponseCode.SUCCESS.getValue());
              response.setMsg(BaseResponseMsg.SUCCESS.getValue());
              response.setPayload(jServices);
              return response;
            });
  }

  @GetMapping("/{uid}")
  private Mono<BaseResponse<JService>> getService(@PathVariable String uid) {
    return serviceService
        .findService(uid)
        .map(
            jService -> {
              BaseResponse<JService> response = new BaseResponse<>();
              response.setCode(BaseResponseCode.SUCCESS.getValue());
              response.setMsg(BaseResponseMsg.SUCCESS.getValue());
              response.setPayload(jService);
              return response;
            });
  }

  @GetMapping("/{uid}/detail")
  private Mono<BaseResponse<JServiceDetail>> getServiceDetail(@PathVariable String uid) {
    return serviceService
        .findServiceDetail(uid)
        .map(
            jServiceDetail -> {
              BaseResponse<JServiceDetail> response = new BaseResponse<>();
              response.setCode(BaseResponseCode.SUCCESS.getValue());
              response.setMsg(BaseResponseMsg.SUCCESS.getValue());
              response.setPayload(jServiceDetail);
              return response;
            });
  }
}
