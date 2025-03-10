class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.string :password_digest
      t.string :city
      t.string :state
      t.float :rating
      t.boolean :admin

      t.timestamps
    end
  end
end
