# hacktiv8-project3

### ERD

```mermaid
erDiagram
  Users {
    int id
    string full_name
    string email
    string password
    string gender
    string role
    int balance
    date createdAt
    date updatedAt
  }
  Products {
    int id
    string title
    int price
    int stock
    int CategoryId
    date createdAt
    date updatedAt
  }
  Categories {
    int id
    string type
    int sold_product_amount
    date createdAt
    date updatedAt
  }
  TransactionHistories {
    int id
    int ProductId
    int UserId
    int quantity
    int total_price
    date createdAt
    date updatedAt
  }
  Products }|--|| Categories: ""
  TransactionHistories }|--|| Users : ""
  TransactionHistories }|--|| Products : ""
```

