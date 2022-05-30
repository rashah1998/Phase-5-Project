# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#


# Users and seed data created for testing purposes only
u1 = User.create(first_name: 'Admin', last_name: '', username: 'admin', password: 'pass', city: 'New York', state: 'New York', rating: 0, admin: true)
u2 = User.create(first_name: 'Rahul', last_name: 'Shah', username: 'rahul', password: 'pass', city: 'New York', state: 'New York', rating: 0, admin: false)
u3 = User.create(first_name: 'John', last_name: 'Doe', username: 'john', password: 'pass', city: 'Newark', state: 'New Jersey', rating: 0, admin: false)
u4 = User.create(first_name: 'Jane', last_name: 'Williams', username: 'jane', password: 'pass', city: 'Hoboken', state: 'New Jersey', rating: 0, admin: false)
u5 = User.create(first_name: 'Edward', last_name: 'Jacobs', username: 'edward', password: 'pass', city: 'Livingston', state: 'New Jersey', rating: 0, admin: false)
u6 = User.create(first_name: 'Mathew', last_name: 'Roberts', username: 'mathew', password: 'pass', city: 'New York', state: 'New York', rating: 0, admin: false)

