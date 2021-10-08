<template>
  <div class="photo-uploader">
    <div
      class="photo-uploader__wrapper"
      :class="{ 'photo-uploader__wrapper--drag': isDragStarted }"
    >
      <input
        ref="input"
        class="photo-uploader__input"
        type="file"
        @change="uploadFile"
        @dragenter="isDragStarted = true"
        @dragleave="isDragStarted = false"
      >
      {{ isDragStarted ? '' : uploadText }}
      <img class="photo-select" v-if="modelValue" :src="showSelectImage" alt="Изображение викторины" @click="changeImage">
      <button class="btn-delete" v-if="modelValue" @click.stop="removePhoto">
          <i class="far fa-trash-alt"></i>
      </button>
      <img
        v-show="isDragStarted"
        src="@/assets/images/upload.svg"
        class="photo-uploader__icon"
        alt="Загрузите фото"
      >
    </div>
  </div>
</template>

<script>

export default {
    data: () => ({ isDragStarted: false }),
    props: {
        modelValue: {
            required: true,
        }
    },
    emits: ['update:modelValue'],
    computed: {
        uploadText() {
            return this.isDragStarted ? '' : this.modelValue ? '' : 'Перетащите или нажмите здесь, чтобы загрузить';
        },
        showSelectImage() {
            return typeof this.modelValue == 'string' ? this.modelValue : this.getSrc(this.modelValue);
        }
    },
    methods: {
        uploadFile({ currentTarget }) {
            if (currentTarget.files) {
                this.$emit('update:modelValue', currentTarget.files[0]);
            }
            
            this.isDragStarted = false;
        },
        changeImage() {
            this.removePhoto();
            this.$refs.input.click();
        },
        removePhoto() {
            this.$emit('update:modelValue', null);
        },
        getSrc(photo) {
            return URL.createObjectURL(photo);
        },
    }
}


// import {
//   computed,
//   defineComponent,
//   ref,
//   toRefs,
// } from 'vue';
// export default defineComponent({
//     props: {
//         modelValue: {
//     //   type: Array as PropType<Array<File>>,
//         type: Array,
//         required: true,
//     }
//   },
//   emits: ['update:modelValue'],
//   setup(props, { emit }) {
//     const { modelValue } = toRefs(props);
//     const input = ref(null);
//     const isDragStarted = ref(false);
//     const uploadFile = ({ currentTarget }) => {
//       if (currentTarget.files) {
//         emit('update:modelValue', [...modelValue.value, ...Array.from(currentTarget.files)]);
//       }
//       if (input.value) {
//         input.value.value = '';
//       }
//       isDragStarted.value = false;
//     };
//     const removePhoto = (index) => {
//       emit('update:modelValue', modelValue.value.filter((p, i) => i !== index));
//     };
//     const getSrc = (photo) => URL.createObjectURL(photo);
//     const needToUpload = computed(() => 3 - modelValue.value.length);
//     const uploadText = computed(() => {
//       if (needToUpload.value > 0) {
//         return `Загрузите ${needToUpload.value} ${needToUpload.value === 1 ? 'вашу фотографию' : 'ваши фотографии'}`;
//       }
//       if (needToUpload.value === 0) {
//         return 'Вы загрузили все фотографии';
//       }
//       return 'Вы загрузили слишком много фотографий';
//     });
//     return {
//       isDragStarted,
//       uploadText,
//       input,
//       uploadFile,
//       removePhoto,
//       needToUpload,
//       getSrc,
//     };
//   },
// });
</script>

<style>
.photo-uploader__wrapper {
    width: 100%;
    position: relative;
    text-align: center;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 4px dotted #e2e2e2;
    border-radius: 10px;
    color: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    background-color: #f5f5f5;
}

.photo-uploader__wrapper--drag {
    color: rgba(#fff, 0);
    border-color: #777;
}

.photo-uploader__input {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    opacity: 0;
}

.photo-select {
    /* width: 100%; */
    height: 100%;
    position: absolute;
    z-index: 100;
    cursor: pointer;
}

.photo-uploader__icon {
    opacity: 0.3;
    width: 50px;
}

.btn-delete {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 14px;
    background-color: #EC0B43;
    padding: 4px 8px;
    border-radius: 4px;
    color: #fff;
    border: none;
    cursor: pointer;
    z-index: 101;
}
</style>