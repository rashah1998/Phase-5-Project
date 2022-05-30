class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :content
  has_one :reviewee
  has_one :reviewer
end
