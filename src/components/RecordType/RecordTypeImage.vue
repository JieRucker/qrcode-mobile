<style lang="scss">
  .recordTypeImage {
    li {
      list-style: none;
    }
  }

</style>

<template>
  <div class="recordTypeImage">
    <!-- 上传图片 -->
      <ModuleUploader class="uploader"
                      :max="9"
                      :handle-click="false"
                      :show-header="true"
                      :title="params.recordTitle"
                      :readonly="false"
                      :auto-upload="false"
                      name="img"
                      size="normal"
                      @preview="previewMethod"
                      @add-image="addImageMethod"
                      @remove-image="removeImageMethod"
                      @returnImageList="returnImageList"
      ></ModuleUploader>
  </div>
</template>

<script>
  // 引入组件
  import ModuleUploader from '@/components/ModuleUploader/ModuleUploader'
  import {Cell, Group, XButton} from 'vux'

  export default {
    name: "recordTypeImage",
    components: {ModuleUploader, XButton, Group, Cell},
    props: {
      params: {
        default: () => {
          return {
            recordTitle: '现场照片',
            recordDesc: '',
            imageCfg: {
              uploadType: 0,
              waterMark: []
            }
          }
        }
      }

    },
    data() {
      return {
        mediaId: '',
      }
    },
    computed: {},
    mounted() {
    },
    methods: {
      previewMethod() {
      },
      addImageMethod() {
        console.log('addImageMethod');
      },
      removeImageMethod() {
      },
      returnImageList(res) {
        this.mediaId = JSON.stringify(res);
        // alert(JSON.stringify(this.mediaId));
        this.$store.commit('saveRecordData', {
          sortId: this.params.sortId,
          data: {imageMediaId: this.mediaId},
        })
      },

    }

  }
</script>
