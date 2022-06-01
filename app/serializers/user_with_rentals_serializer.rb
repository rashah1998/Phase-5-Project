class UserWithRentalsSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :password_digest, :city, :state, :rating, :admin
  has_many :items
  has_many :rentals
end
