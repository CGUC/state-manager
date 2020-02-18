import {ChannelStore } from '../store';

describe('Channel Store', () => {
  // it('properly exports channels object', () => {
  //   expect(channels).toBeDefined();
  // });
 
  test('selectedChannelId correctly returns default ID', ()=>{
    let testStore = new ChannelStore('testId');
    expect(testStore.selectedChannelId).toEqual('testId');
  });
});
