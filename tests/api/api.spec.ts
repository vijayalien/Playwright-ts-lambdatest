import { expect, test,request } from "@playwright/test";
import { json } from "stream/consumers";



test.describe.parallel("API Testing",()=>{

    test("Simple API request",async ({request})=>{
        const response = await request.get('https://reqres.in/api/users/2')
        expect(response.status()).toBe(200)

    })

    test("Simple API request - Assert invalid endpoint",async ({request})=>{
        const response = await request.get('https://reqres.in/api/users/23')
         expect(response.status()).toBe(404)
    })

    test("Simple API request - Get user data",async ({request})=>{
        const response = await request.get('https://reqres.in/api/users/2')
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        expect(responseBody.data.id).toBe(2)
        console.log(responseBody)
    })

})