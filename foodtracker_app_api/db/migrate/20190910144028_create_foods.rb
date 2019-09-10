class CreateFoods < ActiveRecord::Migration[6.0]
  def change
    create_table :foods do |t|
      t.integer :prod_id
      t.string :item
      t.integer :quantity
      t.string :pic
      t.integer :days_expiration
      t.string :location
      t.string :nutrifacts
    end
  end
end
