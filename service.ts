import { Api, HttpClient } from './api/generated/motimo/Api';
import useAuthStore from './stores/useAuthStore';

// HTTP 클라이언트 생성 시 인증 헤더를 자동으로 추가하는 securityWorker 설정
const httpClient = new HttpClient({
  baseUrl: 'http://158.179.175.134:8080',
  securityWorker: () => {
    const token = useAuthStore.getState().accessToken;
    
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }
    
    return {};
  },
});

// API 클라이언트 인스턴스 생성
export const api = new Api(httpClient);

// 개별 API 그룹들을 직접 export하여 사용하기 편하게 함
export const todoApi = api.투두Api;
export const goalApi = api.목표Api;
export const subGoalApi = api.세부목표Api;
export const groupApi = api.그룹Api;
export const pokeApi = api.찌르기Api;
export const authApi = api.authController;
export const userApi = api.사용자Api;
export const pointApi = api.포인트Api;
export const cheerApi = api.응원Api;
export const healthApi = api.healthController;

export default api; 