import * as lmdb from 'lmdb';
import { BaseCache } from '../interfaces/base-cache.js';

export class LmdbCache implements BaseCache {
    private readonly dataPath: string;
    private database: lmdb.RootDatabase<any, lmdb.Key>;

    constructor({ path }: { path: string }) {
        this.dataPath = path;
    }

    async init(): Promise<void> {
        this.database = lmdb.open({
            path: this.dataPath,
            compression: true,
        });
    }

    async addSeen(chunkHash: string): Promise<void> {
        await this.database.put(chunkHash, true);
    }

    async hasSeen(chunkHash: string): Promise<boolean> {
        return this.database.doesExist(chunkHash);
    }
}
