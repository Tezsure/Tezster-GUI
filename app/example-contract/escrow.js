module.exports = {
  contract: `parameter (or (or (unit %addBalanceCounterparty) (unit %addBalanceOwner)) (or (bytes %claimCounterparty) (unit %claimOwner)));
  storage   (pair (pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))));
  code
    {
      DUP;        # pair @parameter @storage : pair @parameter @storage
      CDR;        # @storage : pair @parameter @storage
      SWAP;       # pair @parameter @storage : @storage
      CAR;        # @parameter : @storage
      IF_LEFT
        {
          IF_LEFT
            {
              DROP;       # @storage
              # == addBalanceCounterparty ==
              # sp.verify(self.data.balanceCounterparty == sp.tez(0)) # @storage
              DUP;        # @storage : @storage
              CAAAR;      # mutez : @storage
              PUSH mutez 0; # mutez : mutez : @storage
              COMPARE;    # int : @storage
              EQ;         # bool : @storage
              IF
                {}
                {
                  PUSH string "WrongCondition: self.data.balanceCounterparty == sp.tez(0)"; # string : @storage
                  FAILWITH;   # FAILED
                }; # @storage
              # sp.verify(sp.amount == self.data.fromCounterparty) # @storage
              DUP;        # @storage : @storage
              CDAAR;      # mutez : @storage
              AMOUNT;     # mutez : mutez : @storage
              COMPARE;    # int : @storage
              EQ;         # bool : @storage
              IF
                {}
                {
                  PUSH string "WrongCondition: sp.amount == self.data.fromCounterparty"; # string : @storage
                  FAILWITH;   # FAILED
                }; # @storage
              # self.data.balanceCounterparty = self.data.fromCounterparty # @storage
              DUP;        # @storage : @storage
              DUP;        # @storage : @storage : @storage
              CDR;        # pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage : @storage
              SWAP;       # @storage : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              CAR;        # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              DUP;        # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              CDR;        # pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              SWAP;       # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              CADR;       # mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              DIG 3;      # @storage : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))
              CDAAR;      # mutez : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))
              PAIR;       # pair mutez mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))
              PAIR;       # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))
              PAIR;       # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)))
            }
            {
              DROP;       # @storage
              # == addBalanceOwner ==
              # sp.verify(self.data.balanceOwner == sp.tez(0)) # @storage
              DUP;        # @storage : @storage
              CAADR;      # mutez : @storage
              PUSH mutez 0; # mutez : mutez : @storage
              COMPARE;    # int : @storage
              EQ;         # bool : @storage
              IF
                {}
                {
                  PUSH string "WrongCondition: self.data.balanceOwner == sp.tez(0)"; # string : @storage
                  FAILWITH;   # FAILED
                }; # @storage
              # sp.verify(sp.amount == self.data.fromOwner) # @storage
              DUP;        # @storage : @storage
              CDADR;      # mutez : @storage
              AMOUNT;     # mutez : mutez : @storage
              COMPARE;    # int : @storage
              EQ;         # bool : @storage
              IF
                {}
                {
                  PUSH string "WrongCondition: sp.amount == self.data.fromOwner"; # string : @storage
                  FAILWITH;   # FAILED
                }; # @storage
              # self.data.balanceOwner = self.data.fromOwner # @storage
              DUP;        # @storage : @storage
              DUP;        # @storage : @storage : @storage
              CDR;        # pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage : @storage
              SWAP;       # @storage : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              CAR;        # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              DUP;        # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              CDR;        # pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              SWAP;       # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              CAAR;       # mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage
              DIG 3;      # @storage : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))
              CDADR;      # mutez : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))
              SWAP;       # mutez : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))
              PAIR;       # pair mutez mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))
              PAIR;       # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))
              PAIR;       # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)))
            }; # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)))
          NIL operation; # list operation : pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)))
        }
        {
          IF_LEFT
            {
              SWAP;       # @storage : @parameter%claimCounterparty
              # == claimCounterparty ==
              # sp.verify(sp.now < self.data.epoch) # @storage : @parameter%claimCounterparty
              DUP;        # @storage : @storage : @parameter%claimCounterparty
              DUG 2;      # @storage : @parameter%claimCounterparty : @storage
              CADDR;      # timestamp : @parameter%claimCounterparty : @storage
              NOW;        # timestamp : timestamp : @parameter%claimCounterparty : @storage
              COMPARE;    # int : @parameter%claimCounterparty : @storage
              LT;         # bool : @parameter%claimCounterparty : @storage
              IF
                {}
                {
                  PUSH string "WrongCondition: sp.now < self.data.epoch"; # string : @parameter%claimCounterparty : @storage
                  FAILWITH;   # FAILED
                }; # @parameter%claimCounterparty : @storage
              # sp.verify(self.data.hashedSecret == sp.blake2b(params.secret)) # @parameter%claimCounterparty : @storage
              BLAKE2B;    # bytes : @storage
              SWAP;       # @storage : bytes
              DUP;        # @storage : @storage : bytes
              DUG 2;      # @storage : bytes : @storage
              CDDAR;      # bytes : bytes : @storage
              COMPARE;    # int : @storage
              EQ;         # bool : @storage
              IF
                {}
                {
                  PUSH string "WrongCondition: self.data.hashedSecret == sp.blake2b(params.secret)"; # string : @storage
                  FAILWITH;   # FAILED
                }; # @storage
              # sp.verify(sp.sender == self.data.counterparty) # @storage
              DUP;        # @storage : @storage
              CADAR;      # address : @storage
              SENDER;     # address : address : @storage
              COMPARE;    # int : @storage
              EQ;         # bool : @storage
              IF
                {}
                {
                  PUSH string "WrongCondition: sp.sender == self.data.counterparty"; # string : @storage
                  FAILWITH;   # FAILED
                }; # @storage
              # sp.send(self.data.counterparty, self.data.balanceOwner + self.data.balanceCounterparty) # @storage
              DUP;        # @storage : @storage
              CADAR;      # address : @storage
              CONTRACT unit; # option (contract unit) : @storage
              NIL operation; # list operation : option (contract unit) : @storage
              SWAP;       # option (contract unit) : list operation : @storage
              IF_SOME
                {}
                {
                  PUSH int 30; # int : list operation : @storage
                  FAILWITH;   # FAILED
                }; # @some : list operation : @storage
              DIG 2;      # @storage : @some : list operation
              DUP;        # @storage : @storage : @some : list operation
              CAAAR;      # mutez : @storage : @some : list operation
              SWAP;       # @storage : mutez : @some : list operation
              DUP;        # @storage : @storage : mutez : @some : list operation
              DUG 4;      # @storage : mutez : @some : list operation : @storage
              CAADR;      # mutez : mutez : @some : list operation : @storage
              ADD;        # mutez : @some : list operation : @storage
              UNIT;       # unit : mutez : @some : list operation : @storage
              TRANSFER_TOKENS; # operation : list operation : @storage
              CONS;       # list operation : @storage
              SWAP;       # @storage : list operation
              # self.data.balanceOwner = sp.tez(0) # @storage : list operation
              DUP;        # @storage : @storage : list operation
              CDR;        # pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage : list operation
              SWAP;       # @storage : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CAR;        # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              DUP;        # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CDR;        # pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              SWAP;       # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CAAR;       # mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PUSH mutez 0; # mutez : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              SWAP;       # mutez : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair mutez mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              # self.data.balanceCounterparty = sp.tez(0) # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              DUP;        # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              CDR;        # pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              SWAP;       # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CAR;        # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              DUP;        # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CDR;        # pair (address %counterparty) (timestamp %epoch) : pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              SWAP;       # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CADR;       # mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PUSH mutez 0; # mutez : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair mutez mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              SWAP;       # list operation : pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)))
            }
            {
              DROP;       # @storage
              # == claimOwner ==
              # sp.verify(self.data.epoch < sp.now) # @storage
              DUP;        # @storage : @storage
              CADDR;      # timestamp : @storage
              NOW;        # timestamp : timestamp : @storage
              COMPARE;    # int : @storage
              GT;         # bool : @storage
              IF
                {}
                {
                  PUSH string "WrongCondition: self.data.epoch < sp.now"; # string : @storage
                  FAILWITH;   # FAILED
                }; # @storage
              # sp.verify(sp.sender == self.data.owner) # @storage
              DUP;        # @storage : @storage
              CDDDR;      # address : @storage
              SENDER;     # address : address : @storage
              COMPARE;    # int : @storage
              EQ;         # bool : @storage
              IF
                {}
                {
                  PUSH string "WrongCondition: sp.sender == self.data.owner"; # string : @storage
                  FAILWITH;   # FAILED
                }; # @storage
              # sp.send(self.data.owner, self.data.balanceOwner + self.data.balanceCounterparty) # @storage
              DUP;        # @storage : @storage
              CDDDR;      # address : @storage
              CONTRACT unit; # option (contract unit) : @storage
              NIL operation; # list operation : option (contract unit) : @storage
              SWAP;       # option (contract unit) : list operation : @storage
              IF_SOME
                {}
                {
                  PUSH int 30; # int : list operation : @storage
                  FAILWITH;   # FAILED
                }; # @some : list operation : @storage
              DIG 2;      # @storage : @some : list operation
              DUP;        # @storage : @storage : @some : list operation
              CAAAR;      # mutez : @storage : @some : list operation
              SWAP;       # @storage : mutez : @some : list operation
              DUP;        # @storage : @storage : mutez : @some : list operation
              DUG 4;      # @storage : mutez : @some : list operation : @storage
              CAADR;      # mutez : mutez : @some : list operation : @storage
              ADD;        # mutez : @some : list operation : @storage
              UNIT;       # unit : mutez : @some : list operation : @storage
              TRANSFER_TOKENS; # operation : list operation : @storage
              CONS;       # list operation : @storage
              SWAP;       # @storage : list operation
              # self.data.balanceOwner = sp.tez(0) # @storage : list operation
              DUP;        # @storage : @storage : list operation
              CDR;        # pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : @storage : list operation
              SWAP;       # @storage : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CAR;        # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              DUP;        # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CDR;        # pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              SWAP;       # pair (pair (mutez %balanceCounterparty) (mutez %balanceOwner)) (pair (address %counterparty) (timestamp %epoch)) : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CAAR;       # mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PUSH mutez 0; # mutez : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              SWAP;       # mutez : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair mutez mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              # self.data.balanceCounterparty = sp.tez(0) # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              DUP;        # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              CDR;        # pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              SWAP;       # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CAR;        # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              DUP;        # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CDR;        # pair (address %counterparty) (timestamp %epoch) : pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              SWAP;       # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              CADR;       # mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PUSH mutez 0; # mutez : mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair mutez mutez : pair (address %counterparty) (timestamp %epoch) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch)) : pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)) : list operation
              PAIR;       # pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))) : list operation
              SWAP;       # list operation : pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)))
            }; # list operation : pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)))
        }; # list operation : pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner)))
      PAIR;       # pair (list operation) (pair (pair (pair mutez mutez) (pair (address %counterparty) (timestamp %epoch))) (pair (pair (mutez %fromCounterparty) (mutez %fromOwner)) (pair (bytes %hashedSecret) (address %owner))))
    };
  `,
};
