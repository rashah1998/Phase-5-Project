class User < ApplicationRecord
    has_many :items, foreign_key: :owner_id
    has_many :rentals, foreign_key: :renter_id
    has_many :reviews
    has_many :reviewees, through: :reviews
    has_many :reviewers, through: :reviews
    has_secure_password
end
