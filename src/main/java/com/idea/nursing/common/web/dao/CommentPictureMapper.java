package com.idea.nursing.common.web.dao;

import com.idea.nursing.common.web.domain.pojo.CommentPicture;
import com.idea.nursing.common.web.domain.pojo.CommentPictureExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CommentPictureMapper {
    int countByExample(CommentPictureExample example);

    int deleteByExample(CommentPictureExample example);

    int deleteByPrimaryKey(Long id);

    int insert(CommentPicture record);

    int insertSelective(CommentPicture record);

    List<CommentPicture> selectByExample(CommentPictureExample example);

    CommentPicture selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") CommentPicture record, @Param("example") CommentPictureExample example);

    int updateByExample(@Param("record") CommentPicture record, @Param("example") CommentPictureExample example);

    int updateByPrimaryKeySelective(CommentPicture record);

    int updateByPrimaryKey(CommentPicture record);
}