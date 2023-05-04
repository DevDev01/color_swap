class Timer
{
    interval: number;
    lengthFunc: Function;
    runFunc: Function;
    repeat: boolean;
    length: number;

    currentTime: number;
    id: number;


    constructor(interval: number, lengthFunc: Function, runFunc: Function, repeat: boolean = false)
    {
        this.interval = interval; 
        this.lengthFunc = lengthFunc;
        this.runFunc = runFunc;
        this.repeat = repeat;
        this.length = this.lengthFunc.call(this);

        this.currentTime = 0;
        this.id = 0;
    }

    public start()
    {
        this.setID(setTimeout(this.incriment.bind(this), this.interval));
    }

    public stop()
    {
        clearTimeout(this.id);
        this.setCurrentTime(0);
        this.setLength(this.lengthFunc.call(this));
    }
  
    private incriment()
    {
        if(this.getCurrentTime() >= this.getLength())
        {
            this.run();
            this.stop();
            if(this.getRepeat()) this.start();
        }
        else
        {
            this.setCurrentTime(this.getCurrentTime() + 1);
            this.setID(setTimeout(this.incriment.bind(this), this.interval));
        } 
    }

    private run()
    {
        this.runFunc.call(this);
    }

    public getCurrentTime(): number
    {
        return this.currentTime;
    }

    public getLength(): number
    {
        return this.length;
    }

    public getInterval(): number
    {
        return this.interval;
    }

    public getRepeat(): boolean
    {
        return this.repeat;
    }

    public setLength(length: number)
    {
        this.length = length;
    }

    public setInterval(interval: number)
    {
        this.interval = interval;
    }

    private setID(id: number)
    {
        this.id = id;
    }

    private setCurrentTime(currentTime: number)
    {
        this.currentTime = currentTime;
    }
}

export default Timer;