import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';
import { ResourceItem } from './menuModel';
import { UserInfo } from '/#/store';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  userName: string;
  userPwd: string;
  loginType: string;
  authCode: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
// export interface LoginResultModel {
//   userId: string | number;
//   token: string;
//   role: RoleInfo;
// }

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: RoleInfo[];
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export type UserParams = BasicPageParams & {
  userName?: string;
};

export type UserListItem = UserInfo & {
  id?: string;
  account: string;
  email: string;
  nickName: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
  realName?: string;
  homePath?: string;
  userName: string;
  menuResource: ResourceItem[];
};

export type UserRoleModel = {
  userId: number;
  roleIds: number[];
};

/**
 * 用户列表接口
 */
export type UserListGetResultModel = BasicFetchResult<UserListItem>;
