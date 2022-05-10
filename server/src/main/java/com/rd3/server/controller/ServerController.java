package com.rd3.server.controller;

import com.rd3.server.controller.request.SaveServerRequest;
import com.rd3.server.controller.response.BaseResponse;
import com.rd3.server.controller.response.BaseResponseCode;
import com.rd3.server.controller.response.BaseResponseMsg;
import com.rd3.server.entity.JServer;
import com.rd3.server.service.ServerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/server")
public class ServerController {
  private final ServerService serverService;

  @PostMapping("/save")
  private Mono<BaseResponse<String>> save(@RequestBody SaveServerRequest request) {
    return serverService.saveServer(request).then(Mono.just(BaseResponse.successStatus()));
  }

  @PostMapping("/update/{uid}")
  private Mono<BaseResponse<String>> update(
      @PathVariable String uid, @RequestBody SaveServerRequest request) {
    return serverService.updateServer(uid, request).then(Mono.just(BaseResponse.successStatus()));
  }

  @PostMapping("/archive/{uid}")
  private Mono<BaseResponse<String>> delete(@PathVariable String uid) {
    return serverService.deleteServer(uid).then(Mono.just(BaseResponse.successStatus()));
  }

  @GetMapping("/{uid}")
  private Mono<BaseResponse<JServer>> getServer(@PathVariable String uid) {
    return serverService
        .findServer(uid)
        .map(
            jServer -> {
              BaseResponse<JServer> response = new BaseResponse<>();
              response.setCode(BaseResponseCode.SUCCESS.getValue());
              response.setMsg(BaseResponseMsg.SUCCESS.getValue());
              response.setPayload(jServer);
              return response;
            });
  }
}
