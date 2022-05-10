package com.rd3.server.util;

import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.concurrent.Callable;

public class ReactorUtil {
  public static <T> Mono<T> fromIOCallable(Callable<T> supplier) {
    return Mono.fromCallable(supplier)
        .subscribeOn(Schedulers.boundedElastic())
        .publishOn(Schedulers.immediate());
  }
}
