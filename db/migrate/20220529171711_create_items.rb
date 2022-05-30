class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.belongs_to :owner, null: false, foreign_key: {to_table: :users}
      t.string :image
      t.string :description

      t.timestamps
    end
  end
end
