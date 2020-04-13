import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string,
  value: number, 
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {
    if(type != 'income' && type != 'outcome'){
      throw Error('O tipo de transação não é válido.');
    }
    const balance = this.transactionsRepository.getBalance();
    if(type == 'outcome' && balance.total <= 0){
      throw Error('Não há valor em caixa para ser retirado.');
    }else if(type == 'outcome' && value > balance.total){
      throw Error('O valor em caixa é inferior ao solicitado.')
    }

    const transaction = this.transactionsRepository.create({title, value, type});
    return transaction;
  }
}

export default CreateTransactionService;
