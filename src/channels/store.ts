import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { ApiClient } from '../api/ApiClient';

export interface ChannelObject {
  id: String;
  name: String;
  description?: String;
}

@observer
export class ChannelStore {
  @observable
  selectedChannelId: String;

  @observable
  channelList: Array<ChannelObject>;

  constructor(id: String){
    this.selectedChannelId = id;
    //this.getChannels();
  }

  toggleSubscription(channelId: String){
    //getSubscribedChannels from UserStore
    //if channelId lives in user's subscribedChannels
      //add channelId to user's subscribedChannels
    // else
      //remove channelId
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

  async getChannels(){
    this.channelList = await ApiClient.get('/channels',  {authorized: true});
  }

  @computed
  get SortedChannels(): Array<ChannelObject>{
    let sortedChannels = this.channelList;
    let subscribedChannels: Array<String> = /*userStore.getSubscribedChannels*/ null;
    sortedChannels.sort((a, b) => {
      if (a.id === 'all') return -1;
      if (b.id === 'all') return 1;
      if (a.id === 'myPosts') return -1;
      if (b.id === 'myPosts') return 1;
      if (a.id === 'subs') return -1;
      if (b.id === 'subs') return 1;

      if (subscribedChannels.includes(a.id) && !subscribedChannels.includes(b.id)) return -1;
      if (!subscribedChannels.includes(a.id) && subscribedChannels.includes(b.id)) return 1;

      if (a.name < b.name) return -1;
      return 1;
    });
    return sortedChannels;
  }

  @computed
  get SelectedChannel(): ChannelObject {
    return this.channelList.find((channel) => {
      channel.id === this.selectedChannelId
    });
  }
}
