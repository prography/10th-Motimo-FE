// Service Worker for intercepting OAuth responses and extracting cookies
self.addEventListener('fetch', (event) => {
    const url = event.request.url;

    // OAuth 관련 요청 또는 토큰 교환 요청 가로채기
    if (url.includes('motimo.kro.kr:8080') && (
        url.includes('oauth2/authorize') ||
        url.includes('login/oauth2/code') ||
        url.includes('/api/auth/google/callback')
    )) {

        console.log('🔍 SW: OAuth/토큰 요청 감지됨', url);

        event.respondWith(
            fetch(event.request, {
                credentials: 'include' // 쿠키 포함
            }).then(response => {
                console.log('📋 SW: 응답 상태:', response.status);
                console.log('📋 SW: 모든 응답 헤더:');

                // 토큰 저장용 객체
                const tokens = {};

                // 모든 헤더 검사
                for (let [key, value] of response.headers.entries()) {
                    console.log(`SW: ${key}: ${value}`);

                    // Set-Cookie 헤더 처리
                    if (key.toLowerCase() === 'set-cookie') {
                        console.log('🍪 SW: Set-Cookie 헤더 발견!', value);

                        // 여러 Set-Cookie 헤더가 있을 수 있으므로 배열로 처리
                        const cookies = Array.isArray(value) ? value : [value];

                        cookies.forEach(cookieString => {
                            console.log('🍪 SW: 쿠키 파싱 중:', cookieString);

                            // ACCESS_TOKEN 추출
                            const accessMatch = cookieString.match(/ACCESS_TOKEN=([^;]+)/);
                            if (accessMatch) {
                                tokens.access_token = accessMatch[1];
                                console.log('✅ SW: Access Token 추출됨:', tokens.access_token);
                            }

                            // REFRESH_TOKEN 추출
                            const refreshMatch = cookieString.match(/REFRESH_TOKEN=([^;]+)/);
                            if (refreshMatch) {
                                tokens.refresh_token = refreshMatch[1];
                                console.log('✅ SW: Refresh Token 추출됨:', tokens.refresh_token);
                            }
                        });
                    }

                    // 응답 헤더에서도 토큰 확인
                    if (key.toLowerCase() === 'authorization') {
                        const bearerMatch = value.match(/Bearer (.+)/);
                        if (bearerMatch) {
                            tokens.access_token = tokens.access_token || bearerMatch[1];
                            console.log('✅ SW: Authorization 헤더에서 토큰 추출:', bearerMatch[1]);
                        }
                    }

                    if (key.toLowerCase() === 'refresh-token') {
                        tokens.refresh_token = tokens.refresh_token || value;
                        console.log('✅ SW: Refresh-Token 헤더에서 토큰 추출:', value);
                    }

                    if (key.toLowerCase() === 'access-token') {
                        tokens.access_token = tokens.access_token || value;
                        console.log('✅ SW: Access-Token 헤더에서 토큰 추출:', value);
                    }
                }

                // 토큰이 발견되면 메인 스레드에 전달
                if (tokens.access_token || tokens.refresh_token) {
                    console.log('📨 SW: 토큰을 메인 스레드에 전달 중...', tokens);

                    self.clients.matchAll().then(clients => {
                        clients.forEach(client => {
                            client.postMessage({
                                type: 'OAUTH_TOKENS_EXTRACTED',
                                tokens: tokens,
                                source: 'service-worker',
                                url: url
                            });
                        });
                    });
                } else {
                    console.log('❌ SW: 토큰을 찾을 수 없음');
                }

                return response;
            }).catch(error => {
                console.error('❌ SW: 요청 처리 중 오류:', error);
                return fetch(event.request); // 원본 요청으로 폴백
            })
        );
    }
});

// 메인 스레드로부터 메시지 처리
self.addEventListener('message', (event) => {
    console.log('📨 SW: 메인 스레드로부터 메시지:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CHECK_COOKIES') {
        console.log('🔍 SW: 쿠키 확인 요청 받음');
        // Service Worker에서는 document.cookie에 직접 접근할 수 없음
        event.ports[0].postMessage({
            type: 'COOKIES_CHECK_RESULT',
            message: 'Service Worker에서는 document.cookie에 직접 접근할 수 없습니다'
        });
    }
});

// Service Worker 설치 이벤트
self.addEventListener('install', (event) => {
    console.log('🔧 SW: Service Worker 설치됨');
    self.skipWaiting();
});

// Service Worker 활성화 이벤트
self.addEventListener('activate', (event) => {
    console.log('🚀 SW: Service Worker 활성화됨');
    event.waitUntil(self.clients.claim());
}); 