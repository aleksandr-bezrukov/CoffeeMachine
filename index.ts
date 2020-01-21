interface IIngridient{

    get(someValue: number): void;
    set(initValue: number): void;
    showRest():number;

}

abstract class AbstractIngridient implements IIngridient{
    private name: string;
    private stuff: number;

    constructor(name: string, stuff: number){
        this.name = name;
        this.stuff = stuff;
    }
    
    public set(initValue: number): void{
        this.stuff = initValue;
    };

    public get(someValue: number): void{
        if(this.stuff - someValue >= 0){
            this.stuff = this.stuff - someValue;
        }
        else 
            throw new Error("Not enough " + this.name);
    };
    
    public showRest():number{
        return this.stuff;
    };
}

class Ingridient extends AbstractIngridient{
    constructor(name: string, stuff: number){
        super(name, stuff);
    }
}

interface CMStorageInterface{
    getMilk(portion: number): void;
    setMilk(newValue: number): void;
    showMilk(): number;
    getWater(portion: number): void;
    setWater(newValue: number): void;
    showWater(): number;
    getBeans(portion: number): void;
    setBeans(newValue: number): void;
    showBeans(): number;
}

class CMStorage implements CMStorageInterface{

    private milk: Ingridient;
    private water: Ingridient;
    private beans: Ingridient;

    constructor(milk: number, water: number, beans: number){
        this.milk = new Ingridient("milk", milk);
        this.water = new Ingridient("water", water);
        this.beans = new Ingridient("beans", beans);
    }

    getMilk(portion: number): void {

        this.milk.get(portion);
    }    
    setMilk(newValue: number): void {
        this.milk.set(newValue);
    }
    showMilk(): number {
        return this.milk.showRest();
    }
    getWater(portion: number): void {
        this.water.get(portion);
    }
    setWater(newValue: number): void {
        this.water.set(newValue);
    }
    showWater(): number {
        return this.water.showRest();
    }
    getBeans(portion: number): void {
        this.beans.get(portion);
    }
    setBeans(newValue: number): void {
        this.beans.set(newValue);
    }
    showBeans(): number {
        return this.beans.showRest();
    }
}

interface ICMRecipie{
    preparePotion(): void;
    getName(): string;
}

abstract class CMRecipie implements ICMRecipie{

    private pname: string;
    private milkPortion: number;
    private waterPortion: number;
    private beansportion: number;
    private stor: CMStorage;

    constructor(pname: string, milkPortion: number, waterPortion: number, beansportion: number, stor: CMStorage){
        this.pname = pname;
        this.milkPortion = milkPortion;
        this.waterPortion = waterPortion;
        this.beansportion = beansportion;
        this.stor = stor;
    }

    preparePotion(): string {
        this.stor.getBeans(this.beansportion);
        this.stor.getMilk(this.milkPortion);
        this.stor.getWater(this.waterPortion);
        return "Potion " + this.pname + " prepared. Rest: " +" Milk = " + this.stor.showMilk() + " Water = " + this.stor.showWater() + " Beans = " + this.stor.showBeans();
    }

    getName(): string {
        return this.pname;
    }

}

class Potion extends CMRecipie{
    constructor(pname: string, milkPortion: number, waterPortion: number, beansportion: number, stor: CMStorage){
        super(pname, milkPortion, waterPortion, beansportion, stor);
    }
}

class CMController{
    private stor: CMStorage;
    private espresso: Potion;
    private americano: Potion;
    private capuccino: Potion;

    constructor(){
        this.stor = new CMStorage(0, 0, 0);
        this.espresso = new Potion("espresso", 0, 50, 20, this.stor);
        this.americano = new Potion("americano", 0, 100, 30, this.stor);
        this.capuccino = new Potion("capuccino", 50, 150, 20, this.stor);
    }

    public preparePotion(pname: string): string {
        let result="-----";

        try{

            switch(pname){
                case "espresso": result = this.espresso.preparePotion(); break;
                case "americano": result = this.americano.preparePotion(); break;
                case "capuccino": result = this.capuccino.preparePotion(); break;
            }
            return result + " Enjoy.";
        }
        catch(Error){
            console.log(Error);
        }
    }
}

let controller = new CMController();

console.log(controller.preparePotion("americano"));
