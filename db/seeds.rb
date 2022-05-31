# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#


# Users and seed data created for testing purposes only
puts 'Creating Users...'
u1 = User.create(first_name: 'Admin', last_name: '', username: 'admin', password: 'pass', city: 'New York', state: 'New York', rating: 0, admin: true)
u2 = User.create(first_name: 'Rahul', last_name: 'Shah', username: 'rahul', password: 'pass', city: 'New York', state: 'New York', rating: 0, admin: false)
u3 = User.create(first_name: 'John', last_name: 'Doe', username: 'john', password: 'pass', city: 'Newark', state: 'New Jersey', rating: 0, admin: false)
u4 = User.create(first_name: 'Jane', last_name: 'Williams', username: 'jane', password: 'pass', city: 'Hoboken', state: 'New Jersey', rating: 0, admin: false)
u5 = User.create(first_name: 'Edward', last_name: 'Jacobs', username: 'edward', password: 'pass', city: 'Livingston', state: 'New Jersey', rating: 0, admin: false)
u6 = User.create(first_name: 'Mathew', last_name: 'Roberts', username: 'mathew', password: 'pass', city: 'New York', state: 'New York', rating: 0, admin: false)

puts 'Creating Items...'
i1 = Item.create(owner: u2, name: 'Rossignol All-Purpose Snowboard', image: 'https://playitagainsports.imgix.net/images/11218-S000313254-3?auto=compress,format&fit=clip&w=800', item_type: 'snowboard', price_per_day: 45, description: 'Slightly used Rossignol Snowboard, size 153, shreds snow like butter. Perfect for both park and powder. Comes with Large bindings and size 10 boots if needed!')
i2 = Item.create(owner: u2, name: 'Smith Helmet - Large', image: 'https://playitagainsports.imgix.net/images/10906-S000151870-1?auto=compress,format&fit=clip&w=800', item_type: 'equipment', price_per_day: 15, description: 'Brand new Smith helmet, size Large. Comes with a carry pouch.')
i3 = Item.create(owner: u3, name: 'Head Skis', image: 'https://cdn.shopify.com/s/files/1/0223/3233/products/Head-Supershape-Team-used-kid_s-skis_700x700.jpg?v=1618333448', item_type: 'ski', price_per_day: 65, description: 'Brand new performance Head skis. Bindings are fitted for size 26.5 boots and come with a DIN setting of 9 (available range is 4-12).')
i4 = Item.create(owner: u3, name: 'Leki Racing Ski Poles', image: 'https://images.sidelineswap.com/production/002/287/287/754f7715eb740bf1_original.jpeg', item_type: 'equipment', price_per_day: 20, description: 'These poles are perfect for any race or competition practice. Ergonomic handles, comfortable, and very powerful when used correctly.')
i5 = Item.create(owner: u4, name: 'Burton Freestyle Snowboard', image: 'https://cdn.shopify.com/s/files/1/0223/3233/products/burton-progression-137cm-snowboard-with-bindings-used_1000x1000.jpg?v=1600797423', item_type: 'snowboard', price_per_day: 60, description: 'Brand new size 155 Burton snowboard, ready to hit jumps and rails with ease. Also rides well on shallow powder/groomed trails. Comes with Large bindings and size 12 boots.')
i6 = Item.create(owner: u5, name: 'K2 Park Skis', image: 'https://images.sidelineswap.com/production/002/254/169/2d6d7c5b8ea2815a_original.jpeg', item_type: 'ski', price_per_day: 40, description: 'My old park skis, they still work very well. Bindings work for size 28 boots and come with a DIN setting of 8. DIN is adjustable from 6-15')
i7 = Item.create(owner: u5, name: 'K2 XL Helmet', image: 'https://playitagainsports.imgix.net/images/11788-S000098939-1?auto=compress,format&fit=clip&w=800&orient=6', item_type: 'equipment', price_per_day: 20, description: 'Great XL helmet from K2, very easy to use. Carrying case is included.')
i8 = Item.create(owner: u6, name: 'Salomon Board for Powder Days', image: 'https://i.ebayimg.com/images/g/QVoAAOSw0j5d7cNz/s-l500.jpg', item_type: 'snowboard', price_per_day: 85, description: 'The perfect snowboard for a fresh powder day! Size 160, comes with Large bindings and size 11 boots (if needed).')

puts 'Creating Availabilities...'
a1 = Availability.create(item: i1, start_date: '2022-08-31', end_date: '2023-03-15')
a2 = Availability.create(item: i2, start_date: '2022-10-31', end_date: '2023-03-31')
a3 = Availability.create(item: i3, start_date: '2023-01-18', end_date: '2023-05-31')
a4 = Availability.create(item: i4, start_date: '2022-09-12', end_date: '2023-10-31')
a5 = Availability.create(item: i5, start_date: '2022-09-30', end_date: '2023-04-30')
a6 = Availability.create(item: i6, start_date: '2022-08-15', end_date: '2023-02-28')
a7 = Availability.create(item: i7, start_date: '2022-09-05', end_date: '2023-03-31')
a9 = Availability.create(item: i8, start_date: '2022-08-31', end_date: '2023-04-30')

puts 'Done Seeding!'
