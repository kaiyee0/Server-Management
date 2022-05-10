package com.rd3.server.service;

import com.rd3.server.controller.request.SaveServiceRequest;
import com.rd3.server.entity.JService;
import com.rd3.server.entity.JServiceDetail;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ServiceService {
  Mono<Void> saveService(SaveServiceRequest request);

  Mono<Void> updateService(String uid, SaveServiceRequest request);

  Mono<Void> deleteService(String uid);

  Flux<JService> getAllService();

  Mono<JService> findService(String uid);

  Mono<JServiceDetail> findServiceDetail(String uid);
}
