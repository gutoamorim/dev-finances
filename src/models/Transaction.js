export class Transaction {
  constructor({ type, description, amount, date }) {
    this.id = Math.floor(Math.random() * 100000000);
    (this.description = description),
      (this.amount = +amount),
      // (this.date = new Date(date));
      (this.date = date);
  }
}
