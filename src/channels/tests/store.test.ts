import { IChannelObject, IUserObject } from '../../api/consts';
import RootStore from '../../root/RootStore';

const dummyChannels: Array<IChannelObject> = [
  { id: 'b', tags: [], name: 'b', createdAt: null, updatedAt: null },
  { id: 'all', tags: [], name: 'all', createdAt: null, updatedAt: null },
  { id: 'myPosts', tags: [], name: 'myPosts', createdAt: null, updatedAt: null },
  { id: 'subs', tags: [], name: 'subs', createdAt: null, updatedAt: null },
  { id: 'a', tags: [], name: 'a', createdAt: null, updatedAt: null },
];
const dummyUser: IUserObject = {
  id: 'user',
  subscribedChannels: [],
  profilePictureId: null,
  profileObject: null,
  role: null,
  notifications: [],
};

describe('Channel Store', () => {
  const rootStore = new RootStore();
  beforeAll(() => {
    rootStore.channelStore.channelList = dummyChannels;
    rootStore.userStore.user = dummyUser;
  });
  it('properly exports channels object', () => {
    expect(rootStore).toBeDefined();
  });

  test('channels correctly sort when no subscriptions present ', () => {
    const sortedChannels = rootStore.channelStore.SortedChannels;
    expect(sortedChannels[0].id).toEqual('all');
    expect(sortedChannels[1].id).toEqual('myPosts');
    expect(sortedChannels[2].id).toEqual('subs');
    expect(sortedChannels[3].id).toEqual('a');
    expect(sortedChannels[4].id).toEqual('b');
  });

  test('channels correctly sort when subscriptions present ', () => {
    rootStore.userStore.user.subscribedChannels = ['b'];
    const sortedChannels = rootStore.channelStore.SortedChannels;
    expect(sortedChannels[0].id).toEqual('all');
    expect(sortedChannels[1].id).toEqual('myPosts');
    expect(sortedChannels[2].id).toEqual('subs');
    expect(sortedChannels[3].id).toEqual('b');
    expect(sortedChannels[4].id).toEqual('a');
  });

  test('toggleSubscription() correctly adds and removes channel', () => {
    expect(rootStore.userStore.user.subscribedChannels.includes('c')).toBeFalsy();

    rootStore.channelStore.toggleSubscription('c');
    expect(rootStore.userStore.user.subscribedChannels.includes('c')).toBeTruthy();

    rootStore.channelStore.toggleSubscription('c');
    expect(rootStore.userStore.user.subscribedChannels.includes('c')).toBeFalsy();
  });
});
