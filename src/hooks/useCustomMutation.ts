import axiosRequest from '@/api';
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';

interface InfoProps {
  method: 'post' | 'put' | 'delete' | 'patch';
  url?: string; // url을 옵션으로 수정
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
}

interface MutationVariables {
  url?: string; // 동적으로 넘겨줄 url
  data?: Record<string, unknown>; // 동적으로 넘겨줄 데이터
}

/**
 * 작성자명   : 원종석
 * 작성일자   : 2023.11.07.(화)
 * 작성내용   : useMutation 커스텀 훅
 * 수정일자   : 2024.09.10 (화)
 * 수정내용   : 범용적으로 사용할 수 있도록 로직 수정
 * @param key 내부적으로 데이터를 캐시하고 쿼리에 대한 종속성이 변경될 때 자동으로 다시 가져올 수 있게 하는 고유한 키 값
 * @param info 호출 method와 url 정보, body params를 담은 객체 데이터
 * @param options mutation 훅에 전달되는 추가적인 옵션 (onSuccess, onError 등)
 * @returns
 */
const useCustomMutation = <T>(
  key: string[],
  info: InfoProps,
  options?: UseMutationOptions<T, Error, MutationVariables, unknown> // 추가 옵션을 허용
): UseMutationResult<T, Error, MutationVariables, unknown> => {
  const queryClient = useQueryClient();

  const mutationFn = (variables: MutationVariables) => {
    const { method, headers } = info;
    const url = variables.url || info.url; // mutate에서 받은 url 우선 적용
    const data = { ...info.data, ...variables.data }; // info.data와 mutate 호출 시 받은 data 병합

    if (!url) {
      throw new Error('URL이 필요합니다.');
    }

    return axiosRequest.requestAxios<T>(method, url, data, headers);
  };

  const customMutation = useMutation<T, Error, MutationVariables, unknown>(
    mutationFn,
    {
      onSuccess: (data, variables, context) => {
        // 쿼리 무효화 처리
        queryClient.invalidateQueries(key);

        // 사용자 옵션에 정의된 onSuccess 호출
        if (options?.onSuccess) {
          options.onSuccess(data, variables, context);
        }
      },
      onError: (error, variables, context) => {
        // 사용자 옵션에 정의된 onError 호출
        if (options?.onError) {
          options.onError(error, variables, context);
        }
      },
      ...options // 나머지 옵션들을 확장할 수 있도록 설정
    }
  );

  return customMutation;
};

export default useCustomMutation;
