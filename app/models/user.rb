class User < ApplicationRecord
    has_many :items
    has_many :rentals
    has_many :items, through: :rentals
    has_many :reviews
end
