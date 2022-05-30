class CreateAvailabilities < ActiveRecord::Migration[6.1]
  def change
    create_table :availabilities do |t|
      t.belongs_to :item, null: false, foreign_key: true
      t.string :start_date
      t.string :end_date

      t.timestamps
    end
  end
end
