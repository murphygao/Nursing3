package com.idea.nursing.bed.web.dao;

import com.idea.nursing.bed.web.domain.pojo.Room;
import com.idea.nursing.bed.web.domain.pojo.RoomExample;
import com.idea.nursing.core.generic.GenericDao;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface RoomMapper extends GenericDao {
    int countByExample(RoomExample example);

    int deleteByExample(RoomExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Room record);

    int insertSelective(Room record);

    List<Room> selectByExample(RoomExample example);

    Room selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") Room record, @Param("example") RoomExample example);

    int updateByExample(@Param("record") Room record, @Param("example") RoomExample example);

    int updateByPrimaryKeySelective(Room record);

    int updateByPrimaryKey(Room record);
}