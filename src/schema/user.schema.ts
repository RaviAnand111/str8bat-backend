import knex from 'knex';
import { pool } from '../db/connect';

export type User = {
    user_id?: number;
    email?: string;
    password?: string;
    name?: string;
    date_of_birth?: number;
    phone_number?: string;
    gender?: string;
    profile_picture_url?: string;
    bio?: string;
    is_verified?: boolean;
    is_active?: boolean;
    last_login?: number;
    created_at?: number;
    updated_at?: number;
};

export async function createUser(user: User): Promise<User> {
    const [checkResult] = await pool.select().from('users').where('email', user.email);
    if (checkResult) throw new Error('Email already exists');

    const [result] = await pool
        .insert({
            name: user.name,
            email: user.email,
            password: user.password,
        })
        .into('users')
        .returning('*');
    if (!result) throw new Error('Failed to create user');
    return {
        user_id: result.user_id,
        name: result.name,
        email: result.email,
        date_of_birth: result.date_of_birth,
        phone_number: result.phone_number,
        gender: result.gender,
        profile_picture_url: result.profile_picture_url,
        bio: result.bio,
        is_verified: result.is_verified,
        is_active: result.is_active,
        last_login: new Date(result.last_login).getTime(),
        created_at: new Date(result.created_at).getTime(),
        updated_at: new Date(result.updated_at).getTime(),
    };
}

export async function deleteUser(email: string): Promise<User> {
    const [result] = await pool.user().where(email, email).del();
  console.log(result, 'result')
    return {
        user_id: result.user_id,
        name: result.name,
        email: result.email,
        date_of_birth: result.date_of_birth,
        phone_number: result.phone_number,
        gender: result.gender,
        profile_picture_url: result.profile_picture_url,
        bio: result.bio,
        is_verified: result.is_verified,
        is_active: result.is_active,
        last_login: new Date(result.last_login).getTime(),
        created_at: new Date(result.created_at).getTime(),
        updated_at: new Date(result.updated_at).getTime(),
    };
}

export async function loginUser(user: User): Promise<User> {
    const newResult = await pool
        .select()
        .from('users')
  console.log(newResult);

    const [result] = await pool
        .select()
        .from('users')
        .where('email', user.email)
        .andWhere('password', user.password)
    if (!result) throw new Error('Invalid email or password');
    return {
        user_id: result.user_id,
        name: result.name,
        email: result.email,
        date_of_birth: result.date_of_birth,
        phone_number: result.phone_number,
        gender: result.gender,
        profile_picture_url: result.profile_picture_url,
        bio: result.bio,
        is_verified: result.is_verified,
        is_active: result.is_active,
        last_login: new Date(result.last_login).getTime(),
        created_at: new Date(result.created_at).getTime(),
        updated_at: new Date(result.updated_at).getTime(),
    };
}

export async function updateUser(email: string, user: User): Promise<User> {
    const [result] = await pool.update(user).from('users').where('email', email).returning('*');
    if (!result) throw new Error('Invalid email or password');
    return {
        user_id: result.user_id,
        name: result.name,
        email: result.email,
        date_of_birth: result.date_of_birth,
        phone_number: result.phone_number,
        gender: result.gender,
        profile_picture_url: result.profile_picture_url,
        bio: result.bio,
        is_verified: result.is_verified,
        is_active: result.is_active,
        last_login: new Date(result.last_login).getTime(),
        created_at: new Date(result.created_at).getTime(),
        updated_at: new Date(result.updated_at).getTime(),
    };
}

export async function fetchUser(email: string): Promise<User> {
    const [result] = await pool.select().from('users').where('email', email);
    if (!result) throw new Error('Invalid email or password');
    return {
        user_id: result.user_id,
        name: result.name,
        email: result.email,
        date_of_birth: result.date_of_birth,
        phone_number: result.phone_number,
        gender: result.gender,
        profile_picture_url: result.profile_picture_url,
        bio: result.bio,
        is_verified: result.is_verified,
        is_active: result.is_active,
        last_login: new Date(result.last_login).getTime(),
        created_at: new Date(result.created_at).getTime(),
        updated_at: new Date(result.updated_at).getTime(),
    };
}

export async function verifyUser(email: string): Promise<User> {
    const [result] = await pool.update({ is_verified: true }).from('users').where('email', email);
    if (!result) throw new Error('token is invalid');
    return {
        user_id: result.user_id,
        name: result.name,
        email: result.email,
        date_of_birth: result.date_of_birth,
        phone_number: result.phone_number,
        gender: result.gender,
        profile_picture_url: result.profile_picture_url,
        bio: result.bio,
        is_verified: result.is_verified,
        is_active: result.is_active,
        last_login: new Date(result.last_login).getTime(),
        created_at: new Date(result.created_at).getTime(),
        updated_at: new Date(result.updated_at).getTime(),
    };
}
