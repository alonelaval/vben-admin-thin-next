import { defHttp, jsonHttp, srcHttp } from '/@/utils/http/axios';
import { LoginParams, GetUserInfoModel, UserRoleModel } from './model/userModel';
import { ErrorMessageMode } from '/#/axios';
import { useUserStore } from '/@/store/modules/user';
import { UserListGetResultModel, UserListItem } from './model/userModel';
enum Api {
  Login = '/user/login',
  Logout = '/user/logOut',
  GetUserInfo = '/getUserInfo',
  GetPermCode = '/getPermCode',
  GetAuthCode = '/kaptcha',
  UserList = '/user/list', // 获取用户列表
  UserAdd = '/user/add', //用户新增
  UserUpdate = '/user/update', // 用户更新
  UserDisable = '/user/disable', // 用户禁用
  UserEnable = '/user/enable', // 用户启用
  UserRevoke = '/user/revoke', // 用户注销
  UserDetail = '/user/detail', //用户详情
  UserDelete = '/user/delete', // 删除用户
  UserRoleAdd = '/userRole/add', // 用户添加权限
}

/**
 * @description: user login api
 */
export function loginApi(params?: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.Login,
      params: params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  const userStore = useUserStore();
  const params = { userId: userStore.userInfo?.id };
  return defHttp.post({ url: Api.Logout, params });
}

export function getAuthCode() {
  return srcHttp.get({ url: Api.GetAuthCode });
}

export const getUserList = (params) =>
  defHttp.get<UserListGetResultModel>({ url: Api.UserList, params });

export const userAdd = (params) =>
  defHttp.post<UserListGetResultModel>({ url: Api.UserAdd, params });

export const userUpdate = (params) =>
  defHttp.post<UserListGetResultModel>({ url: Api.UserUpdate, params });

export const userDisable = (params) => defHttp.post<UserListItem>({ url: Api.UserDisable, params });

export const userEnable = (params) => defHttp.post<UserListItem>({ url: Api.UserEnable, params });

export const userRevoke = (params) =>
  defHttp.post<UserListGetResultModel>({ url: Api.UserRevoke, params });

export const userDelete = (params) =>
  defHttp.post<UserListGetResultModel>({ url: Api.UserDelete, params });

export const userDetail = (params) => defHttp.get<UserListItem>({ url: Api.UserDetail, params });

export const setUserStatus = (userId: number, status: boolean) => {
  return status ? userEnable({ userId }) : userDisable({ userId });
};

export const userRoleAdd = (params: UserRoleModel) => {
  jsonHttp.post({ url: Api.UserRoleAdd, params });
};
