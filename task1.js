use adulkai
db.customers.drop()
db.orders.drop()
db.createCollection('customers')
db.createCollection('orders')

db.customers.createIndex({email:1})
db.customers.createIndex({'name.first':1, 'name.second':1})
db.customers.createIndex({email:1, created:1})
db.customers.createIndex({nickname:1,email:1},{unique:true})
db.customers.createIndex({'name.first':'text','name.second':'text',nickname:'text',email:'text' });

const users = []
const orders = [];
for (let i = 0; i < 30; i++) {
  const date = new Date();
  const user = {
    _id: i,
    name: {
      first: 'Andrii',
      second: 'Dulkai'
    },
    nickname:'Andrii_dulkai',
    email:'dulkai@gmail.com',
    password: 'asdf123fsgryh',
    created: date
  }
  users.push(user)
}

db.customers.insertMany(users)

users.forEach(value => {
  const randomOrders = Math.floor(Math.random() * 2 + 5)
  for (let i = 0; i < randomOrders; i++) {
    const order = {
      customersId: value._id,
      count: Math.floor(Math.random() * 100 + 1),
      price: Math.floor(Math.random() * 100 + 20),
      discount: Math.floor(Math.random() * 30 + 5),
      title: 'some title',
      product: 'some product'
    }
    orders.push(order)
  }
})

db.orders.insertMany(orders)

db.customers.getIndexes();

db.customers.find({$text:{$search:'Andrii'}})
