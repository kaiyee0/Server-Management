package com.rd3.server.repository;

import com.rd3.server.repository.po.ServicePO;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ServiceRepository {
  @Insert(
      "INSERT INTO service_tab "
          + " (service_id, service_name, service_owner, remark )"
          + " VALUES"
          + " (#{serviceId}, #{serviceName}, #{serviceOwner}, #{remark}) ")
  @Options(useGeneratedKeys = true)
  int save(ServicePO servicePO);

  @Update(
      " UPDATE service_tab SET service_name = #{serviceName} "
          + " , service_owner = #{serviceOwner}, remark = #{remark}"
          + " WHERE service_id = #{serviceId} ")
  int updateByUid(ServicePO servicePO);

  @Update(" UPDATE service_tab SET is_delete = 1 WHERE service_id = #{serviceId} ")
  int deleteByUid(@Param("serviceId") String uid);

  @Select(" SELECT * FROM service_tab WHERE is_delete = 0")
  List<ServicePO> findAllService();

  @Select(" SELECT * FROM service_tab WHERE service_id = #{serviceId} ")
  ServicePO findServiceById(@Param("serviceId") String uid);
}
