package com.rd3.server.service.impl;

import com.rd3.server.controller.request.SaveServerRequest;
import com.rd3.server.entity.JServer;
import com.rd3.server.repository.ServerRepository;
import com.rd3.server.repository.po.ServerPO;
import com.rd3.server.service.ServerService;
import com.rd3.server.util.IdUtil;
import com.rd3.server.util.ReactorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@Slf4j
@RequiredArgsConstructor
public class ServerServiceImpl implements ServerService {
  private final ServerRepository serverRepository;

  @Override
  public Mono<Void> saveServer(SaveServerRequest request) {
    return Mono.just(request)
        .map(
            serverRequest ->
                ServerPO.builder()
                    .serviceId(serverRequest.getServiceId())
                    .serverId(IdUtil.uuid())
                    .serverUrl(serverRequest.getServerUrl())
                    .serverEnv(serverRequest.getServerEnv())
                    .serverType(serverRequest.getServerType())
                    .loginAccount(serverRequest.getLoginAccount())
                    .loginPassword(serverRequest.getLoginPassword())
                    .loginProtocol(serverRequest.getLoginProtocol())
                    .remark(serverRequest.getRemark())
                    .build())
        .map(serverPO -> ReactorUtil.fromIOCallable(() -> serverRepository.save(serverPO)))
        .flatMap(Mono::then);
  }

  @Override
  public Mono<Void> updateServer(String uid, SaveServerRequest request) {
    return Mono.just(request)
        .map(
            serverRequest ->
                ServerPO.builder()
                    .serviceId(serverRequest.getServiceId())
                    .serverId(uid)
                    .serverUrl(serverRequest.getServerUrl())
                    .serverEnv(serverRequest.getServerEnv())
                    .serverType(serverRequest.getServerType())
                    .loginAccount(serverRequest.getLoginAccount())
                    .loginPassword(serverRequest.getLoginPassword())
                    .loginProtocol(serverRequest.getLoginProtocol())
                    .remark(serverRequest.getRemark())
                    .build())
        .map(serverPO -> ReactorUtil.fromIOCallable(() -> serverRepository.updateById(serverPO)))
        .flatMap(Mono::then);
  }

  @Override
  public Mono<Void> deleteServer(String uid) {
    return Mono.just(uid)
        .map(serverId -> ReactorUtil.fromIOCallable(() -> serverRepository.deleteById(serverId)))
        .flatMap(Mono::then);
  }

  @Override
  public Mono<JServer> findServer(String uid) {
    return ReactorUtil.fromIOCallable(() -> serverRepository.findById(uid))
        .map(
            serverPO ->
                JServer.builder()
                    .serviceId(serverPO.getServiceId())
                    .serverId(serverPO.getServerId())
                    .serverUrl(serverPO.getServerUrl())
                    .serverEnv(serverPO.getServerEnv())
                    .serverType(serverPO.getServerType())
                    .loginAccount(serverPO.getLoginAccount())
                    .loginPassword(serverPO.getLoginPassword())
                    .loginProtocol(serverPO.getLoginProtocol())
                    .remark(serverPO.getRemark())
                    .createAt(serverPO.getCreateAt())
                    .updateAt(serverPO.getUpdateAt())
                    .build());
  }
}
