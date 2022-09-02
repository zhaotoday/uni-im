import { useIm } from "../../../../composables/use-im";
import { useUsers } from "vue-mobile/@lr/composables/use-users";

export default {
  props: {
    index: {
      type: Number,
      default: -1,
    },
    playIndex: {
      type: Number,
      default: -1,
    },
    fileId: {
      type: Number,
      default: 0,
    },
  },
  emits: ["play-index-change"],
  setup(props, context) {
    const { user } = useUsers();
    const { getFileUrl } = useIm({ user });

    const innerAudioContext = uni.createInnerAudioContext();

    innerAudioContext.onStop(() => {
      context.emit("play-index-change", -1);
    });

    innerAudioContext.onEnded(() => {
      context.emit("play-index-change", -1);
    });

    const play = () => {
      if (props.playIndex === props.index) {
        innerAudioContext.stop();
      } else {
        innerAudioContext.src = getFileUrl(props.fileId);
        innerAudioContext.play();
        context.emit("play-index-change", props.index);
      }
    };

    return {
      play,
    };
  },
};
