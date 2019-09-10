# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Food.create([
    {prod_id: 1, item: "bananas", quantity: 4, pic: "ji:grinning-face", days_expiration: 4, location: "fridge", nutrifacts: "tbd"},
    {prod_id: 2, item: "rice", quantity: 1, pic: "ji:grinning-face", days_expiration: 30, location: "pantry", nutrifacts: "tbd"},
    {prod_id: 3, item: "milk", quantity: 1, pic: "ji:grinning-face", days_expiration: 7, location: "fridge", nutrifacts: "tbd"},
    {prod_id: 4, item: "cookies", quantity: 1, pic: "ji:grinning-face", days_expiration: 30, location: "pantry", nutrifacts: "tbd"}
])
