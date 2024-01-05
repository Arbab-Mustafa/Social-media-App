import {
  // useInfiniteQuery,
  useMutation,
  useQuery,
  // useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createPost,
  createUserAccount,
  getRecentPosts,
  signInAccount,
  signoutAccount,
} from '../appwrite/api';
import { INewPost, INewUser } from '@/types';
import { QUERY_KEYS } from './queryKeys';

export function useCreateUserAccount() {
  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  });
}

export function useSignInAccount() {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  });
}

export function useSignOutAccount() {
  return useMutation({
    mutationFn: signoutAccount,
  });
}

export function useCreatePost() {
  const queryclient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
}
export function useGetRecentPosts() {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
}
