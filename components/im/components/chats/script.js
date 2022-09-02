import { useIm } from "../../composables/use-im";
import { useUsers } from "vue-mobile/@lr/composables/use-users";

export default {
  props: {
    items: {
      type: Array,
      default: () => [{}],
    },
  },
  emits: ["goto-chat"],
  setup() {
    const { user } = useUsers();
    const { getAvatarUrl } = useIm({ user });

    return {
      getAvatarUrl,
    };
  },
};
