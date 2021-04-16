## Add users
* Can add users to the bank. Each user has the following:
  passport id, cash(default 0), credit(default 0).
  - http://localhost:3000/users/adduser
## Depositing
* Can deposit cash to a user. (by the users passport id and
  amount of cash)
  - http://localhost:3000/users/deposite/:userid
## Update credit
* Can update a users credit (only positive numbers)
 - http://localhost:3000/users/deposite/:userid
## Withdraw money
* Can withdraw money from the user with cash (can withdraw
  money until the cash and credit run out. Your cash can be in
  minus up to the credit limit)
  - http://localhost:3000/users/withdraw/:userid
## Transferring
* Can transfer money from one user to another with cash(can
  transfer money until the cash and credit run out. Your cash can
  be in minus up to the credit limit)
  http://localhost:3000/users/transfer/:senderid/:recieverid
## Show details of user
* Can fetch all details of a particular user
http://localhost:3000/users/:userbyid
