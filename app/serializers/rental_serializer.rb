class RentalSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date
  has_one :item
  has_one :renter
end
