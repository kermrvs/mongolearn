use adulkai
db.customers.drop()
db.orders.drop()
db.reports.drop()
db.createCollection('customers', {capped: true, size: 300000, max: 3000})
db.createCollection('orders')
db.createCollection('reports')

const users = []
const orders = [];
for (let i = 0; i < 5; i++) {
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
  const randomOrders = Math.floor(Math.random() * 10 + 1);
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
db.orders.insertMany(orders);

const customers = db.customers.find();

while (customers.hasNext()){
  const customer = customers.next();
  const orders = db.orders.find({customersId:customer._id});
  const obj = {
    fName:customer.name.first,
    lName:customer.name.second,
    orders:[]
  }
  while(orders.hasNext()){
    const order = orders.next();
    obj.orders.push(order);
  }
  db.reports.insertOne(obj);
}
db.reports.aggregate([{$group:{}}])



