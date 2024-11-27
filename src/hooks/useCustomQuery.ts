import axiosRequest from '@/api';
import {
  QueryFunction,
  UseQueryOptions,
  UseQueryResult,
  useQuery
} from '@tanstack/react-query';

interface InfoProps<T> {
  method: string;
  url: string;
  queryFn?: QueryFunction<T>;
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>;
  enabled?: boolean;
}

/**
 * 작성자명   : 000
 * 작성일자   : 2023.11.06.(월)
 * 작성내용   : useQuery 커스텀 훅
 * 수정일자   : 2024.09.04 (수)
 * 수정내용   : 범용적으로 사용할 수 있도록 로직 수정
 * @param key 내부적으로 데이터를 캐시하고 쿼리에 대한 종속성이 변경될 때 자동으로 다시 가져올 수 있게 하는 고유한 키 값
 * @param info 호출 method와 url 정보를 담은 객체 데이터
 * @returns
 */
const useCustomQuery = <T>(
  key: string[],
  info: InfoProps<T>
): UseQueryResult<T, Error> => {
  const {
    method,
    url,
    queryFn = () => axiosRequest.requestAxios<T>(method, url),
    options = {},
    enabled = true
  } = info;

  const queryOptions: UseQueryOptions<T, Error> = {
    queryKey: key,
    queryFn,
    enabled,
    ...options // allow for additional options to be passed in
  };

  return useQuery(queryOptions);
};

export default useCustomQuery;
