package com.rd3.server.service.impl;

import com.rd3.server.controller.request.SaveServiceRequest;
import com.rd3.server.entity.JServer;
import com.rd3.server.entity.JService;
import com.rd3.server.entity.JServiceDetail;
import com.rd3.server.repository.ServerRepository;
import com.rd3.server.repository.ServiceRepository;
import com.rd3.server.repository.po.ServerPO;
import com.rd3.server.repository.po.ServicePO;
import com.rd3.server.service.ServiceService;
import com.rd3.server.util.IdUtil;
import com.rd3.server.util.ReactorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ServiceServiceImpl implements ServiceService {
  private final ServiceRepository serviceRepository;
  private final ServerRepository serverRepository;

  @Override
  public Mono<Void> saveService(SaveServiceRequest request) {
    return Mono.just(request)
        .map(
            serviceRequest ->
                ServicePO.builder()
                    .serviceId(IdUtil.uuid())
                    .serviceName(serviceRequest.getServiceName())
                    .serviceOwner(serviceRequest.getServiceOwner())
                    .remark(serviceRequest.getRemark())
                    .build())
        .map(servicePO -> ReactorUtil.fromIOCallable(() -> serviceRepository.save(servicePO)))
        .flatMap(Mono::then);
  }

  @Override
  public Mono<Void> updateService(String uid, SaveServiceRequest request) {
    return Mono.just(request)
        .map(
            serviceRequest ->
                ServicePO.builder()
                    .serviceId(uid)
                    .serviceName(serviceRequest.getServiceName())
                    .serviceOwner(serviceRequest.getServiceOwner())
                    .remark(serviceRequest.getRemark())
                    .build())
        .map(
            servicePO -> ReactorUtil.fromIOCallable(() -> serviceRepository.updateByUid(servicePO)))
        .flatMap(Mono::then);
  }

  @Override
  public Mono<Void> deleteService(String uid) {
    //    return ReactorUtil.fromIOCallable(() -> serviceRepository.deleteByUid(uid)).then();
    return ReactorUtil.fromIOCallable(() -> serviceRepository.deleteByUid(uid))
        .then(ReactorUtil.fromIOCallable(() -> serverRepository.deleteAllByServiceId(uid)))
        .then();
  }

  @Override
  public Flux<JService> getAllService() {
    return ReactorUtil.fromIOCallable(serviceRepository::findAllService)
        .map(
            servicePOs -> {
              log.info(servicePOs.toString());
              return servicePOs.stream()
                  .map(this::servicePOToJService)
                  .collect(Collectors.toList());
            })
        .flatMapMany(Flux::fromIterable);
  }

  @Override
  public Mono<JService> findService(String uid) {
    return ReactorUtil.fromIOCallable(() -> serviceRepository.findServiceById(uid))
        .map(this::servicePOToJService);
  }

  @Override
  public Mono<JServiceDetail> findServiceDetail(String uid) {
    Mono<JService> jService =
        ReactorUtil.fromIOCallable(() -> serviceRepository.findServiceById(uid))
            .map(this::servicePOToJService);
    Mono<List<JServer>> jServerList =
        ReactorUtil.fromIOCallable(() -> serverRepository.findServersByServiceId(uid))
            .map(
                serverPOS ->
                    serverPOS.stream().map(this::serverPOToJServer).collect(Collectors.toList()));
    return Mono.zip(jService, jServerList)
        .map(
            tuple ->
                JServiceDetail.builder()
                    .serviceId(tuple.getT1().getServiceId())
                    .serviceName(tuple.getT1().getServiceName())
                    .serviceOwner(tuple.getT1().getServiceOwner())
                    .remark(tuple.getT1().getRemark())
                    .createAt(tuple.getT1().getCreateAt())
                    .updateAt(tuple.getT1().getUpdateAt())
                    .serverList(tuple.getT2())
                    .build());
  }

  private JService servicePOToJService(ServicePO servicePO) {
    return JService.builder()
        .serviceId(servicePO.getServiceId())
        .serviceName(servicePO.getServiceName())
        .serviceOwner(servicePO.getServiceOwner())
        .remark(servicePO.getRemark())
        .createAt(servicePO.getCreateAt())
        .updateAt(servicePO.getUpdateAt())
        .build();
  }

  private JServer serverPOToJServer(ServerPO serverPO) {
    return JServer.builder()
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
        .build();
  }
}
