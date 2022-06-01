class RentalWithRenterSerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date, :was_received_by_owner, :was_returned_to_owner, :pending_approval
  has_one :item
  has_one :renter
end
