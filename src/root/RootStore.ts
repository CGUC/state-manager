import UserStore from '../user/UserStore';
import ChannelStore from '../channels/ChannelStore';

class RootStore {
  userStore: UserStore;

  channelStore: ChannelStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.channelStore = new ChannelStore(this);
  }
}
export default RootStore;
