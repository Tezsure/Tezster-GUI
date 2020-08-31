module.exports = {
  contract: `parameter (or (or (or (pair %approve (address %spender) (nat %value)) (pair %burn (address %address) (nat %value))) (or (pair %getAdministrator unit address) (or (pair %getAllowance (pair (address %owner) (address %spender)) address) (pair %getBalance address address)))) (or (or (pair %getTotalSupply unit address) (pair %mint (address %address) (nat %value))) (or (address %setAdministrator) (or (bool %setPause) (pair %transfer (address %from) (pair (address %to) (nat %value)))))));
storage   (pair (pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance)))) (pair (bool %paused) (nat %totalSupply)));
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
            IF_LEFT
              {
                SWAP;       # @storage : @parameter%approve
                # == approve ==
                # sp.verify(~ self.data.paused) # @storage : @parameter%approve
                DUP;        # @storage : @storage : @parameter%approve
                DUG 2;      # @storage : @parameter%approve : @storage
                CDAR;       # bool : @parameter%approve : @storage
                IF
                  {
                    PUSH string "WrongCondition: ~ self.data.paused"; # string : @parameter%approve : @storage
                    FAILWITH;   # FAILED
                  }
                  {}; # @parameter%approve : @storage
                # sp.verify((self.data.balances[sp.sender].approvals.get(params.spender, default_value = 0) == 0) | (params.value == 0)) # @parameter%approve : @storage
                PUSH nat 0; # nat : @parameter%approve : @storage
                DIG 2;      # @storage : nat : @parameter%approve
                DUP;        # @storage : @storage : nat : @parameter%approve
                DUG 3;      # @storage : nat : @parameter%approve : @storage
                CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%approve : @storage
                SENDER;     # address : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%approve : @storage
                GET;        # option (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%approve : @storage
                IF_SOME
                  {
                    # of_some: Get-item:28 # @some : nat : @parameter%approve : @storage
                  }
                  {
                    PUSH int 28; # int : nat : @parameter%approve : @storage
                    FAILWITH;   # FAILED
                  }; # @some : nat : @parameter%approve : @storage
                CAR;        # map address nat : nat : @parameter%approve : @storage
                DIG 2;      # @parameter%approve : map address nat : nat : @storage
                DUP;        # @parameter%approve : @parameter%approve : map address nat : nat : @storage
                DUG 3;      # @parameter%approve : map address nat : nat : @parameter%approve : @storage
                CAR;        # address : map address nat : nat : @parameter%approve : @storage
                GET;        # option nat : nat : @parameter%approve : @storage
                IF_SOME
                  {
                    # of_some: Get-item:28 # @some : nat : @parameter%approve : @storage
                  }
                  {
                    PUSH nat 0; # nat : nat : @parameter%approve : @storage
                  }; # @some : nat : @parameter%approve : @storage
                COMPARE;    # int : @parameter%approve : @storage
                EQ;         # bool : @parameter%approve : @storage
                IF
                  {
                    PUSH bool True; # bool : @parameter%approve : @storage
                  }
                  {
                    DUP;        # @parameter%approve : @parameter%approve : @storage
                    CDR;        # nat : @parameter%approve : @storage
                    PUSH nat 0; # nat : nat : @parameter%approve : @storage
                    COMPARE;    # int : @parameter%approve : @storage
                    EQ;         # bool : @parameter%approve : @storage
                  }; # bool : @parameter%approve : @storage
                IF
                  {}
                  {
                    PUSH string "WrongCondition: (self.data.balances[sp.sender].approvals.get(params.spender, default_value = 0) == 0) | (params.value == 0)"; # string : @parameter%approve : @storage
                    FAILWITH;   # FAILED
                  }; # @parameter%approve : @storage
                SWAP;       # @storage : @parameter%approve
                # self.data.balances[sp.sender].approvals[params.spender] = params.value # @storage : @parameter%approve
                DUP;        # @storage : @storage : @parameter%approve
                CDR;        # pair (bool %paused) (nat %totalSupply) : @storage : @parameter%approve
                SWAP;       # @storage : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                CAR;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                DUP;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                CAR;        # address : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                SWAP;       # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                CDR;        # big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                DUP;        # big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                SENDER;     # address : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                DUP;        # address : address : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                DUG 2;      # address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                GET;        # option (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                IF_SOME
                  {}
                  {
                    PUSH int 30; # int : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                    FAILWITH;   # FAILED
                  }; # @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                DUP;        # @some : @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                CDR;        # nat : @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                SWAP;       # @some : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                CAR;        # map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%approve
                DIG 6;      # @parameter%approve : map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                DUP;        # @parameter%approve : @parameter%approve : map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                CAR;        # address : @parameter%approve : map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                SWAP;       # @parameter%approve : address : map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                CDR;        # nat : address : map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                SOME;       # option nat : address : map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                SWAP;       # address : option nat : map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                UPDATE;     # map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                PAIR;       # pair (map address nat) nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                SOME;       # option (pair (map address nat) nat) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                SWAP;       # address : option (pair (map address nat) nat) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                UPDATE;     # big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                SWAP;       # address : big_map address (pair (map address nat) nat) : pair (bool %paused) (nat %totalSupply)
                PAIR;       # pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply)
                PAIR;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
              }
              {
                SWAP;       # @storage : @parameter%burn
                # == burn ==
                # sp.verify(sp.sender == self.data.administrator) # @storage : @parameter%burn
                DUP;        # @storage : @storage : @parameter%burn
                DUG 2;      # @storage : @parameter%burn : @storage
                CAAR;       # address : @parameter%burn : @storage
                SENDER;     # address : address : @parameter%burn : @storage
                COMPARE;    # int : @parameter%burn : @storage
                EQ;         # bool : @parameter%burn : @storage
                IF
                  {}
                  {
                    PUSH string "WrongCondition: sp.sender == self.data.administrator"; # string : @parameter%burn : @storage
                    FAILWITH;   # FAILED
                  }; # @parameter%burn : @storage
                # sp.verify(self.data.balances[params.address].balance >= params.value) # @parameter%burn : @storage
                DUP;        # @parameter%burn : @parameter%burn : @storage
                CDR;        # nat : @parameter%burn : @storage
                DIG 2;      # @storage : nat : @parameter%burn
                DUP;        # @storage : @storage : nat : @parameter%burn
                DUG 3;      # @storage : nat : @parameter%burn : @storage
                CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%burn : @storage
                DIG 2;      # @parameter%burn : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @storage
                DUP;        # @parameter%burn : @parameter%burn : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @storage
                DUG 3;      # @parameter%burn : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%burn : @storage
                CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%burn : @storage
                GET;        # option (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%burn : @storage
                IF_SOME
                  {
                    # of_some: Get-item:56 # @some : nat : @parameter%burn : @storage
                  }
                  {
                    PUSH int 56; # int : nat : @parameter%burn : @storage
                    FAILWITH;   # FAILED
                  }; # @some : nat : @parameter%burn : @storage
                CDR;        # nat : nat : @parameter%burn : @storage
                COMPARE;    # int : @parameter%burn : @storage
                GE;         # bool : @parameter%burn : @storage
                IF
                  {}
                  {
                    PUSH string "WrongCondition: self.data.balances[params.address].balance >= params.value"; # string : @parameter%burn : @storage
                    FAILWITH;   # FAILED
                  }; # @parameter%burn : @storage
                SWAP;       # @storage : @parameter%burn
                # self.data.balances[params.address].balance = sp.as_nat(self.data.balances[params.address].balance - params.value) # @storage : @parameter%burn
                DUP;        # @storage : @storage : @parameter%burn
                DUG 2;      # @storage : @parameter%burn : @storage
                DUP;        # @storage : @storage : @parameter%burn : @storage
                CDR;        # pair (bool %paused) (nat %totalSupply) : @storage : @parameter%burn : @storage
                SWAP;       # @storage : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                CAR;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                DUP;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                CAR;        # address : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                SWAP;       # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                CDR;        # big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                DUP;        # big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                DIG 4;      # @parameter%burn : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @storage
                DUP;        # @parameter%burn : @parameter%burn : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @storage
                DUG 5;      # @parameter%burn : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                DUP;        # address : address : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                DUG 2;      # address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                GET;        # option (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                IF_SOME
                  {}
                  {
                    PUSH int 57; # int : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                    FAILWITH;   # FAILED
                  }; # @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                CAR;        # map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                DIG 5;      # @parameter%burn : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @storage
                DUP;        # @parameter%burn : @parameter%burn : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @storage
                DUG 6;      # @parameter%burn : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                CDR;        # nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn : @storage
                DIG 7;      # @storage : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                DIG 7;      # @parameter%burn : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                DUP;        # @parameter%burn : @parameter%burn : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                DUG 8;      # @parameter%burn : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                GET;        # option (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                IF_SOME
                  {
                    # of_some: Get-item:57 # @some : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                  }
                  {
                    PUSH int 57; # int : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                    FAILWITH;   # FAILED
                  }; # @some : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                CDR;        # nat : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                SUB;        # int : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                ISNAT;      # option nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                IF_SOME
                  {}
                  {
                    PUSH int 57; # int : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                    FAILWITH;   # FAILED
                  }; # @some : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                SWAP;       # map address nat : @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                PAIR;       # pair (map address nat) @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                SOME;       # option (pair (map address nat) @some) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                SWAP;       # address : option (pair (map address nat) @some) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                UPDATE;     # big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                SWAP;       # address : big_map address (pair (map address nat) nat) : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                PAIR;       # pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%burn
                PAIR;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%burn
                # self.data.totalSupply = sp.as_nat(self.data.totalSupply - params.value) # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%burn
                DUP;        # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%burn
                DUG 2;      # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%burn : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                DUP;        # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%burn : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                CAR;        # pair address (big_map address (pair (map address nat) nat)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%burn : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                SWAP;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair address (big_map address (pair (map address nat) nat)) : @parameter%burn : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                CDAR;       # bool : pair address (big_map address (pair (map address nat) nat)) : @parameter%burn : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                DIG 2;      # @parameter%burn : bool : pair address (big_map address (pair (map address nat) nat)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                CDR;        # nat : bool : pair address (big_map address (pair (map address nat) nat)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                DIG 3;      # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : nat : bool : pair address (big_map address (pair (map address nat) nat))
                CDDR;       # nat : nat : bool : pair address (big_map address (pair (map address nat) nat))
                SUB;        # int : bool : pair address (big_map address (pair (map address nat) nat))
                ISNAT;      # option nat : bool : pair address (big_map address (pair (map address nat) nat))
                IF_SOME
                  {}
                  {
                    PUSH int 58; # int : bool : pair address (big_map address (pair (map address nat) nat))
                    FAILWITH;   # FAILED
                  }; # @some : bool : pair address (big_map address (pair (map address nat) nat))
                SWAP;       # bool : @some : pair address (big_map address (pair (map address nat) nat))
                PAIR;       # pair bool @some : pair address (big_map address (pair (map address nat) nat))
                SWAP;       # pair address (big_map address (pair (map address nat) nat)) : pair bool @some
                PAIR;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair bool @some)
              }; # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
            NIL operation; # list operation : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
          }
          {
            IF_LEFT
              {
                SWAP;       # @storage : @parameter%getAdministrator
                # == getAdministrator ==
                # sp.result(self.data.administrator) # @storage : @parameter%getAdministrator
                DUP;        # @storage : @storage : @parameter%getAdministrator
                DUG 2;      # @storage : @parameter%getAdministrator : @storage
                CAAR;       # address : @parameter%getAdministrator : @storage
                # sp.transfer(__s1.value, sp.tez(0), sp.contract(sp.TAddress, sp.snd(params)).open_some()) # address : @parameter%getAdministrator : @storage
                NIL operation; # list operation : address : @parameter%getAdministrator : @storage
                DIG 2;      # @parameter%getAdministrator : list operation : address : @storage
                CDR;        # address : list operation : address : @storage
                CONTRACT address; # option (contract address) : list operation : address : @storage
                IF_SOME
                  {}
                  {
                    PUSH int 8; # int : list operation : address : @storage
                    FAILWITH;   # FAILED
                  }; # @some : list operation : address : @storage
                PUSH mutez 0; # mutez : @some : list operation : address : @storage
                DIG 3;      # address : mutez : @some : list operation : @storage
                TRANSFER_TOKENS; # operation : list operation : @storage
                CONS;       # list operation : @storage
              }
              {
                IF_LEFT
                  {
                    SWAP;       # @storage : @parameter%getAllowance
                    # == getAllowance ==
                    # sp.result(self.data.balances[sp.fst(params).owner].approvals[sp.fst(params).spender]) # @storage : @parameter%getAllowance
                    DUP;        # @storage : @storage : @parameter%getAllowance
                    DUG 2;      # @storage : @parameter%getAllowance : @storage
                    CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%getAllowance : @storage
                    SWAP;       # @parameter%getAllowance : big_map address (pair (map %approvals address nat) (nat %balance)) : @storage
                    DUP;        # @parameter%getAllowance : @parameter%getAllowance : big_map address (pair (map %approvals address nat) (nat %balance)) : @storage
                    DUG 2;      # @parameter%getAllowance : big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%getAllowance : @storage
                    CAAR;       # address : big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%getAllowance : @storage
                    GET;        # option (pair (map %approvals address nat) (nat %balance)) : @parameter%getAllowance : @storage
                    IF_SOME
                      {
                        # of_some: Get-item:70 # @some : @parameter%getAllowance : @storage
                      }
                      {
                        PUSH int 70; # int : @parameter%getAllowance : @storage
                        FAILWITH;   # FAILED
                      }; # @some : @parameter%getAllowance : @storage
                    CAR;        # map address nat : @parameter%getAllowance : @storage
                    SWAP;       # @parameter%getAllowance : map address nat : @storage
                    DUP;        # @parameter%getAllowance : @parameter%getAllowance : map address nat : @storage
                    DUG 2;      # @parameter%getAllowance : map address nat : @parameter%getAllowance : @storage
                    CADR;       # address : map address nat : @parameter%getAllowance : @storage
                    GET;        # option nat : @parameter%getAllowance : @storage
                    IF_SOME
                      {
                        # of_some: Get-item:70 # @some : @parameter%getAllowance : @storage
                      }
                      {
                        PUSH int 70; # int : @parameter%getAllowance : @storage
                        FAILWITH;   # FAILED
                      }; # @some : @parameter%getAllowance : @storage
                    # sp.transfer(__s2.value, sp.tez(0), sp.contract(sp.TNat, sp.snd(params)).open_some()) # @some : @parameter%getAllowance : @storage
                    NIL operation; # list operation : @some : @parameter%getAllowance : @storage
                    DIG 2;      # @parameter%getAllowance : list operation : @some : @storage
                    CDR;        # address : list operation : @some : @storage
                    CONTRACT nat; # option (contract nat) : list operation : @some : @storage
                    IF_SOME
                      {}
                      {
                        PUSH int 8; # int : list operation : @some : @storage
                        FAILWITH;   # FAILED
                      }; # @some : list operation : @some : @storage
                    PUSH mutez 0; # mutez : @some : list operation : @some : @storage
                    DIG 3;      # @some : mutez : @some : list operation : @storage
                    TRANSFER_TOKENS; # operation : list operation : @storage
                    CONS;       # list operation : @storage
                  }
                  {
                    SWAP;       # @storage : @parameter%getBalance
                    # == getBalance ==
                    # sp.result(self.data.balances[sp.fst(params)].balance) # @storage : @parameter%getBalance
                    DUP;        # @storage : @storage : @parameter%getBalance
                    DUG 2;      # @storage : @parameter%getBalance : @storage
                    CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%getBalance : @storage
                    SWAP;       # @parameter%getBalance : big_map address (pair (map %approvals address nat) (nat %balance)) : @storage
                    DUP;        # @parameter%getBalance : @parameter%getBalance : big_map address (pair (map %approvals address nat) (nat %balance)) : @storage
                    DUG 2;      # @parameter%getBalance : big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%getBalance : @storage
                    CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%getBalance : @storage
                    GET;        # option (pair (map %approvals address nat) (nat %balance)) : @parameter%getBalance : @storage
                    IF_SOME
                      {
                        # of_some: Get-item:66 # @some : @parameter%getBalance : @storage
                      }
                      {
                        PUSH int 66; # int : @parameter%getBalance : @storage
                        FAILWITH;   # FAILED
                      }; # @some : @parameter%getBalance : @storage
                    CDR;        # nat : @parameter%getBalance : @storage
                    # sp.transfer(__s3.value, sp.tez(0), sp.contract(sp.TNat, sp.snd(params)).open_some()) # nat : @parameter%getBalance : @storage
                    NIL operation; # list operation : nat : @parameter%getBalance : @storage
                    DIG 2;      # @parameter%getBalance : list operation : nat : @storage
                    CDR;        # address : list operation : nat : @storage
                    CONTRACT nat; # option (contract nat) : list operation : nat : @storage
                    IF_SOME
                      {}
                      {
                        PUSH int 8; # int : list operation : nat : @storage
                        FAILWITH;   # FAILED
                      }; # @some : list operation : nat : @storage
                    PUSH mutez 0; # mutez : @some : list operation : nat : @storage
                    DIG 3;      # nat : mutez : @some : list operation : @storage
                    TRANSFER_TOKENS; # operation : list operation : @storage
                    CONS;       # list operation : @storage
                  }; # list operation : @storage
              }; # list operation : @storage
          }; # list operation : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
      }
      {
        IF_LEFT
          {
            IF_LEFT
              {
                SWAP;       # @storage : @parameter%getTotalSupply
                # == getTotalSupply ==
                # sp.result(self.data.totalSupply) # @storage : @parameter%getTotalSupply
                DUP;        # @storage : @storage : @parameter%getTotalSupply
                DUG 2;      # @storage : @parameter%getTotalSupply : @storage
                CDDR;       # nat : @parameter%getTotalSupply : @storage
                # sp.transfer(__s4.value, sp.tez(0), sp.contract(sp.TNat, sp.snd(params)).open_some()) # nat : @parameter%getTotalSupply : @storage
                NIL operation; # list operation : nat : @parameter%getTotalSupply : @storage
                DIG 2;      # @parameter%getTotalSupply : list operation : nat : @storage
                CDR;        # address : list operation : nat : @storage
                CONTRACT nat; # option (contract nat) : list operation : nat : @storage
                IF_SOME
                  {}
                  {
                    PUSH int 8; # int : list operation : nat : @storage
                    FAILWITH;   # FAILED
                  }; # @some : list operation : nat : @storage
                PUSH mutez 0; # mutez : @some : list operation : nat : @storage
                DIG 3;      # nat : mutez : @some : list operation : @storage
                TRANSFER_TOKENS; # operation : list operation : @storage
                CONS;       # list operation : @storage
              }
              {
                SWAP;       # @storage : @parameter%mint
                # == mint ==
                # sp.verify(sp.sender == self.data.administrator) # @storage : @parameter%mint
                DUP;        # @storage : @storage : @parameter%mint
                DUG 2;      # @storage : @parameter%mint : @storage
                CAAR;       # address : @parameter%mint : @storage
                SENDER;     # address : address : @parameter%mint : @storage
                COMPARE;    # int : @parameter%mint : @storage
                EQ;         # bool : @parameter%mint : @storage
                IF
                  {}
                  {
                    PUSH string "WrongCondition: sp.sender == self.data.administrator"; # string : @parameter%mint : @storage
                    FAILWITH;   # FAILED
                  }; # @parameter%mint : @storage
                SWAP;       # @storage : @parameter%mint
                # if ~ (self.data.balances.contains(params.address)): # @storage : @parameter%mint
                DUP;        # @storage : @storage : @parameter%mint
                DUG 2;      # @storage : @parameter%mint : @storage
                CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%mint : @storage
                SWAP;       # @parameter%mint : big_map address (pair (map %approvals address nat) (nat %balance)) : @storage
                DUP;        # @parameter%mint : @parameter%mint : big_map address (pair (map %approvals address nat) (nat %balance)) : @storage
                DUG 2;      # @parameter%mint : big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%mint : @storage
                CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%mint : @storage
                MEM;        # bool : @parameter%mint : @storage
                IF
                  {}
                  {
                    SWAP;       # @storage : @parameter%mint
                    # self.data.balances[params.address] = sp.record(approvals = {}, balance = 0) # @storage : @parameter%mint
                    DUP;        # @storage : @storage : @parameter%mint
                    CDR;        # pair (bool %paused) (nat %totalSupply) : @storage : @parameter%mint
                    SWAP;       # @storage : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    CAR;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    DUP;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    CAR;        # address : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    SWAP;       # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    CDR;        # big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    DIG 3;      # @parameter%mint : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                    DUP;        # @parameter%mint : @parameter%mint : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                    DUG 4;      # @parameter%mint : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    PUSH (option (pair (map %approvals address nat) (nat %balance))) (Some (Pair {} 0)); # option (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    SWAP;       # address : option (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    UPDATE;     # big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    SWAP;       # address : big_map address (pair (map %approvals address nat) (nat %balance)) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    PAIR;       # pair address (big_map address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    PAIR;       # pair (pair address (big_map address (pair (map %approvals address nat) (nat %balance)))) (pair (bool %paused) (nat %totalSupply)) : @parameter%mint
                    SWAP;       # @parameter%mint : pair (pair address (big_map address (pair (map %approvals address nat) (nat %balance)))) (pair (bool %paused) (nat %totalSupply))
                  }; # @parameter%mint : @storage
                SWAP;       # @storage : @parameter%mint
                # self.data.balances[params.address].balance += params.value # @storage : @parameter%mint
                DUP;        # @storage : @storage : @parameter%mint
                CDR;        # pair (bool %paused) (nat %totalSupply) : @storage : @parameter%mint
                SWAP;       # @storage : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                CAR;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                DUP;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                CAR;        # address : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                SWAP;       # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                CDR;        # big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                DUP;        # big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                DIG 4;      # @parameter%mint : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                DUP;        # @parameter%mint : @parameter%mint : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                DUG 5;      # @parameter%mint : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                DUP;        # address : address : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                DUG 2;      # address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                GET;        # option (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                IF_SOME
                  {}
                  {
                    PUSH int 49; # int : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                    FAILWITH;   # FAILED
                  }; # @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                DUP;        # @some : @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                CAR;        # map address nat : @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                SWAP;       # @some : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                CDR;        # nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                DIG 6;      # @parameter%mint : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                DUP;        # @parameter%mint : @parameter%mint : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                DUG 7;      # @parameter%mint : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                CDR;        # nat : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                ADD;        # nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                SWAP;       # map address nat : nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                PAIR;       # pair (map address nat) nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                SOME;       # option (pair (map address nat) nat) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                SWAP;       # address : option (pair (map address nat) nat) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                UPDATE;     # big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                SWAP;       # address : big_map address (pair (map address nat) nat) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                PAIR;       # pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%mint
                PAIR;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%mint
                # self.data.totalSupply += params.value # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%mint
                DUP;        # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%mint
                CAR;        # pair address (big_map address (pair (map address nat) nat)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%mint
                SWAP;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair address (big_map address (pair (map address nat) nat)) : @parameter%mint
                CDR;        # pair (bool %paused) (nat %totalSupply) : pair address (big_map address (pair (map address nat) nat)) : @parameter%mint
                DUP;        # pair (bool %paused) (nat %totalSupply) : pair (bool %paused) (nat %totalSupply) : pair address (big_map address (pair (map address nat) nat)) : @parameter%mint
                CAR;        # bool : pair (bool %paused) (nat %totalSupply) : pair address (big_map address (pair (map address nat) nat)) : @parameter%mint
                SWAP;       # pair (bool %paused) (nat %totalSupply) : bool : pair address (big_map address (pair (map address nat) nat)) : @parameter%mint
                CDR;        # nat : bool : pair address (big_map address (pair (map address nat) nat)) : @parameter%mint
                DIG 3;      # @parameter%mint : nat : bool : pair address (big_map address (pair (map address nat) nat))
                CDR;        # nat : nat : bool : pair address (big_map address (pair (map address nat) nat))
                ADD;        # nat : bool : pair address (big_map address (pair (map address nat) nat))
                SWAP;       # bool : nat : pair address (big_map address (pair (map address nat) nat))
                PAIR;       # pair bool nat : pair address (big_map address (pair (map address nat) nat))
                SWAP;       # pair address (big_map address (pair (map address nat) nat)) : pair bool nat
                PAIR;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair bool nat)
                NIL operation; # list operation : pair (pair address (big_map address (pair (map address nat) nat))) (pair bool nat)
              }; # list operation : @storage
          }
          {
            IF_LEFT
              {
                SWAP;       # @storage : @parameter%setAdministrator
                # == setAdministrator ==
                # sp.verify(sp.sender == self.data.administrator) # @storage : @parameter%setAdministrator
                DUP;        # @storage : @storage : @parameter%setAdministrator
                DUG 2;      # @storage : @parameter%setAdministrator : @storage
                CAAR;       # address : @parameter%setAdministrator : @storage
                SENDER;     # address : address : @parameter%setAdministrator : @storage
                COMPARE;    # int : @parameter%setAdministrator : @storage
                EQ;         # bool : @parameter%setAdministrator : @storage
                IF
                  {}
                  {
                    PUSH string "WrongCondition: sp.sender == self.data.administrator"; # string : @parameter%setAdministrator : @storage
                    FAILWITH;   # FAILED
                  }; # @parameter%setAdministrator : @storage
                SWAP;       # @storage : @parameter%setAdministrator
                # self.data.administrator = params # @storage : @parameter%setAdministrator
                DUP;        # @storage : @storage : @parameter%setAdministrator
                CDR;        # pair (bool %paused) (nat %totalSupply) : @storage : @parameter%setAdministrator
                SWAP;       # @storage : pair (bool %paused) (nat %totalSupply) : @parameter%setAdministrator
                CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : pair (bool %paused) (nat %totalSupply) : @parameter%setAdministrator
                DIG 2;      # @parameter%setAdministrator : big_map address (pair (map %approvals address nat) (nat %balance)) : pair (bool %paused) (nat %totalSupply)
                PAIR;       # pair @parameter%setAdministrator (big_map address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply)
                PAIR;       # pair (pair @parameter%setAdministrator (big_map address (pair (map %approvals address nat) (nat %balance)))) (pair (bool %paused) (nat %totalSupply))
              }
              {
                IF_LEFT
                  {
                    SWAP;       # @storage : @parameter%setPause
                    # == setPause ==
                    # sp.verify(sp.sender == self.data.administrator) # @storage : @parameter%setPause
                    DUP;        # @storage : @storage : @parameter%setPause
                    DUG 2;      # @storage : @parameter%setPause : @storage
                    CAAR;       # address : @parameter%setPause : @storage
                    SENDER;     # address : address : @parameter%setPause : @storage
                    COMPARE;    # int : @parameter%setPause : @storage
                    EQ;         # bool : @parameter%setPause : @storage
                    IF
                      {}
                      {
                        PUSH string "WrongCondition: sp.sender == self.data.administrator"; # string : @parameter%setPause : @storage
                        FAILWITH;   # FAILED
                      }; # @parameter%setPause : @storage
                    SWAP;       # @storage : @parameter%setPause
                    # self.data.paused = params # @storage : @parameter%setPause
                    DUP;        # @storage : @storage : @parameter%setPause
                    CAR;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : @storage : @parameter%setPause
                    SWAP;       # @storage : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : @parameter%setPause
                    CDDR;       # nat : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : @parameter%setPause
                    DIG 2;      # @parameter%setPause : nat : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance)))
                    PAIR;       # pair @parameter%setPause nat : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance)))
                    SWAP;       # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair @parameter%setPause nat
                    PAIR;       # pair (pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance)))) (pair @parameter%setPause nat)
                  }
                  {
                    SWAP;       # @storage : @parameter%transfer
                    # == transfer ==
                    # sp.verify((sp.sender == self.data.administrator) | ((~ self.data.paused) & ((params.from_ == sp.sender) | (self.data.balances[params.from_].approvals[sp.sender] >= params.value)))) # @storage : @parameter%transfer
                    DUP;        # @storage : @storage : @parameter%transfer
                    DUG 2;      # @storage : @parameter%transfer : @storage
                    CAAR;       # address : @parameter%transfer : @storage
                    SENDER;     # address : address : @parameter%transfer : @storage
                    COMPARE;    # int : @parameter%transfer : @storage
                    EQ;         # bool : @parameter%transfer : @storage
                    IF
                      {
                        PUSH bool True; # bool : @parameter%transfer : @storage
                      }
                      {
                        SWAP;       # @storage : @parameter%transfer
                        DUP;        # @storage : @storage : @parameter%transfer
                        DUG 2;      # @storage : @parameter%transfer : @storage
                        CDAR;       # bool : @parameter%transfer : @storage
                        IF
                          {
                            PUSH bool False; # bool : @parameter%transfer : @storage
                          }
                          {
                            DUP;        # @parameter%transfer : @parameter%transfer : @storage
                            CAR;        # address : @parameter%transfer : @storage
                            SENDER;     # address : address : @parameter%transfer : @storage
                            COMPARE;    # int : @parameter%transfer : @storage
                            EQ;         # bool : @parameter%transfer : @storage
                            IF
                              {
                                PUSH bool True; # bool : @parameter%transfer : @storage
                              }
                              {
                                DUP;        # @parameter%transfer : @parameter%transfer : @storage
                                CDDR;       # nat : @parameter%transfer : @storage
                                DIG 2;      # @storage : nat : @parameter%transfer
                                DUP;        # @storage : @storage : nat : @parameter%transfer
                                DUG 3;      # @storage : nat : @parameter%transfer : @storage
                                CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%transfer : @storage
                                DIG 2;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @storage
                                DUP;        # @parameter%transfer : @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @storage
                                DUG 3;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%transfer : @storage
                                CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%transfer : @storage
                                GET;        # option (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%transfer : @storage
                                IF_SOME
                                  {
                                    # of_some: Get-item:13 # @some : nat : @parameter%transfer : @storage
                                  }
                                  {
                                    PUSH int 13; # int : nat : @parameter%transfer : @storage
                                    FAILWITH;   # FAILED
                                  }; # @some : nat : @parameter%transfer : @storage
                                CAR;        # map address nat : nat : @parameter%transfer : @storage
                                SENDER;     # address : map address nat : nat : @parameter%transfer : @storage
                                GET;        # option nat : nat : @parameter%transfer : @storage
                                IF_SOME
                                  {
                                    # of_some: Get-item:13 # @some : nat : @parameter%transfer : @storage
                                  }
                                  {
                                    PUSH int 13; # int : nat : @parameter%transfer : @storage
                                    FAILWITH;   # FAILED
                                  }; # @some : nat : @parameter%transfer : @storage
                                COMPARE;    # int : @parameter%transfer : @storage
                                GE;         # bool : @parameter%transfer : @storage
                              }; # bool : @parameter%transfer : @storage
                          }; # bool : @parameter%transfer : @storage
                      }; # bool : @parameter%transfer : @storage
                    IF
                      {}
                      {
                        PUSH string "WrongCondition: (sp.sender == self.data.administrator) | ((~ self.data.paused) & ((params.from_ == sp.sender) | (self.data.balances[params.from_].approvals[sp.sender] >= params.value)))"; # string : @parameter%transfer : @storage
                        FAILWITH;   # FAILED
                      }; # @parameter%transfer : @storage
                    SWAP;       # @storage : @parameter%transfer
                    # if ~ (self.data.balances.contains(params.to_)): # @storage : @parameter%transfer
                    DUP;        # @storage : @storage : @parameter%transfer
                    DUG 2;      # @storage : @parameter%transfer : @storage
                    CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%transfer : @storage
                    SWAP;       # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : @storage
                    DUP;        # @parameter%transfer : @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : @storage
                    DUG 2;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%transfer : @storage
                    CDAR;       # address : big_map address (pair (map %approvals address nat) (nat %balance)) : @parameter%transfer : @storage
                    MEM;        # bool : @parameter%transfer : @storage
                    IF
                      {}
                      {
                        SWAP;       # @storage : @parameter%transfer
                        # self.data.balances[params.to_] = sp.record(approvals = {}, balance = 0) # @storage : @parameter%transfer
                        DUP;        # @storage : @storage : @parameter%transfer
                        CDR;        # pair (bool %paused) (nat %totalSupply) : @storage : @parameter%transfer
                        SWAP;       # @storage : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        CAR;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        DUP;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        CAR;        # address : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        SWAP;       # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        CDR;        # big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        DIG 3;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                        DUP;        # @parameter%transfer : @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                        DUG 4;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        CDAR;       # address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        PUSH (option (pair (map %approvals address nat) (nat %balance))) (Some (Pair {} 0)); # option (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        SWAP;       # address : option (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        UPDATE;     # big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        SWAP;       # address : big_map address (pair (map %approvals address nat) (nat %balance)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        PAIR;       # pair address (big_map address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        PAIR;       # pair (pair address (big_map address (pair (map %approvals address nat) (nat %balance)))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer
                        SWAP;       # @parameter%transfer : pair (pair address (big_map address (pair (map %approvals address nat) (nat %balance)))) (pair (bool %paused) (nat %totalSupply))
                      }; # @parameter%transfer : @storage
                    # sp.verify(self.data.balances[params.from_].balance >= params.value) # @parameter%transfer : @storage
                    DUP;        # @parameter%transfer : @parameter%transfer : @storage
                    CDDR;       # nat : @parameter%transfer : @storage
                    DIG 2;      # @storage : nat : @parameter%transfer
                    DUP;        # @storage : @storage : nat : @parameter%transfer
                    DUG 3;      # @storage : nat : @parameter%transfer : @storage
                    CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%transfer : @storage
                    DIG 2;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @storage
                    DUP;        # @parameter%transfer : @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @storage
                    DUG 3;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%transfer : @storage
                    CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%transfer : @storage
                    GET;        # option (pair (map %approvals address nat) (nat %balance)) : nat : @parameter%transfer : @storage
                    IF_SOME
                      {
                        # of_some: Get-item:18 # @some : nat : @parameter%transfer : @storage
                      }
                      {
                        PUSH int 18; # int : nat : @parameter%transfer : @storage
                        FAILWITH;   # FAILED
                      }; # @some : nat : @parameter%transfer : @storage
                    CDR;        # nat : nat : @parameter%transfer : @storage
                    COMPARE;    # int : @parameter%transfer : @storage
                    GE;         # bool : @parameter%transfer : @storage
                    IF
                      {}
                      {
                        PUSH string "WrongCondition: self.data.balances[params.from_].balance >= params.value"; # string : @parameter%transfer : @storage
                        FAILWITH;   # FAILED
                      }; # @parameter%transfer : @storage
                    SWAP;       # @storage : @parameter%transfer
                    # self.data.balances[params.from_].balance = sp.as_nat(self.data.balances[params.from_].balance - params.value) # @storage : @parameter%transfer
                    DUP;        # @storage : @storage : @parameter%transfer
                    DUG 2;      # @storage : @parameter%transfer : @storage
                    DUP;        # @storage : @storage : @parameter%transfer : @storage
                    CDR;        # pair (bool %paused) (nat %totalSupply) : @storage : @parameter%transfer : @storage
                    SWAP;       # @storage : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    CAR;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    DUP;        # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    CAR;        # address : pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    SWAP;       # pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance))) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    CDR;        # big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    DUP;        # big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    DIG 4;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @storage
                    DUP;        # @parameter%transfer : @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @storage
                    DUG 5;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    DUP;        # address : address : big_map address (pair (map %approvals address nat) (nat %balance)) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    DUG 2;      # address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    GET;        # option (pair (map %approvals address nat) (nat %balance)) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    IF_SOME
                      {}
                      {
                        PUSH int 19; # int : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                        FAILWITH;   # FAILED
                      }; # @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    CAR;        # map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    DIG 5;      # @parameter%transfer : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @storage
                    DUP;        # @parameter%transfer : @parameter%transfer : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @storage
                    DUG 6;      # @parameter%transfer : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    CDDR;       # nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : @storage
                    DIG 7;      # @storage : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CADR;       # big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    DIG 7;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                    DUP;        # @parameter%transfer : @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply)
                    DUG 8;      # @parameter%transfer : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CAR;        # address : big_map address (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    GET;        # option (pair (map %approvals address nat) (nat %balance)) : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    IF_SOME
                      {
                        # of_some: Get-item:19 # @some : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                      }
                      {
                        PUSH int 19; # int : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        FAILWITH;   # FAILED
                      }; # @some : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CDR;        # nat : nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SUB;        # int : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    ISNAT;      # option nat : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    IF_SOME
                      {}
                      {
                        PUSH int 19; # int : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        FAILWITH;   # FAILED
                      }; # @some : map address nat : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SWAP;       # map address nat : @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    PAIR;       # pair (map address nat) @some : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SOME;       # option (pair (map address nat) @some) : address : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SWAP;       # address : option (pair (map address nat) @some) : big_map address (pair (map %approvals address nat) (nat %balance)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    UPDATE;     # big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SWAP;       # address : big_map address (pair (map address nat) nat) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    PAIR;       # pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    PAIR;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer
                    # self.data.balances[params.to_].balance += params.value # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer
                    DUP;        # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer
                    CDR;        # pair (bool %paused) (nat %totalSupply) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer
                    SWAP;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CAR;        # pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    DUP;        # pair address (big_map address (pair (map address nat) nat)) : pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CAR;        # address : pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SWAP;       # pair address (big_map address (pair (map address nat) nat)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CDR;        # big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    DUP;        # big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    DIG 4;      # @parameter%transfer : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                    DUP;        # @parameter%transfer : @parameter%transfer : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                    DUG 5;      # @parameter%transfer : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CDAR;       # address : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    DUP;        # address : address : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    DUG 2;      # address : big_map address (pair (map address nat) nat) : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    GET;        # option (pair (map address nat) nat) : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    IF_SOME
                      {}
                      {
                        PUSH int 20; # int : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        FAILWITH;   # FAILED
                      }; # @some : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    DUP;        # @some : @some : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CAR;        # map address nat : @some : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SWAP;       # @some : map address nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CDR;        # nat : map address nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    DIG 6;      # @parameter%transfer : nat : map address nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                    DUP;        # @parameter%transfer : @parameter%transfer : nat : map address nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                    DUG 7;      # @parameter%transfer : nat : map address nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    CDDR;       # nat : nat : map address nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    ADD;        # nat : map address nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SWAP;       # map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    PAIR;       # pair (map address nat) nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SOME;       # option (pair (map address nat) nat) : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SWAP;       # address : option (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    UPDATE;     # big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    SWAP;       # address : big_map address (pair (map address nat) nat) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    PAIR;       # pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                    PAIR;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer
                    SWAP;       # @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                    # if (params.from_ != sp.sender) & (self.data.administrator != sp.sender): # @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                    DUP;        # @parameter%transfer : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                    CAR;        # address : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                    SENDER;     # address : address : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                    COMPARE;    # int : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                    NEQ;        # bool : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                    IF
                      {
                        SENDER;     # address : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DIG 2;      # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : address : @parameter%transfer
                        DUP;        # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : address : @parameter%transfer
                        DUG 3;      # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : address : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        CAAR;       # address : address : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        COMPARE;    # int : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        NEQ;        # bool : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                      }
                      {
                        PUSH bool False; # bool : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                      }; # bool : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                    IF
                      {
                        SWAP;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer
                        # self.data.balances[params.from_].approvals[sp.sender] = sp.as_nat(self.data.balances[params.from_].approvals[sp.sender] - params.value) # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer
                        DUP;        # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer
                        DUG 2;      # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUP;        # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        CDR;        # pair (bool %paused) (nat %totalSupply) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        SWAP;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        CAR;        # pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUP;        # pair address (big_map address (pair (map address nat) nat)) : pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        CAR;        # address : pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        SWAP;       # pair address (big_map address (pair (map address nat) nat)) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        CDR;        # big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUP;        # big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DIG 4;      # @parameter%transfer : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUP;        # @parameter%transfer : @parameter%transfer : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUG 5;      # @parameter%transfer : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        CAR;        # address : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUP;        # address : address : big_map address (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUG 2;      # address : big_map address (pair (map address nat) nat) : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        GET;        # option (pair (map address nat) nat) : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        IF_SOME
                          {}
                          {
                            PUSH int 22; # int : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                            FAILWITH;   # FAILED
                          }; # @some : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUP;        # @some : @some : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        CDR;        # nat : @some : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        SWAP;       # @some : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        CAR;        # map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        SENDER;     # address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DIG 7;      # @parameter%transfer : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUP;        # @parameter%transfer : @parameter%transfer : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DUG 8;      # @parameter%transfer : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        CDDR;       # nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                        DIG 9;      # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)) : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        CADR;       # big_map address (pair (map address nat) nat) : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply) : @parameter%transfer
                        DIG 9;      # @parameter%transfer : big_map address (pair (map address nat) nat) : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        CAR;        # address : big_map address (pair (map address nat) nat) : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        GET;        # option (pair (map address nat) nat) : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        IF_SOME
                          {
                            # of_some: Get-item:22 # @some : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                          }
                          {
                            PUSH int 22; # int : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                            FAILWITH;   # FAILED
                          }; # @some : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        CAR;        # map address nat : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        SENDER;     # address : map address nat : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        GET;        # option nat : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        IF_SOME
                          {
                            # of_some: Get-item:22 # @some : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                          }
                          {
                            PUSH int 22; # int : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                            FAILWITH;   # FAILED
                          }; # @some : nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        SUB;        # int : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        ISNAT;      # option nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        IF_SOME
                          {}
                          {
                            PUSH int 22; # int : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                            FAILWITH;   # FAILED
                          }; # @some : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        SOME;       # option nat : address : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        SWAP;       # address : option nat : map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        UPDATE;     # map address nat : nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        PAIR;       # pair (map address nat) nat : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        SOME;       # option (pair (map address nat) nat) : address : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        SWAP;       # address : option (pair (map address nat) nat) : big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        UPDATE;     # big_map address (pair (map address nat) nat) : address : pair (bool %paused) (nat %totalSupply)
                        SWAP;       # address : big_map address (pair (map address nat) nat) : pair (bool %paused) (nat %totalSupply)
                        PAIR;       # pair address (big_map address (pair (map address nat) nat)) : pair (bool %paused) (nat %totalSupply)
                        PAIR;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                      }
                      {
                        DROP;       # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                      }; # pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
                  }; # pair (pair (address %administrator) (big_map %balances address (pair (map %approvals address nat) (nat %balance)))) (pair @parameter%setPause nat)
              }; # pair (pair @parameter%setAdministrator (big_map address (pair (map %approvals address nat) (nat %balance)))) (pair (bool %paused) (nat %totalSupply))
            NIL operation; # list operation : pair (pair @parameter%setAdministrator (big_map address (pair (map %approvals address nat) (nat %balance)))) (pair (bool %paused) (nat %totalSupply))
          }; # list operation : @storage
      }; # list operation : pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply))
    PAIR;       # pair (list operation) (pair (pair address (big_map address (pair (map address nat) nat))) (pair (bool %paused) (nat %totalSupply)))
  };`,
};
