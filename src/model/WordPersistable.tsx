import {Task} from "./Task";

/* global Word, require */

export default abstract class WordPersistable<Type> {
    protected abstract propertyKey: string;

    save(): void {
        Word.run(async context => {
            // Overwrite task data
            context.document.properties.customProperties.add(this.propertyKey,
                JSON.stringify(this));
            // Force subsequent saving
            context.document.save();

            await context.sync()

            console.log("Saved " + this.propertyKey);
        });
    }

    async load(): Promise<Type> {
        return Word.run(async context => {
            context.load(context.document.properties.customProperties);
            const customProp = context.document.properties.customProperties.getItemOrNullObject(this.propertyKey);
            if (customProp == null) {
                return this.newEmpty();
            }
            customProp.load("value");

            await context.sync();

            const json = customProp.value;

            if (json == null) {
                return this.newEmpty();
            }

            // Use custom reviver for parsing
            const obj = JSON.parse(json, this.reviver) as Type;

            this.init(obj, context);
            return obj;
        });
    }

    abstract init(obj, context: Word.RequestContext) : void;
    abstract reviver(key, value) : any;
    abstract newEmpty() : Type;
}