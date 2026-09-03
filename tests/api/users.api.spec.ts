import { test, expect, request as playwrightRequest, APIRequestContext } from '@playwright/test';

test.describe('Reqres API Testing - Users', () => {
    test('GET - Fetch a single user successfully', async ({ request }) => {
        console.log('Sending GET request to fetch User #2...');

        //1. send the request
        const response = await request.get('https://reqres.in/api/users/2');

        //2. Assert the Status Code is 200(ok)
        expect(response.status()).toBe(200);

        //3. Extract the JSON body from the response
        const responseBody = await response.json();
        console.log('Response received:', responseBody);

        //4. Assert the exact data matches our expectations
        expect(responseBody.data.id).toBe(2);
        expect(responseBody.data.first_name).toBe('Janet');
        expect(responseBody.data.last_name).toBe('Weaver');
    });

    test('PUT - Update an existing user successfully', async ({ request }) => {
        console.log('Sneing PUT request to update user...');

        //1. update payload
        const updatedPayload = {
            "name": "Sayuz Shikhrakar",
            "role": "Senior SDET"
        };

        //send put request
        const response = await request.put('https://reqres.in/api/users/2', { data: updatedPayload });
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log('updated response', responseBody);

        expect(responseBody.name).toBe('Sayuz Shikhrakar');
        expect(responseBody.role).toBe('Senior SDET');
    });

    test('DELETE - Remove an existing user successfully', async ({ request }) => {
        console.log("sending DELETE request for user #2...");

        //1. sending the DELETE requst
        const response = await request.delete('https://reqres.in/api/users/2');

        expect(response.status()).toBe(204);

        //verifying response status is OK (in the 200-209 range)
        expect(response.ok()).toBeTruthy();

        console.log('User deleted successfully with status');



    })
});

test.describe('Mock Authentication & Protected Routes @building', () => {
    let authContext: APIRequestContext;
    let token: string;

    test.beforeAll(async () => {
        const loginContext = await playwrightRequest.newContext({
            baseURL: 'https://dummyjson.com'
        });

        //authenticate against mock login endpoint
        const loginResponse = await loginContext.post('/auth/login', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username: 'emilys',
                password: 'emilyspass',
                expiresInMins: 30
            }
        });

        if (loginResponse.status() !== 200) {
            console.error('Login Failed Response:', await loginResponse.text());
        }

        expect(loginResponse.status()).toBe(200);
        const loginBody = await loginResponse.json();
        token = loginBody.accessToken;
        expect(token).toBeDefined();

        //setup authenticated context for subsequent tests
        authContext = await playwrightRequest.newContext({
            baseURL: 'https://dummyjson.com',
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,

            }
        })
    });

    test.afterAll(async () => {      //setup authenticated context for subsequent tests
        authContext = await playwrightRequest.newContext({
            baseURL: 'https://dummyjson.com',
            extraHTTPHeaders: {
                Authorization: `Bearer ${token}`,

            }
        })
        await authContext?.dispose();
    });

    test('GET - successfully access proctected user profile', async () => {
        const response = await authContext.get('/auth/me');
        console.log("response,", response)

        expect(response.status()).toBe(200);

        const body = await response.json();
    })

    test('Fetch ons single product', async () => {
        const response = await authContext.get('/products/1');
        expect(response.status()).toBe(200);

        const body = await response.json();
        console.log("--------------------------------------", body);
    })


})
