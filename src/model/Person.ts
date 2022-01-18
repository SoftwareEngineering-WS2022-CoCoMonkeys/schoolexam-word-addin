export default class Person {
  dateOfBirth: Date;
  emailAddress: string;
  firstName: string;
  lastName: string;

  constructor(dateOfBirth: Date, emailAddress: string, firstName: string, lastName: string) {
    this.dateOfBirth = dateOfBirth;
    this.emailAddress = emailAddress;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
