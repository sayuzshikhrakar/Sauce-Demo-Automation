import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

// Performance testing configuration
export const options = {
    stages: [
        { duration: '10s', target: 10 }, // Ramp up to 10 users over 10 seconds
        { duration: '20s', target: 10 }, // Stay at 10 users for 20 seconds
        { duration: '10s', target: 0 },  // Ramp down to 0 users over 10 seconds
    ],
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% of requests must complete below 1000ms
        http_req_failed: ['rate<0.01'],    // Error rate must be less than 1%
    },
};

export default function () {
    // Making a GET request to a public API endpoint
    const res = http.get('https://dummyjson.com/products/1');

    // Assertions for the response
    check(res, {
        'status is 200': (r) => r.status === 200,
        'response time < 1000ms': (r) => r.timings.duration < 1000,
        'has correct data': (r) => JSON.parse(r.body).id === 1,
    });

    // Pause for 1 second between iterations to simulate real user pacing
    sleep(1);
}

// Generate an HTML report and standard console output
export function handleSummary(data) {
    return {
        "load-test-reports/k6-report.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
