class Rental < ApplicationRecord
  belongs_to :item
  belongs_to :renter
end
