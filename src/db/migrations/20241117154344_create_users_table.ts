import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
      table.increments('user_id', { primaryKey: true });
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.string('date_of_birth');
      table.string('phone_number');
      table.string('gender');
      table.string('profile_picture_url');
      table.string('bio');
      table.boolean('is_verified').defaultTo(false);
      table.boolean('is_active').defaultTo(false);
      table.dateTime('last_login');
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users'); // Drops the table if rollback is needed
}

