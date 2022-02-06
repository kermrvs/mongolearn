use adulkai
db.customers.drop()
db.orders.drop()
db.createCollection('customers', {capped: true, size: 300000, max: 3000})
db.createCollection('orders')

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
    balance: 15000,
    created: date
  }
  users.push(user)
}

db.customers.insertMany(users)

users.forEach(value => {
  const randomOrders = Math.floor(Math.random() * 2)
  for (let i = 0; i < randomOrders; i++) {
    const order = {
      customersId: value._id,
      count: Math.floor(Math.random() * 100 + 1),
      price: Math.floor(Math.random() * 100 + 20),
      discount: Math.floor(Math.random() * 30 + 5),
      title: 'some title',
      product: 'some product'
    }
    orders.push({
      insertOne:{
        'document':{order}
      }
    })
  }
})

db.orders.bulkWrite(orders)

print('Orders count: ',db.orders.countDocuments());
print('Customers',db.customers.stats().size,'bytes')
print('Orders',db.orders.stats().size,'bytes')
print('Customers + Orders',db.customers.stats().size + db.orders.stats().size,'bytes')
