/**
 * Common superclass for custom objects that should be persisted inside {@link Word.CustomProperty}.
 * Consequently, only small objects and config and no binary data is to be stored using this method.
 */
export default abstract class WordPersistable<Type> {
  /** The key used by Word to persist this object */
  protected abstract propertyKey: string;

  /**
   * Asynchronously save this object as a JSON string.
   * @param context The current Word request context
   */
  async save(context: Word.RequestContext): Promise<void> {
    // Overwrite custom data
    context.document.properties.customProperties.add(this.propertyKey, JSON.stringify(this));

    await context.sync();

    console.debug("Saved " + this.propertyKey + " as ", JSON.stringify(this));
  }

  /**
   * Asynchronously save this object as a JSON string.
   */
  async saveAsync(): Promise<void> {
    return Word.run(async (context) => this.save(context));
  }

  /**
   * Asynchronously load this object from the {@link Word.CustomProperty}.
   * @returns The loaded object wrapped in a Promise.
   */
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

  /**
   * Perform initialization.
   * @param loadedObject The loaded object.
   * @param context The current Word request context.
   */
  abstract init(loadedObject: Type, context: Word.RequestContext): void;

  /**
   * The custom reviver used for JSON parsing.
   * @param key The JSON property key
   * @param value The parsed value
   * @returns An object with the correct prototype.
   */
  abstract reviver(key: string, value: unknown): unknown;

  /**
   * @returns An empty, pure instance.
   */
  abstract newEmpty(): Type;
}
