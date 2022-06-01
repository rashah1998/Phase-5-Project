class ItemWithRentalsSerializer < ActiveModel::Serializer
  attributes :id, :name, :image, :description, :price_per_day, :item_type, :rentals

  def rentals 
    ActiveModelSerializers::SerializableResource.new(object.rentals, each_serializer: RentalWithRenterSerializer)
  end
end
