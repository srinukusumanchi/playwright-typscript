import test, { request, expect } from "@playwright/test";
import createAndDeleteUserData from '../../testdata/api/create.and.delete.user.json';

let xauthtoken: string = null;
test("Create and Delete new User Account", async ({ request }) => {

    const newUserAccount = await request.post("https://practice.expandtesting.com/notes/api/users/register", {
        data: {
            "name": createAndDeleteUserData.CreateUser.username, 
            "email": createAndDeleteUserData.CreateUser.email, 
            "password": createAndDeleteUserData.CreateUser.password,
            Headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    });
    const newUserAccountResponse = JSON.stringify(await newUserAccount.json());
    console.log(newUserAccountResponse);
    expect(newUserAccount.status()).toEqual(201);
    expect(await newUserAccount.json()).toHaveProperty('success', true);
    expect(await newUserAccount.json()).toHaveProperty('status', 201);
    expect(await newUserAccount.json()).toHaveProperty('message', 'User account created successfully');

    expect(await newUserAccount.json()).toHaveProperty('data.id');
    expect((await newUserAccount.json()).data.id).toMatch(/^[a-z0-9]{24}$/);
    expect((await newUserAccount.json()).data).toHaveProperty('name', createAndDeleteUserData.CreateUser.username);
    expect((await newUserAccount.json()).data).toHaveProperty('email', createAndDeleteUserData.CreateUser.email);

    const existingUser = await request.post('https://practice.expandtesting.com/notes/api/users/login', {
        data: {
            'email': createAndDeleteUserData.CreateUser.email, 'password': createAndDeleteUserData.CreateUser.password,
            Headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    });
    const existingUserResponse = JSON.stringify(await existingUser.json());
    console.log(existingUserResponse);
    expect(existingUser.status()).toEqual(200);
    expect(await existingUser.json()).toHaveProperty('success', true);
    expect(await existingUser.json()).toHaveProperty('status', 200);
    expect(await existingUser.json()).toHaveProperty('message', 'Login successful');
    expect((await existingUser.json()).data.id).toMatch(/^[a-z0-9]{24}$/);
    expect((await existingUser.json()).data).toHaveProperty('name', createAndDeleteUserData.CreateUser.username);
    expect((await existingUser.json()).data).toHaveProperty('email', createAndDeleteUserData.CreateUser.email);

    expect((await existingUser.json()).data.token).toMatch(/^[a-z0-9]{64}$/);
    xauthtoken = (await existingUser.json()).data.token;


    const deleteUserAccount = await request.delete('https://practice.expandtesting.com/notes/api/users/delete-account',
        {
            headers:
            {
                'accept': 'application/json',
                'x-auth-token': xauthtoken
            }
        });

    const deleteUserAccountResponse = JSON.stringify(await deleteUserAccount.json());
    console.log(deleteUserAccountResponse);
    expect(deleteUserAccount.status()).toEqual(200);
    expect(await deleteUserAccount.json()).toHaveProperty('success', true);
    expect(await deleteUserAccount.json()).toHaveProperty('status', 200);
    expect(await deleteUserAccount.json()).toHaveProperty('message', 'Account successfully deleted');

});





