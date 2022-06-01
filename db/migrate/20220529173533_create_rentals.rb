class CreateRentals < ActiveRecord::Migration[6.1]
  def change
    create_table :rentals do |t|
      t.belongs_to :item, null: false, foreign_key: true
      t.belongs_to :renter, null: false, foreign_key: {to_table: :users}
      t.string :start_date
      t.string :end_date
      t.boolean :was_returned_to_owner
      t.boolean :was_received_by_owner
      t.boolean :pending_approval

      t.timestamps
    end
  end
end
