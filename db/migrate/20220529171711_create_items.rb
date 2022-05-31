class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.belongs_to :owner, null: false, foreign_key: {to_table: :users}
      t.string :name
      t.string :image
      t.string :item_type
      t.integer :price_per_day
      t.string :description

      t.timestamps
    end
  end
end
