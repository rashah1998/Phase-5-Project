class Item < ApplicationRecord
  belongs_to :owner, class_name: "User"
  has_many :availabilities
  has_many :rentals
  has_many :renters, through: :rentals
end
