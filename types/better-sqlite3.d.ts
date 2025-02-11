declare module 'better-sqlite3' {
    interface Database {
        prepare(sql: string): Statement;
        exec(sql: string): void;
        close(): void;
    }

    interface Statement {
        run(...params: any[]): any;
        get(...params: any[]): any;
        all(...params: any[]): any[];
    }

    interface DatabaseConstructor {
        new (filename: string, options?: any): Database;
        (filename: string, options?: any): Database;
    }

    const Database: DatabaseConstructor;
    export default Database;
} 