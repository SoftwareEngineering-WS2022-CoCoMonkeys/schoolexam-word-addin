/**
 * Common superclass for custom objects that should be persisted inside Word's custom properties.
 * Consequently, only small objects and config and no binary data is to be stored using this method.
 */
export default abstract class WordPersistable<Type> {
  protected abstract propertyKey: string;

  async save(context: Word.RequestContext): Promise<void> {
    // Overwrite custom data
    context.document.properties.customProperties.add(this.propertyKey, JSON.stringify(this));
    // Force saving of document
    context.document.save();

    await context.sync();

    console.debug("Saved " + this.propertyKey + " as ", JSON.stringify(this));
  }

  async saveAsync(): Promise<void> {
    return Word.run(async (context) => this.save(context));
  }

  async load(): Promise<Type> {
    return Word.run(async (context) => {
      context.load(context.document.properties.customProperties);
      const customProp = context.document.properties.customProperties.getItemOrNullObject(this.propertyKey);

      // required for .isNullObject check
      await context.sync();
      if (customProp.isNullObject) {
        return this.newEmpty();
      }

      customProp.load("value");

      await context.sync();

      const json = customProp.value;
      if (json == null) {
        return this.newEmpty();
      }

      // Use custom reviver for parsing
      const loadedObject = JSON.parse(json, this.reviver) as Type;
      this.init(loadedObject, context);

      console.debug("Successfully loaded", loadedObject);
      return loadedObject;
    });
  }

  abstract init(loadedObject: Type, context: Word.RequestContext): void;

  abstract reviver(key: string, value: unknown): unknown;

  abstract newEmpty(): Type;

  abstract copy(): Promise<Type>;
}
