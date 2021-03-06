module.exports = {
  contract: `parameter (or (or (pair %add (nat %x) (nat %y)) (or (nat %factorial) (nat %log2))) (or (pair %multiply (nat %x) (nat %y)) (or (nat %square) (nat %squareRoot))));
  storage   nat;
  code
    {
      DUP;        # pair @parameter @storage : pair @parameter @storage
      CDR;        # @storage : pair @parameter @storage
      SWAP;       # pair @parameter @storage : @storage
      CAR;        # @parameter : @storage
      IF_LEFT
        {
          SWAP;       # @storage : @parameter.left
          DROP;       # @parameter.left
          IF_LEFT
            {
              # == add ==
              # self.data.value = params.x + params.y # @parameter%add
              DUP;        # @parameter%add : @parameter%add
              CDR;        # nat : @parameter%add
              SWAP;       # @parameter%add : nat
              CAR;        # nat : nat
              ADD;        # nat
            }
            {
              IF_LEFT
                {
                  # == factorial ==
                  # self.data.value = 1 # @parameter%factorial
                  PUSH nat 1; # nat : @parameter%factorial
                  SWAP;       # @parameter%factorial : nat
                  # for y in sp.range(1, params + 1): ... (sp.TNat) # @parameter%factorial : nat
                  DUP;        # @parameter%factorial : @parameter%factorial : nat
                  PUSH nat 1; # nat : @parameter%factorial : @parameter%factorial : nat
                  ADD;        # nat : @parameter%factorial : nat
                  PUSH nat 1; # nat : nat : @parameter%factorial : nat
                  DUP;        # nat : nat : nat : @parameter%factorial : nat
                  DIG 2;      # nat : nat : nat : @parameter%factorial : nat
                  DUP;        # nat : nat : nat : nat : @parameter%factorial : nat
                  DUG 3;      # nat : nat : nat : nat : @parameter%factorial : nat
                  COMPARE;    # int : nat : nat : @parameter%factorial : nat
                  GT;         # bool : nat : nat : @parameter%factorial : nat
                  LOOP
                    {
                      # self.data.value *= y # nat : nat : @parameter%factorial : nat
                      DIG 3;      # nat : nat : nat : @parameter%factorial
                      SWAP;       # nat : nat : nat : @parameter%factorial
                      DUP;        # nat : nat : nat : nat : @parameter%factorial
                      DUG 2;      # nat : nat : nat : nat : @parameter%factorial
                      MUL;        # nat : nat : nat : @parameter%factorial
                      DUG 3;      # nat : nat : @parameter%factorial : nat
                      # loop step # nat : nat : @parameter%factorial : nat
                      PUSH nat 1; # nat : nat : nat : @parameter%factorial : nat
                      ADD;        # nat : nat : @parameter%factorial : nat
                      DUP;        # nat : nat : nat : @parameter%factorial : nat
                      DIG 2;      # nat : nat : nat : @parameter%factorial : nat
                      DUP;        # nat : nat : nat : nat : @parameter%factorial : nat
                      DUG 3;      # nat : nat : nat : nat : @parameter%factorial : nat
                      COMPARE;    # int : nat : nat : @parameter%factorial : nat
                      GT;         # bool : nat : nat : @parameter%factorial : nat
                    }; # nat : nat : @parameter%factorial : nat
                  DROP 3;     # nat
                }
                {
                  # == log2 ==
                  # self.data.value = 0 # @parameter%log2
                  PUSH nat 0; # nat : @parameter%log2
                  SWAP;       # @parameter%log2 : nat
                  # y = sp.local("y", params) # @parameter%log2 : nat
                  DUP;        # @parameter%log2 : @parameter%log2 : nat
                  # while y.value > 1 : ... # @parameter%log2 : @parameter%log2 : nat
                  DUP;        # @parameter%log2 : @parameter%log2 : @parameter%log2 : nat
                  PUSH nat 1; # nat : @parameter%log2 : @parameter%log2 : @parameter%log2 : nat
                  COMPARE;    # int : @parameter%log2 : @parameter%log2 : nat
                  LT;         # bool : @parameter%log2 : @parameter%log2 : nat
                  LOOP
                    {
                      # self.data.value += 1 # @parameter%log2 : @parameter%log2 : nat
                      DIG 2;      # nat : @parameter%log2 : @parameter%log2
                      PUSH nat 1; # nat : nat : @parameter%log2 : @parameter%log2
                      ADD;        # nat : @parameter%log2 : @parameter%log2
                      DUG 2;      # @parameter%log2 : @parameter%log2 : nat
                      # y.value //= 2 # @parameter%log2 : @parameter%log2 : nat
                      PUSH nat 2; # nat : @parameter%log2 : @parameter%log2 : nat
                      SWAP;       # @parameter%log2 : nat : @parameter%log2 : nat
                      EDIV;       # option (pair nat nat) : @parameter%log2 : nat
                      IF_SOME
                        {
                          CAR;        # nat : @parameter%log2 : nat
                        }
                        {
                          PUSH int 42; # int : @parameter%log2 : nat
                          FAILWITH;   # FAILED
                        }; # nat : @parameter%log2 : nat
                      # check for next loop: y.value > 1 # nat : @parameter%log2 : nat
                      DUP;        # nat : nat : @parameter%log2 : nat
                      PUSH nat 1; # nat : nat : nat : @parameter%log2 : nat
                      COMPARE;    # int : nat : @parameter%log2 : nat
                      LT;         # bool : nat : @parameter%log2 : nat
                    }; # @parameter%log2 : @parameter%log2 : nat
                  DROP 2;     # nat
                }; # nat
            }; # nat
        }
        {
          IF_LEFT
            {
              SWAP;       # @storage : @parameter%multiply
              DROP;       # @parameter%multiply
              # == multiply ==
              # self.data.value = params.x * params.y # @parameter%multiply
              DUP;        # @parameter%multiply : @parameter%multiply
              CDR;        # nat : @parameter%multiply
              SWAP;       # @parameter%multiply : nat
              CAR;        # nat : nat
              MUL;        # nat
            }
            {
              IF_LEFT
                {
                  SWAP;       # @storage : @parameter%square
                  DROP;       # @parameter%square
                  # == square ==
                  # self.data.value = params * params # @parameter%square
                  DUP;        # @parameter%square : @parameter%square
                  MUL;        # nat
                }
                {
                  # == squareRoot ==
                  # sp.verify(params >= 0) # @parameter%squareRoot : @storage
                  DUP;        # @parameter%squareRoot : @parameter%squareRoot : @storage
                  PUSH nat 0; # nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                  SWAP;       # @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                  COMPARE;    # int : @parameter%squareRoot : @storage
                  GE;         # bool : @parameter%squareRoot : @storage
                  IF
                    {}
                    {
                      PUSH string "WrongCondition: params >= 0"; # string : @parameter%squareRoot : @storage
                      FAILWITH;   # FAILED
                    }; # @parameter%squareRoot : @storage
                  # y = sp.local("y", params) # @parameter%squareRoot : @storage
                  DUP;        # @parameter%squareRoot : @parameter%squareRoot : @storage
                  # while (y.value * y.value) > params : ... # @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUP;        # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUG 2;      # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  SWAP;       # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUP;        # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUG 2;      # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUP;        # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  MUL;        # nat : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  COMPARE;    # int : @parameter%squareRoot : @parameter%squareRoot : @storage
                  GT;         # bool : @parameter%squareRoot : @parameter%squareRoot : @storage
                  LOOP
                    {
                      # y.value = ((params // y.value) + y.value) // 2 # @parameter%squareRoot : @parameter%squareRoot : @storage
                      PUSH nat 2; # nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                      SWAP;       # @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      DUP;        # @parameter%squareRoot : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      DIG 3;      # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : nat : @storage
                      DUP;        # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : nat : @storage
                      DUG 4;      # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      EDIV;       # option (pair nat nat) : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      IF_SOME
                        {
                          CAR;        # nat : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                        }
                        {
                          PUSH int 26; # int : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                          FAILWITH;   # FAILED
                        }; # nat : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      ADD;        # nat : nat : @parameter%squareRoot : @storage
                      EDIV;       # option (pair nat nat) : @parameter%squareRoot : @storage
                      IF_SOME
                        {
                          CAR;        # nat : @parameter%squareRoot : @storage
                        }
                        {
                          PUSH int 26; # int : @parameter%squareRoot : @storage
                          FAILWITH;   # FAILED
                        }; # nat : @parameter%squareRoot : @storage
                      SWAP;       # @parameter%squareRoot : nat : @storage
                      # check for next loop: (y.value * y.value) > params # @parameter%squareRoot : nat : @storage
                      DUP;        # @parameter%squareRoot : @parameter%squareRoot : nat : @storage
                      DUG 2;      # @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      SWAP;       # nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                      DUP;        # nat : nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                      DUG 2;      # nat : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      DUP;        # nat : nat : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      MUL;        # nat : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      COMPARE;    # int : nat : @parameter%squareRoot : @storage
                      GT;         # bool : nat : @parameter%squareRoot : @storage
                    }; # @parameter%squareRoot : @parameter%squareRoot : @storage
                  SWAP;       # @parameter%squareRoot : @parameter%squareRoot : @storage
                  # sp.verify(((y.value * y.value) <= params) & (params < ((y.value + 1) * (y.value + 1)))) # @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUP;        # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUG 2;      # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  SWAP;       # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUP;        # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUG 2;      # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  DUP;        # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  MUL;        # nat : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                  COMPARE;    # int : @parameter%squareRoot : @parameter%squareRoot : @storage
                  LE;         # bool : @parameter%squareRoot : @parameter%squareRoot : @storage
                  IF
                    {
                      DUP;        # @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                      PUSH nat 1; # nat : @parameter%squareRoot : @parameter%squareRoot : @parameter%squareRoot : @storage
                      ADD;        # nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                      PUSH nat 1; # nat : nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                      DIG 2;      # @parameter%squareRoot : nat : nat : @parameter%squareRoot : @storage
                      DUP;        # @parameter%squareRoot : @parameter%squareRoot : nat : nat : @parameter%squareRoot : @storage
                      DUG 3;      # @parameter%squareRoot : nat : nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                      ADD;        # nat : nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                      MUL;        # nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                      DIG 2;      # @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      DUP;        # @parameter%squareRoot : @parameter%squareRoot : nat : @parameter%squareRoot : @storage
                      DUG 3;      # @parameter%squareRoot : nat : @parameter%squareRoot : @parameter%squareRoot : @storage
                      COMPARE;    # int : @parameter%squareRoot : @parameter%squareRoot : @storage
                      LT;         # bool : @parameter%squareRoot : @parameter%squareRoot : @storage
                    }
                    {
                      PUSH bool False; # bool : @parameter%squareRoot : @parameter%squareRoot : @storage
                    }; # bool : @parameter%squareRoot : @parameter%squareRoot : @storage
                  IF
                    {
                      DIG 2;      # @storage : @parameter%squareRoot : @parameter%squareRoot
                      DROP;       # @parameter%squareRoot : @parameter%squareRoot
                      SWAP;       # @parameter%squareRoot : @parameter%squareRoot
                      DROP;       # @parameter%squareRoot
                    }
                    {
                      PUSH string "WrongCondition: ((y.value * y.value) <= params) & (params < ((y.value + 1) * (y.value + 1)))"; # string : @parameter%squareRoot : @parameter%squareRoot : @storage
                      FAILWITH;   # FAILED
                    }; # @parameter%squareRoot
                  # self.data.value = y.value # @parameter%squareRoot
                }; # nat
            }; # nat
        }; # nat
      NIL operation; # list operation : nat
      PAIR;       # pair (list operation) nat
    };
  `,
};
