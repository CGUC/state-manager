export interface IAuthObject {
  name: String;
  url: String;
  token: String;
}

export interface IChannelObject {
  id: String;
  tags: Array<String>;
  name: String;
  description?: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPostObject {
  id: String;
  subscribedUsers: Array<String>;
  tags: Array<String>;
  likes: Number;
  usersLiked: Array<IProfileObject>;
  author: IProfileObject;
  content: String;
  comments: Array<ICommentObject>;
  createdAt: Date;
  updatedAt: Date;
  media?: Array<String>; // TODO
}

export interface IUserObject {
  id: String;
  subscribedChannels: Array<String>;
  profilePicture?: any; // It's in the API call response, idk
  profilePictureId: String;
  profileObject: IProfileObject;
  role: Array<String>;
  notifications: Array<INotificationObject>;
}

export interface ICommentObject extends IPostObject {}

export interface INotificationObject {
  id: String;
  data: {
    channel: String;
    post: IPostObject;
  };
  seen: boolean;
  title: String;
  body: String;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfileObject {
  id: String; // double of the UserObject
  info?: {
    address: String;
    bio: String;
    program: String;
    affiliation: String;
    phoneNumber: String;
    email: String;
  };
  donInfo?: {
    isOn: boolean;
    isOnLateSupper: boolean;
  };
  userName?: String;
  firstName: String;
  lastName: String;
  profilePictureId: String;
  profilePicture?: any; //
}
