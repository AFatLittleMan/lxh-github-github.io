<!-- <template>
    <div>
        <el-upload
        class="avatar-uploader"
        action="http://192.168.10.181:8001/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
            <video v-if="imageUrl"  class="avatar">
              <source :src="imageUrl">
            </video>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageUrl: ''
        }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
  // 允许的文件类型：JPG图片和MP4视频
  const isJPG = file.type === 'image/jpeg';
  const isMP4 = file.type === 'video/mp4';
  
  // 设置文件大小限制，例如50MB（50 * 1024 * 1024 字节）
  const maxSizeMB = 50;
  const isLtMaxSize = file.size / (1024 * 1024) < maxSizeMB;
 
  if (!isJPG && !isMP4) {
    this.$message.error('上传文件只能是 JPG 图片或 MP4 视频格式!');
  }
  if (!isLtMaxSize) {
    this.$message.error(`上传文件大小不能超过 ${maxSizeMB}MB!`);
  }
 
  // 返回是否满足条件：是JPG图片或MP4视频，并且文件大小在限制范围内
  return isJPG || (isMP4 && isLtMaxSize);
}
    }
}
</script>

<style lang="scss" scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style> -->

<template>
  <div>
    <el-upload
     class="avatar-uploader"
     action="http://192.168.10.181:8001/api/upload"
     
     v-bind:on-progress="uploadVideoProcess"
     v-bind:on-success="handleVideoSuccess"
     v-bind:before-upload="beforeUploadVideo"
     v-bind:show-file-list="false"
     >
     <video v-for="(item,index) in videoForm.showVideoPath"
     v-if="videoForm.showVideoPath != [] && !videoFlag"
     v-bind:src="item" 
     class="avatar video-avatar"
     controls="controls">
     您的浏览器不支持视频播放
      </video>
      <div v-for="(item,index) in videoForm.showImgPath"
        v-if="videoForm.showImgPath != [] && !videoFlag">
          <img :src="item" alt="">
      </div>
     <i
     class="el-icon-plus avatar-uploader-icon"
     ></i>
     <!-- <el-progress v-if="videoFlag == true" type="circle"
     v-bind:percentage="videoUploadPercent"
     style="margin-top: 7px"></el-progress> -->
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      videoFlag: false,
      //是否显示进度条
      videoUploadPercent: "",
      //进度条的进度，
      isShowUploadVideo: false,
      //显示上传按钮
      videoForm: {
        showVideoPath:[],  //视频回显的变量
        showImgPath:[]  //图片
      },
    };
  },
  methods: {
     //上传前回调
     beforeUploadVideo(file) {
      var fileSize = file.size / 1024 / 1024 < 50;   //控制大小  修改50的值即可
      // if (
      //   [
      //     "video/mp4",
      //     "video/ogg",
      //     "video/flv",
      //     "video/avi",
      //     "video/wmv",
      //     "video/rmvb",
      //     "video/mov",
      //     "image/jpg"
      //   ].indexOf(file.type) == -1     //控制格式
      // ) {
      //   layer.msg("请上传正确的视频格式");
      //   return false;
      // }
      // if (!fileSize) {
      //   layer.msg("视频大小不能超过50MB");
      //   return false;
      // }
      this.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {    //注意在data中添加对应的变量名
      this.videoFlag = true;  
      this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.isShowUploadVideo = true;
      this.videoFlag = false;
      this.videoUploadPercent = 0;
 
      console.log(res,file);
      // if(file.raw.type.startsWith('video/')) {
      //   this.videoForm.showVideoPath.push(res.link) 
      // }else if (file.raw.type.startsWith('image/')) {
      //   this.videoForm.showImgPath.push(res.link) 
      // }
      
      // //后台上传数据
      // if (res.success == true) {  
      //   this.videoForm.showVideoPath = res.data.url;    //上传成功后端返回视频地址 回显
      // } else {
      //   this.$message.error("上传失败！");
      // }
    },
  }
};
</script>
<style>
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
  display: flex !important;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 200px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 200px;
  height: 178px;
  display: block;
  display: flex;
}
</style>