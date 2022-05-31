class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :price_per_day, :item_type
  has_one :owner
  has_many :availabilities
end
