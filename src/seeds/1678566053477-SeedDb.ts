import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1678566053477 implements MigrationInterface {
  name = 'SeedDb1678566053477';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    // pass: 1337
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('rakera', 'rakera@livesoft.pro', '$2b$10$2ZkQqTxXW0nmvQBurxxZmegQgHYsj0ZENzmEf.iTARbmauA4pycOe')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article desc', 'first article body', 'coffee,dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article desc', 'second article body', 'coffee,dragons', 1)`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
