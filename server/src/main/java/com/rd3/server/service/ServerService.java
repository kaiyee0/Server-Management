package com.rd3.server.service;

import com.rd3.server.controller.request.SaveServerRequest;
import com.rd3.server.entity.JServer;
import reactor.core.publisher.Mono;

public interface ServerService {
  Mono<Void> saveServer(SaveServerRequest request);

  Mono<Void> updateServer(String uid, SaveServerRequest request);

  Mono<Void> deleteServer(String uid);

  Mono<JServer> findServer(String uid);
}
