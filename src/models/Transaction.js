export class Transaction {
  constructor({ description, amount, date }) {
    this.id = Math.floor(Math.random() * 100000000);
    this.description = description;
    this.amount = +amount;
    this.date = date;
    // (this.date = new Date(date));
  }
}
