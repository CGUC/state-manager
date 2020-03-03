import { observable, computed } from 'mobx';
import ApiClient from '../api/ApiClient';
import { IChannelObject } from '../api/consts';
import RootStore from '../root/RootStore';

class ChannelStore {
  rootStore: RootStore;

  @observable
  selectedChannelId: String;

  @observable
  channelList: Array<IChannelObject>;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    // this.selectedChannelId = id;
    this.getChannels();
  }

  toggleSubscription(channelId: String) {
    // getSubscribedChannels from UserStore
    const { subscribedChannels } = this.rootStore.userStore.user;
    if (subscribedChannels.includes(channelId)) {
      subscribedChannels.splice(subscribedChannels.indexOf(channelId), 1);
    } else {
      subscribedChannels.push(channelId);
    }
    /*
    ApiClient.put(
      `/users/${user._id}`,
      user,
      {authorized: true}
    ).catch(err => console.error(err));
    */
  }

  selectChannel(channelId: String) {
    this.selectedChannelId = channelId;
  }

  async getChannels() {
    this.channelList = await ApiClient.get('/channels', { authorized: true });
  }

  @computed
  get SortedChannels(): Array<IChannelObject> {
    const { subscribedChannels } = this.rootStore.userStore.user;
    const sortedChannels = this.channelList.slice().sort((a, b) => {
      if (a.id === 'all') return -1;
      if (b.id === 'all') return 1;
      if (a.id === 'myPosts') return -1;
      if (b.id === 'myPosts') return 1;
      if (a.id === 'subs') return -1;
      if (b.id === 'subs') return 1;
      if (subscribedChannels) {
        if (subscribedChannels.includes(a.id) && !subscribedChannels.includes(b.id)) return -1;
        if (!subscribedChannels.includes(a.id) && subscribedChannels.includes(b.id)) return 1;
      }

      if (a.name < b.name) return -1;
      return 1;
    });
    return sortedChannels;
  }

  @computed
  get SelectedChannel(): IChannelObject {
    return this.channelList.find(channel => channel.id === this.selectedChannelId);
  }
}
export default ChannelStore;
