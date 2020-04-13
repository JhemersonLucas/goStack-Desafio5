import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number, 
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    let balance:Balance;

    const income = this.transactions.reduce((accumulator: number, current)=> {
      if(current.type == 'income') return accumulator + current.value;
      else return accumulator;
    }, 0);

    const outcome = this.transactions.reduce((accumulator: number, current)=> {
      if(current.type == 'outcome') return accumulator + current.value;
      else return accumulator;
    }, 0);

    balance = {
      income, outcome, total: income - outcome
    }

    return balance;
  }

  public create({title, value, type} : Request ): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
