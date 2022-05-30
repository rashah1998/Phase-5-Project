class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.belongs_to :reviewee, null: false, foreign_key: {to_table: :users}
      t.belongs_to :reviewer, null: false, foreign_key: {to_table: :users}
      t.float :rating
      t.string :content

      t.timestamps
    end
  end
end
