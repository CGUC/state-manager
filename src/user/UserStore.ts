import { observable } from 'mobx';
import { IUserObject } from '../api/consts';
import RootStore from '../root/RootStore';
import ApiClient from '../api/ApiClient';

class UserStore {
  rootStore: RootStore;

  @observable
  user: IUserObject;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    this.user = null;
  }

  updateUser() {
    ApiClient.put(`/users/${this.user.id}`, this.user, { authorized: true }).catch(err =>
      console.error(err),
    );
  }
}
export default UserStore;
