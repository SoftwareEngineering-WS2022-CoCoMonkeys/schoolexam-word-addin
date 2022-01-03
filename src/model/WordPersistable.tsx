/* global Word, require */

export default abstract class WordPersistable<Type> {
  protected abstract propertyKey: string;

  async save(context: Word.RequestContext): Promise<void> {
    // Overwrite custom data
    context.document.properties.customProperties.add(this.propertyKey, JSON.stringify(this));
    // Force saving of document
    context.document.save();

    await context.sync();

    console.log("Saved " + this.propertyKey + " as ", JSON.stringify(this));
  }

  async load(): Promise<Type> {
    return Word.run(async (context) => {
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

      console.log("Loaded", obj);
      return obj;
    });
  }

  abstract init(obj, context: Word.RequestContext): void;

  abstract reviver(key, value): any;

  abstract newEmpty(): Type;
}
