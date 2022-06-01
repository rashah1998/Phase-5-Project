class ItemWithOwnerSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :price_per_day, :item_type
  has_one :owner
end
