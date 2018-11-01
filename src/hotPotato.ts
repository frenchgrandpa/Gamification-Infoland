import User from './user';

export default class HotPotato {

    private startTime: number;
    private detonationTime: number;
    private players: any[] = [];

    constructor() {
        this.startTime = Date.now();
        this.detonationTime = this.startTime + (Math.random() * 80 + 60) * 1000;
    }

    public addUser() {
        
    }



}