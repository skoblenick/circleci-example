import mysql from 'mysql2/promise';
import { expect } from 'chai';

describe('my test', () => {
    context('mysql', () => {
        let connection;

        before(async () => {
            const conn = await mysql.createConnection({ host: 'localhost', user: 'root', waitForConnections: true });
            await conn.execute('CREATE DATABASE IF NOT EXISTS test');
        });

        beforeEach(async () => {
            connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'test', waitForConnections: true });
            await connection.execute(`CREATE TABLE IF NOT EXISTS tasks (
                task_id INT AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                start_date DATE,
                due_date DATE,
                status TINYINT NOT NULL,
                priority TINYINT NOT NULL,
                description TEXT,
                PRIMARY KEY (task_id)
            )  ENGINE=INNODB;`);
        });

        after(async () => {
            console.log('AFTER')
            const [results] = await connection.execute(`
                SELECT Concat('TRUNCATE TABLE ',table_schema,'.',TABLE_NAME, ';')
                FROM INFORMATION_SCHEMA.TABLES WHERE table_schema IN ('test');
            `);
            for (const row of results) {
                const query = Object.values(row)[0];
                await connection.execute(query);
            }
        });

        it('should insert data into the table', async () => {
            const query = 'INSERT INTO `tasks` (`title`, `start_date`, `due_date`, `status`, `priority`, `description`) VALUES (?, ?, ?, ?, ?, ?)';
            let results;
            try {
                [results] = await connection.execute(query, ['my title', new Date(), null, 1, 1, '']);
            } catch(e) {
                throw new Error(e.message);
            }

            expect(results.affectedRows).to.equal(1);
            expect(results.insertId).to.not.equal(null);
        });

        it('should get data from the table', async () => {
            let results;
            try {
                [results] = await connection.execute('SELECT * FROM `tasks`');
            } catch(e) {
                throw new Error(e.message);
            }

            expect(results).to.be.an('array');
            expect(results.length).to.equal(1);
        });
    });
});