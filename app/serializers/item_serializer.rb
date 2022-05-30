class ItemSerializer < ActiveModel::Serializer
  attributes :id, :image, :description
  has_one :owner
end
