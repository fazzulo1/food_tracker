class RemoveProdidInFoods < ActiveRecord::Migration[6.0]
  def change
    remove_column :foods, :prod_id, :integer
  end
end
