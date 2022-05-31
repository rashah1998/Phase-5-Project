class User < ApplicationRecord
    has_many :items
    has_many :rentals
    has_many :items, through: :rentals
    has_many :reviews
    has_many :reviewees, through: :reviews
    has_many :reviewers, through: :reviews
    has_secure_password
end
