class AvailabilitySerializer < ActiveModel::Serializer
  attributes :id, :start_date, :end_date
  has_one :item
end
