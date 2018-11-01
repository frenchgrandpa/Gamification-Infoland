import User from './user';

export default class HotPotato {

    private startTime: number;
    private detonationTime: number;
    private players: string[] = [];
    private maxplayers: number = 5;
    private currenttime:number;

    constructor() {
        this.startTime = Date.now();
        this.detonationTime = this.startTime + (Math.random() * 80 + 60) * 1000;
    }

    public addUser() {
        
    }

    public getMaxplayers()
    {
        return this.maxplayers;
    }

    public getPlayers()
    {
        return this.players;
    }

}