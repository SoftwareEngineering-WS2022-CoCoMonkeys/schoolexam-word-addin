/**
 * A natural person. Only contains minimal information for data protection purposes.
 */
export default class Person {
  /** The birth date this person */
  dateOfBirth: Date;
  /** The email address this person can be reached by. Preferably issued by the school itself */
  emailAddress: string;
  /** The first name of this person, including titles and honoraries. */
  firstName: string;
  /** The last name of this person */
  lastName: string;

  constructor(dateOfBirth: Date, emailAddress: string, firstName: string, lastName: string) {
    this.dateOfBirth = dateOfBirth;
    this.emailAddress = emailAddress;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
