package com.rd3.server.repository;

import com.rd3.server.repository.po.ServerPO;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface ServerRepository {
  @Insert(
      " INSERT INTO service_server_tab "
          + " ( service_id, server_id, server_url, server_env, server_type, login_account, login_password, login_protocol, remark )"
          + " VALUES"
          + " ( #{serviceId}, #{serverId}, #{serverUrl}, #{serverEnv}, #{serverType}, #{loginAccount}, #{loginPassword}, #{loginProtocol}, #{remark} )")
  @Options(useGeneratedKeys = true)
  int save(ServerPO serverPO);

  @Update(
      " UPDATE service_server_tab "
          + " SET service_id = #{serviceId}, server_url = #{serverUrl}, server_env = #{serverEnv}, server_type = #{serverType}, "
          + " login_account = #{loginAccount},  login_password = #{loginPassword}, login_protocol = #{loginProtocol}, remark = #{remark} "
          + " WHERE server_id = #{serverId} ")
  int updateById(ServerPO serverPO);

  @Update(" UPDATE service_server_tab SET is_delete = 1 WHERE server_id = #{serverId} ")
  int deleteById(@Param("serverId") String serverId);

  @Select(" SELECT * FROM service_server_tab WHERE server_id = #{serverId} and is_delete = 0 ")
  ServerPO findById(@Param("serverId") String uid);

  @Select(" SELECT * FROM service_server_tab WHERE service_id = #{serviceId} and is_delete = 0 ")
  List<ServerPO> findServersByServiceId(@Param("serviceId") String uid);

  @Update(" UPDATE service_server_tab SET is_delete = 1 WHERE service_id = #{serviceId} ")
  int deleteAllByServiceId(@Param("serviceId") String uid);
}
